pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "./SafeMath.sol";


interface IRBAC {
	/**
	 * @param _account account to check roleContract
	 * @param _role uint(enum) => uint8 0: SUPER_ADMIN, 1: NOTARY
	 * @return bool
	 */
	function hasRole(address _account, uint8 _role) external view returns (bool);
}


/**
 * @title RealEstate
 * @dev Real estate management and transaction
 */

contract RealEstate {
	using SafeMath for uint256;
	// ------------------------------ Variables ------------------------------
	IRBAC roleContract;		// reference to contract RoleBasedAcl
	// number of certificate (token id)
	uint256 public certificateCount;
	// State of certificate
	enum State { PENDDING, ACTIVATED, SELLING } //sate of token PENDDING: 0, ACTIVATED: 1, SELLING: 2

	struct LandLot {
		string location;
		string purposeOfUse;
		string timeOfUse;
		string originOfUse;
		uint8 landLotNo;
		uint8 mapSheetNo;
		uint8 area;
	}

	struct House {
		uint8 level;
		uint8 constructionArea;
		string location;
		string houseType;
		string apartmentName;
		string floorArea;
		string formOfOwn;
		string timeOfUse;
	}

	struct Certificate {
		LandLot landLot;
		House house;
		string otherConstruction;
		string prodForestIsArtificial;
		string perennialTree;
		string notice;
	}

	// mapping token to owners
	mapping(uint256 => address[]) tokenToOwners;
	// mapping token to owner approved (activate || sell)
	mapping(uint256 => address[]) tokenToApprovals;
	// mapping token to state of token
	mapping(uint256 => State) public tokenToState; // Default: 0 => 'PENDDING'
	// mapping token to notary
	mapping(uint256 => address) public tokenToNotary;

	// ------------------------------ Events ------------------------------
	/// @dev Emits when a new certificate created.
	event NewCertificate(
		LandLot landLot,
		House house,
		string ortherConstruction,
		string prodForestIsArtificial,
		string perennialTree,
		string notice,
		address indexed notary
	);

	/// @dev This emits when ownership of any NFTs changes by any mechanism
	event Transfer(
		address[] oldOwner,
		address[] newOwner,
		uint256 idCertificate,
		address indexed notary
	);

	/// @dev Emits when the owner activate certificate (PENDDING => ACTIVATED)
	event Activate(uint256 idCertificate, address owner, State state);

	/// @dev Emits when the owner activate sale for certificate (ACTIVATED => SELLING)
	event ActivateSale(uint256 idCertificate, address owner, State state);

	constructor(IRBAC _roleContract) public{
		// Initialize roleContract
		roleContract = _roleContract;
	}

	// ------------------------------ Modifiers ------------------------------

	modifier onlyActivated(uint256 _id) {
		require(isActivated(_id), "RealEstate: Please activate first");
		_;
	}

	modifier onlySelling(uint256 _id) {
		require(isSelling(_id), "RealEstate: The certificate doesn't allow for sale");
		_;
	}

	modifier onlyOwnerOf(uint256 _id) {
		require(
			_checkExitInArray(tokenToOwners[_id], msg.sender),
			"RealEstate: You're not owner of certificate"
		);
		_;
	}

	// ------------------------------ View functions ------------------------------

	/**
	 * @notice Get the owner of a certificate
	 * @param _id The identifier of the certificate
	 * @return The list address of the owners of the certificate
	 */
	function getOwnersOf(uint256 _id) public view returns (address[] memory) {
		return tokenToOwners[_id];
	}

	/**
	 * @notice Get the owner approved for (sell || activate) depending on state of certificate
	 * @param _id id of certificate
	 * @return The list address of the owners approved
	 */
	function getOwnerApproved(uint256 _id) public view returns (address[] memory) {
		return tokenToApprovals[_id];
	}

	// ------------------------------ Core public functions ------------------------------

	/**
	 * @notice create a new certificate with a struct
	 * @dev Require role notary and list owner does not contain msg.sender
	 */
	function createCertificate(
		LandLot memory _landLot,
		House memory _house,
		string memory _ortherConstruction,
		string memory _prodForestIsArtificial,
		string memory _perennialTree,
		string memory _notice,
		address[] memory _owners
	) public {
		require(roleContract.hasRole(msg.sender,1), "RealEstate: Require notary");
		// require owner not to be notary(msg.sender)
		require(
			!_checkExitInArray(_owners, msg.sender),
			"RealEstate: You are not allowed to create your own property"
		);
		certificateCount = certificateCount.add(1);
		Certificate(
			_landLot,
			_house,
			_ortherConstruction,
			_prodForestIsArtificial,
			_perennialTree,
			_notice
		);
		tokenToOwners[certificateCount] = _owners;
		tokenToNotary[certificateCount] = msg.sender;
		emit NewCertificate(
			_landLot,
			_house,
			_ortherConstruction,
			_prodForestIsArtificial,
			_perennialTree,
			_notice,
			msg.sender
		);
	}

	/**
	 * @notice Activate certificate (PENDDING => ACTIVATED)
	 * @dev Require msg.sender is owner of certification and msg.sender has not activated
	 * Change state of certificate if all owner has activated
	 */
	function activate(uint256 _id) public onlyOwnerOf(_id) {
		require(
			!_checkExitInArray(tokenToApprovals[_id], msg.sender),
			"RealEstate: Account already approved"
		);
		// store msg.sender to list approved
		tokenToApprovals[_id].push(msg.sender);
		// if all owner approved => set state of certificate to 'ACTIVATED'
		if (tokenToApprovals[_id].length == tokenToOwners[_id].length) {
			tokenToState[_id] = State.ACTIVATED;
			// set user approve to null
			delete tokenToApprovals[_id];
		}
		emit Activate(_id, msg.sender, tokenToState[_id]);
	}

	/**
	 * @notice Activate for sale
	 * @dev require current token state is 'ACTIVATED'
	 * @dev Require msg.sender is owner of certification and msg.sender has not activated
	 * Change state of certificate if all owner has activated
	 */
	function activateSale(uint256 _id) public onlyActivated(_id) onlyOwnerOf(_id) {
		// require msg.sender dot not ACTIVATED
		require(
			!_checkExitInArray(tokenToApprovals[_id], msg.sender),
			"RealEstate: Account already approved"
		);
		// store msg.sender to list approved
		tokenToApprovals[_id].push(msg.sender);
		// if all owner approved => set state of certificate to 'SELLING'
		if (tokenToApprovals[_id].length == tokenToOwners[_id].length) {
			tokenToState[_id] = State.SELLING;
		}
		emit ActivateSale(_id, msg.sender, tokenToState[_id]);
	}

	/**
	 * @notice Transfer ownership of certificate
	 * @dev Only notary allowed && msg.sender is not the owner
	 */
	function transfer(address[] memory _newOwners, uint256 _id)
		public
		onlySelling(_id) // require state of certificate is 'SELLING'
	{
		require(roleContract.hasRole(msg.sender,1), "RealEstate: Require notary");
		require(
			!_checkExitInArray(_newOwners, msg.sender),
			"RealEstate: Can't transfer to current owner"
		);
		// require(_newOwners.length > 0, "RealEstate: Require one owner at least");
		address[] memory _currentOwners = getOwnersOf(_id);
		tokenToOwners[_id] = _newOwners;
		tokenToState[_id] = State.ACTIVATED;
		delete tokenToApprovals[_id];
		emit Transfer(_currentOwners, _newOwners, _id, msg.sender);
	}

	/**
	 * @notice Check state of certificate is 'ACTIVATED'
	 * @param _id identifier of certificate
	 * @return bool
	 */
	function isActivated(uint256 _id) public view returns (bool) {
		return tokenToState[_id] == State.ACTIVATED;
	}

	/**
	 * @notice Check state of certificate is 'SELLING'
	 * @param _id identifier of certificate
	 * @return bool
	 */
	function isSelling(uint256 _id) public view returns (bool) {
		return tokenToState[_id] == State.SELLING;
	}

	// ------------------------------ Helper functions (internal functions) ------------------------------

	/**
	 * @notice Check list address inclue single address
	 * @param _array list address
	 * @param _user	address want to check
	 * @return bool
	 */
	function _checkExitInArray(address[] memory _array, address _user)
		internal
		pure
		returns (bool)
	{
		uint256 _arrayLength = _array.length;
		for (uint8 i = 0; i < _arrayLength; i++) {
			if (_user == _array[i]) {
				return true;
			}
		}
		return false;
	}
}
