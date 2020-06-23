pragma solidity >=0.4.21 <0.7.0;
import "./SafeMath.sol";

// Interface real esate
interface IRealEstate {
	function getOwnersOfCert(uint256 _idCertificate)
		external
		view
		returns (address[] memory);

	function getRepresentativeOfOwners(uint256 _idCertificate)
		external
		view
		returns (address);

    // 0: PENDING - 1: ACTIVATE - 2: IN_TRANSACTION
	function getStateOfCert(uint256 _idCertificate) external view returns(uint8);

	function setStateOfCertInTransaction(uint256 _idCertificate) external;

	function setStateOfCertOutTransaction(uint256 _idCertificate) external;

	function transferOwnership(
		uint256 _idCertificate,
		address[] calldata _newOwners
	) external;
}

/**
 * @dev Contract manager transaction of real estate
 */

contract Transaction {

    // ------------------------------ Variables ------------------------------

	using SafeMath for uint256;

	IRealEstate RealEstate;
    uint256 public id;
	address private owner;

    // state of transaction
	enum State {
		DEPOSIT_REQUEST,                // Transaction created
		DEPOSIT_CANCELED_BY_BUYER,      // Buyer cancel transaction, transaction has not been signed
		DEPOSIT_CANCELED_BY_SELLER,     // Seller cancel transaction, transaction has not been signed
		DEPOSIT_SIGNED,                 // seller sign transaction
		DEPOSIT_BROKEN_BY_BUYER,        // Buyer cancel transaction, transaction signed
		DEPOSIT_BROKEN_BY_SELLER,       // Seller cancel transaction, transaction signed
		TRANSFER_REQUEST,               // Buyer transfer remaining amount (same requrest transfer contract)
		TRANSFER_CANCELED_BY_SELLER,    // Seller refuse (same BRAKE_DEPOSIT)
		TRANSFER_SIGNED                 // Seller sign transaction => Finish
	}

    mapping(uint256 => State) public idToState;             // mapping id to state of transaction
	mapping(uint256 => Transaction) public idToTransaction; // mapping id to data of transaction

	struct Transaction {
		address[] buyers;
		address[] sellers;
		uint256 idCertificate;
		uint256 depositPrice;
		uint256 transferPrice;
		uint256 timeStart;
		uint256 timeEnd;
	}

    // -------------------------------- Event --------------------------------
	event TransactionCreated(
		address[] buyers,
		address[] sellers,
		uint256 idTransaction,
		uint256 idCertificate,
		uint256 depositPrice,
		uint256 transferPrice,
		uint256 timeStart,
		uint256 timeEnd
	);

	event DepositSigned(
	    uint256 idTransaction
	);

	event TransactionCanceled(
	    uint256 idTransaction,
	    State state
	);

	event TransactionSuccess(
        uint256 idTransaction
	);

	constructor(IRealEstate _realEstateContractAddress) public {
		RealEstate = _realEstateContractAddress;
	}

	function setRealEstateContract(IRealEstate _realEstateContractAddress)
		public
	{
		RealEstate = _realEstateContractAddress;
	}

    // ------------------------------ Core Function ------------------------------
	/**
     * @notice Create transaction (same send request deposit contract)
     * @dev Buyer create transaction and send deposit amount to contract address
     */
	function createTransaction(
		address[] memory _buyers,
		uint256 _idCertificate,
		uint256 _depositPrice,
		uint256 _transferPrice,
		uint256 _depositTime // days
	) public payable {
		require(RealEstate.getStateOfCert(_idCertificate) == 2, "Transaction(createTransaction): Require state of certificate is ACTIVATE");
	   // require(_buyers[0] == msg.sender, "Transaction: Require first buyer is msg.sender");
		require(
			msg.value >= _depositPrice,
			"Transaction: You're not enough balance to deposit."
		);
		address[] memory owners = RealEstate.getOwnersOfCert(_idCertificate);
		uint256 timeEnd = now + _depositTime * 24 * 60 * 60; // convert days to seconds
		Transaction memory transaction = Transaction({
			buyers: _buyers,
			sellers: owners,
			idCertificate: _idCertificate,
			depositPrice: _depositPrice,
			transferPrice: _transferPrice,
			timeStart: now,
			timeEnd: timeEnd
		});
		id = id.add(1);
		idToTransaction[id] = transaction;
		idToState[id] = State.DEPOSIT_REQUEST;
		emit TransactionCreated(
			_buyers,
			owners,
			id,
			_idCertificate,
			_depositPrice,
			_transferPrice,
			now,
			timeEnd
		);
	}


    /**
     * @notice Accept deposit (same signed the deposit contract)
     * @dev Allow only representative of seller call
     * Seller will receive the deposit amount and set state to SIGNED
     */
	function acceptTransaction(uint256 _idTransaction)
		public
		onlyState(_idTransaction, State.DEPOSIT_REQUEST)
	{
		Transaction memory transaction = idToTransaction[_idTransaction];
		require(now <= transaction.timeEnd, "Transaction(acceptDeposit): Transaction has terminated");
		address representativeOwners = transaction.sellers[0];
		require(
			(msg.sender == representativeOwners),
			"Transaction(acceptDeposit): require representative of owner of certificate"
		);
		msg.sender.transfer(transaction.depositPrice);
		idToState[_idTransaction] = State.DEPOSIT_SIGNED;
		RealEstate.setStateOfCertInTransaction(transaction.idCertificate);
		emit DepositSigned(_idTransaction);
	}


	/**
	 * @notice Cancel transaction
	 * @dev Only transactions are subject to change (can modify state of transaction)
     * if transaction not signed => refund deposit amount to buyers
     * if transaction signed and sellers call => send compensation for buyers
	 */
	function cancelTransaction(uint256 _idTransaction)
		public
		payable
 		allowModify(_idTransaction)
	{
		Transaction memory transaction = idToTransaction[_idTransaction];
		if (msg.sender == transaction.buyers[0]) {
		    // buyer cancel DEPOSTI_REQUEST and recive depositPrice
		    if(idToState[_idTransaction] == State.DEPOSIT_REQUEST){
		        msg.sender.transfer(transaction.depositPrice);
			    idToState[_idTransaction] = State.DEPOSIT_CANCELED_BY_BUYER;
		    }
		    // buyer break transaction (deposit contract) => never recive the depositPrice previously transferred
			else if(idToState[_idTransaction] == State.DEPOSIT_SIGNED){
			    idToState[_idTransaction] = State.DEPOSIT_BROKEN_BY_BUYER;
			}
		} else if (msg.sender == transaction.sellers[0]) {
		    // seller refuse DEPOSIT_REQUEST of buyer => buyers recive depositPrice previously transferred
		    if(idToState[_idTransaction] == State.DEPOSIT_REQUEST){
		        address payable buyer = address(uint160(transaction.buyers[0]));
		        buyer.transfer(transaction.depositPrice);
		        idToState[_idTransaction] = State.DEPOSIT_CANCELED_BY_SELLER;
		    }
		    // seller break transaction (deposit contract) => compensation for buyer
		    else if(idToState[_idTransaction] == State.DEPOSIT_SIGNED){
		        uint256 compensationAmount = transaction.depositPrice.mul(2);
			require(
				msg.value >= compensationAmount,
				"Transaction(breakDeposit): you're not enough balance to break contract"
			    );
		    	address payable buyer = address(uint160(transaction.buyers[0]));
			    buyer.transfer(compensationAmount);
			    idToState[_idTransaction] = State.DEPOSIT_BROKEN_BY_BUYER;
		    }
            // if buyer sended payment => refund payment and compensation
            else if(idToState[_idTransaction] == State.TRANSFER_REQUEST){
		        uint256 compensationAmount = transaction.depositPrice.mul(2);
                uint256 totalAmount = transaction.transferPrice.add(compensationAmount);
			require(
				msg.value >= compensationAmount,
				"Transaction(breakDeposit): you're not enough balance to break contract"
			    );
		    	address payable buyer = address(uint160(transaction.buyers[0]));
			    buyer.transfer(totalAmount);
			    idToState[_idTransaction] = State.TRANSFER_CANCELED_BY_SELLER;
		    }
		} else {
			revert("Transaction(cancelTransaction): You're not permission.");
		}
		RealEstate.setStateOfCertOutTransaction(transaction.idCertificate);
		emit TransactionCanceled(_idTransaction, idToState[_idTransaction]);

	}


	/**
     * @notice Payment transaction
     * @dev Only representative of buyer (buyer[0])
     * buyer send remaining amount of transction to contract address (same sign transfer contract)
     */
	function payment(uint256 _idTransaction)
		public
		payable
		onlyState(_idTransaction, State.DEPOSIT_SIGNED)
	{
		Transaction memory transaction = idToTransaction[_idTransaction];
		require(now <= transaction.timeEnd, "Transaction(payment): Transaction has terminated");
		address representativeBuyer = transaction.buyers[0];
		require(
			msg.sender == representativeBuyer,
			"Transaction(payment): only representative buyers"
		);
		uint256 remainingAmount = transaction.transferPrice.sub(
			transaction.depositPrice
		);
		uint256 registrationTax = transaction.transferPrice.div(200); // 0.5% tax
		uint256 totalAmount = remainingAmount.add(registrationTax);
		require(
			(msg.value >= totalAmount),
			"Transaction(payment): You're not enough balance"
		);
		idToState[_idTransaction] = State.TRANSFER_REQUEST;
	}


	/**
     * @notice Confirm transaction
     * @dev Seller confirm transaction recive remaining amount of transaction
     * and transfer ownership of certificate to buyer
     */
	function confirmTransaction(uint256 _idTransaction)
		public
		onlyState(_idTransaction, State.TRANSFER_REQUEST)
	{
		Transaction memory transaction = idToTransaction[_idTransaction];
		require(now <= transaction.timeEnd, "transaction(confirmTransaction): Transaction has terminated");
		address representativeSellers = transaction.sellers[0];
		require(
			msg.sender == representativeSellers,
			"Transaction(sellerConfirmTransaction): require representative of sellers"
		);
		uint256 personalIncomeTax = transaction.transferPrice.div(50); // 2% tax
		msg.sender.transfer(transaction.transferPrice.sub(personalIncomeTax));
		RealEstate.transferOwnership(
			transaction.idCertificate,
			transaction.buyers
		);
		RealEstate.setStateOfCertOutTransaction(transaction.idCertificate);
        emit TransactionSuccess(_idTransaction);
	}

    // ------------------------------ View Function ------------------------------
    /**
     * @notice Get information of transaction
     */
	function getTransaction(uint256 _idTransaction)
		public
		view
		returns (
			address[] memory,
			address[] memory,
			uint256,
			uint256,
			uint256,
			uint256,
			uint256
		)
	{
		Transaction memory transaction = idToTransaction[_idTransaction];
		return (
			transaction.buyers,
			transaction.sellers,
			transaction.idCertificate,
			transaction.depositPrice,
			transaction.transferPrice,
			transaction.timeStart,
			transaction.timeEnd
		);
	}

    // ------------------------------ Mofifier ------------------------------
    modifier onlyState(uint256 _idTransaction, State _state) {
        require(
            (idToState[_idTransaction] == _state),
            "modifier: Require state"
        );
        _;
    }

    modifier allowModify(uint256 _idTransaction){
        require((idToState[_idTransaction] == State.DEPOSIT_REQUEST || idToState[_idTransaction] == State.DEPOSIT_SIGNED || idToState[_idTransaction] == State.TRANSFER_REQUEST),"allowModify: Transaction cann't allow modifier");
        _;
    }

    // 	function breakDeposit(Transaction memory _idTransaction)
// 		public
// 		payable
// 		onlyState(_idTransaction, State.DEPOSIT_SIGNED)
// 	{
// 		Transaction memory transaction = idToTransaction[_idTransaction];
// 		if (msg.sender == transaction.buyers[0]) {
// 			idToState[_idTransaction] = State.DEPOSIT_BROKEN_BY_BUYER;
// 		} else if (msg.sender == transaction.sellers[0]) {
// 			uint256 compensationAmount = transaction.depositPrice.mul(2);
// 			require(
// 				msg.value >= compensationAmount,
// 				"Transaction(breakDeposit): you're not enough balance to break contract"
// 			);
// 			address payable buyer = address(uint160(transaction.buyers[0]));
// 			buyer.transfer(compensationAmount);
// 			idToState[_idTransaction] = State.DEPOSIT_BROKEN_BY_BUYER;
// 		} else {
// 			revert("Transaction(breakDeposit): you're not permission.");
// 		}
// 		RealEstate.setStateOfCertOutTransaction(transaction.idCertificate);
// 	}

	//only buyer
	/**
	 * if transaction is SIGNED => cancel will be lost deposit amount
	 * sele =>
	 */

	// function buyerCancelTransaction(uint256 _idTransaction) public{
	//     Transaction memory transaction = idToTransaction[_idTransaction];
	//     address representativeOwners = RealEstate.getRepresentativeOfOwners(transaction.idCertificate);
	//     require((msg.sender == transaction.buyers[0]),"Transaction(buyerCancelTransaction): Require user created the transaction");
	//     if(idToState[_idTransaction] == State.SIGNED){
	//         address payable owner0 = address(uint160(representativeOwners));
	//         owner0.transfer(transaction.depositPrice);
	//     }else if(idToState[_idTransaction] == State.PENDING){
	//         msg.sender.transfer(transaction.depositPrice);
	//     }
	//     else{
	//         revert();
	//     }
	//     idToState[_idTransaction] = State.CANCEL;
	// }

	// // only seller
	// /**
	//  * if transaction have not signed yet => return balance to creater Transaction
	//  * if transaction be signed => seller have to enough balance to break the contract x2 value depositPrice
	//  */

	// function sellerCancelTransaction(uint256 _idTransaction) payable public{
	//     Transaction memory transaction = idToTransaction[_idTransaction];
	//     address representativeOwners = RealEstate.getRepresentativeOfOwners(transaction.idCertificate);
	//     address payable buyer0 = address(uint160(transaction.buyers[0]));
	//     require((msg.sender == representativeOwners),"Transaction(sellerCancelTransaction): require representative of owner of certificate");
	//     if(idToState[_idTransaction] == State.PENDING){
	//         idToState[_idTransaction] = State.CANCEL;
	//         buyer0.transfer(transaction.depositPrice);
	//     }
	//     else if(idToState[_idTransaction] == State.SIGNED){
	//         require((msg.value >= transaction.depositPrice.mul(2)),"Transaction(sellerCancelTransaction): You're not enough balance to braek the contract");
	//         buyer0.transfer(transaction.depositPrice.mul(2));
	//     }
	// }

	// // TAX
	// // buyer => thuế trước bạ 0.5% => registration tax
	// // seller => thuế thu nhập cá nhân 2% => personal income tax

	// // buyer send remaining amount to seller
	// function buyerCompleteTransaction(uint256 _idTransaction) public payable onlyState(_idTransaction, State.SIGNED){
	//     Transaction memory transaction = idToTransaction[_idTransaction];
	//     uint256 remainingAmount = transaction.transferPrice.sub(transaction.depositPrice);
	//     uint256 registrationTax = transaction.transferPrice.div(200); // 0.5% tax
	//     uint256 totalAmount = remainingAmount.add(registrationTax);
	//     require((msg.value >= totalAmount), "Transaction(buyerCompleteTransaction): You're not enough balance");
	//     idToState[_idTransaction] = State.REQUEST_TRANSFER;
	// }

	// function sellerCompleteTransaction(uint256 _idTransaction) public onlyState(_idTransaction, State.REQUEST_TRANSFER){
	//     Transaction memory transaction = idToTransaction[_idTransaction];
	//     uint256 personalIncomeTax = transaction.transferPrice.div(50); // 2% tax
	//     msg.sender.transfer(transaction.transferPrice.sub(personalIncomeTax));
	//     idToState[_idTransaction] = State.TRANSFER_SIGNED;
	//     RealEstate.transferOwnership(transaction.idCertificate, transaction.buyers);
	//     RealEstate.setStateOfCertOutTransaction(transaction.idCertificate);
	// }


}
