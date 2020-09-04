const { assert } = require("chai");

const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");
const Transaction = artifacts.require("./Transaction.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Transaction", (accounts) => {
  const [superadmin, notary, owner, seller, buyer1, buyer] = [...accounts];
  // default owner has role 'SUPER_ADMIN'
  let realEstate, roleBasedAcl, transactionInstance;
  var idCertificate; // Id certificate transaction

  before(async () => {
    // deploy role based ACL contract first.
    roleBasedAcl = await RoleBasedAcl.new();
    // get RoleBasedAcl contract address to create realEstate contract
    realEstate = await RealEstate.new(roleBasedAcl.address);
    // get RealEstate contract address to create Transaction contract
    transactionInstance = await Transaction.new(realEstate.address);
  });

  describe("Deployment", async () => {
    it("deploys Transaction successfully", async () => {
      const address = await transactionInstance.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  // deposit value: 1 ETH
  // transfer value: 2 ETH

  // account1: notary, [owner]: owners
  describe("Step 1: Create transaction (Send deposit request)", async () => {
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let certificate, idTransaction, tokenToState, tokenToNotary;
    let buyerBalanceBefore, buyerBalanceAfter;
    let contractBalanceBefore, contractBalanceAfter;
    before(async () => {
      // Grant notary permissions to account1
      await roleBasedAcl.addRole(notary, 1, { from: superadmin });
      // create certificate
      let certificate = await realEstate.createCertificate(
        "Base64 of certificate",
        [owner],
        {
          from: notary,
        }
      );
      idCertificate = certificate.logs[0].args.idCertificate;
      // activate certificate
      await realEstate.activate(idCertificate, { from: owner, value: "0" });
      buyerBalanceBefore = await web3.eth.getBalance(buyer);
      contractBalanceBefore = await web3.eth.getBalance(
        transactionInstance.address
      );
      result = await transactionInstance.createTransaction(
        [buyer],
        idCertificate,
        web3.utils.toWei(depositPrice, "ether"),
        web3.utils.toWei(transferPrice, "ether"),
        30,
        { from: buyer, value: web3.utils.toWei(depositPrice, "ether") }
      );
      buyerBalanceAfter = await web3.eth.getBalance(buyer);
      contractBalanceAfter = await web3.eth.getBalance(
        transactionInstance.address
      );
    });
    it("Create transaction successfully", async () => {
      idTransaction = await transactionInstance.id;
      assert(idTransaction, 1, "Transaction id should be equal to 1");
      let stateOfTransaction = await transactionInstance.idToState(1);
      assert(stateOfTransaction, 0, "state of transaction should be equal 0");
    });
    it("Should be emit event TransactionCreated", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "TransactionCreated");
      assert.equal(event.idTransaction, 1);
    });
    it("Buyer's balance should be reduce amount equal to deposit price", async () => {
      assert(
        buyerBalanceBefore - buyerBalanceAfter,
        web3.utils.toWei(depositPrice, "ether"),
        "buyer must transfer the full deposit amount"
      );
    });
    it("Smart contract should be keep the whole deposit amount", async () => {
      assert(
        contractBalanceAfter - contractBalanceBefore,
        web3.utils.toWei(depositPrice, "ether")
      );
    });
  });

  describe("Step 2: Accept transaction", async () => {
    let tokenToState,
      tokenToOwners,
      idTransaction = 1;
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let sellerBalanceBefore, sellerBalanceAfter;
    let contractBalanceBefore, contractBalanceAfter;
    before(async () => {
      sellerBalanceBefore = await web3.eth.getBalance(owner);
      contractBalanceBefore = await web3.eth.getBalance(
        transactionInstance.address
      );
      result = await transactionInstance.acceptTransaction(idTransaction, {
        from: owner,
      });
      sellerBalanceAfter = await web3.eth.getBalance(owner);
      contractBalanceAfter = await web3.eth.getBalance(
        transactionInstance.address
      );
    });
    it("Accept transaction successfully", async () => {
      stateOfTransaction = await transactionInstance.idToState(1);
      assert.equal(
        stateOfTransaction.toNumber(),
        3,
        "State of transaction should be DEPOSIT_SIGNED: 3"
      );
    });
    it("Should be emit event DepositSigned", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "DepositSigned");
      assert.equal(event.idTransaction, 1);
    });
    if (
      ("State of certificate should be IN_TRANSACTION",
      async () => {
        let stateOfCert = await realEstate.tokenToState(
          idCertificate.toNumber()
        );
        assert.equal(
          stateOfCert.toNumber(),
          2,
          "State of certificate should be IN_TRANSACTION: 2"
        );
      })
    )
      it("Seller should receive full deposit amount from smart contract", async () => {
        assert(
          sellerBalanceAfter - sellerBalanceBefore,
          web3.utils.toWei(depositPrice, "ether"),
          "Seller's balance should be added an amount equal to the deposit price"
        );
        assert(
          contractBalanceBefore - contractBalanceAfter,
          web3.utils.toWei(depositPrice, "ether"),
          "Smart contract should be send whole deposit price to seller"
        );
      });
  });

  describe("Step 3: Payment", async () => {
    let tokenToState,
      tokenToOwners,
      idTransaction = 1;
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let buyerBalanceBefore, buyerBalanceAfter;
    let contractBalanceBefore, contractBalanceAfter;
    let transactionValue =
      web3.utils.toWei(transferPrice, "ether") -
      web3.utils.toWei(depositPrice, "ether") +
      web3.utils.toWei(transferPrice, "ether") * 0.005;
    before(async () => {
      buyerBalanceBefore = await web3.eth.getBalance(buyer);
      contractBalanceBefore = await web3.eth.getBalance(
        transactionInstance.address
      );
      result = await transactionInstance.payment(idTransaction, {
        from: buyer,
        value: transactionValue,
      });
      buyerBalanceAfter = await web3.eth.getBalance(buyer);
      contractBalanceAfter = await web3.eth.getBalance(
        transactionInstance.address
      );
    });
    it("Payment successfully", async () => {
      stateOfTransaction = await transactionInstance.idToState(1);
      assert.equal(
        stateOfTransaction.toNumber(),
        6,
        "State of transaction should be TRANSFER_REQUEST: 6"
      );
    });
    it("Should be emit event Payment", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "Payment");
      assert.equal(event.idTransaction, 1);
    });
    it("Buyer should be sent (transaction remaining amount + tax) to smart contract", async () => {
      assert(
        buyerBalanceAfter - buyerBalanceBefore,
        transactionValue,
        "Buyer's balance should be sub an amount equal to the remaining amount + tax"
      );
      assert(
        contractBalanceBefore - contractBalanceAfter,
        transactionValue,
        "Smart contract should be keep whole (transaction remaining amount + tax)"
      );
    });
  });

  // NOTE: only using for case remaining amount GREATER than personal income tax
  // [(transferPrice - depositPrice)  >= transferPrice * 0.2]
  describe("Step 4: Confirm transaction", async () => {
    let tokenToState,
      tokenToOwners,
      idTransaction = 1;
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let sellerBalanceBefore, sellerBalanceAfter;
    let contractBalanceBefore, contractBalanceAfter;
    let result;
    let valueReceiveNet =
      web3.utils.toWei(transferPrice, "ether") -
      web3.utils.toWei(depositPrice, "ether") -
      web3.utils.toWei(transferPrice, "ether") * 0.2;
    before(async () => {
      sellerBalanceBefore = await web3.eth.getBalance(owner);
      contractBalanceBefore = await web3.eth.getBalance(
        transactionInstance.address
      );
      result = await transactionInstance.confirmTransaction(idTransaction, {
        from: owner,
      });
      sellerBalanceAfter = await web3.eth.getBalance(owner);
      contractBalanceAfter = await web3.eth.getBalance(
        transactionInstance.address
      );
    });
    it("Confirm  transaction successfully", async () => {
      stateOfTransaction = await transactionInstance.idToState(1);
      assert.equal(
        stateOfTransaction.toNumber(),
        8,
        "State of transaction should be DEPOSIT_SIGNED: 8"
      );
    });
    it("Should be emit event TransactionSuccess", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "TransactionSuccess");
      assert.equal(event.idTransaction, 1);
    });
    // sub tax of buyer and seller. seller tax = 0.02 * transferPrice
    it("Seller should receive (transaction remaining amount - tax) from smart contract", async () => {
      assert(
        sellerBalanceAfter - sellerBalanceBefore,
        valueReceiveNet,
        "Seller's balance should be added an amount equal to (transaction remaining amount - tax)"
      );
      assert(
        contractBalanceBefore - contractBalanceAfter,
        web3.utils.toWei(transferPrice, "ether") * 0.02,
        "Smart contract should be keep tax of seller"
      );
    });
    it("The ownership should be swap", async () => {
      let newOwner = await realEstate.getOwnersOfCert(idCertificate.toNumber());
      assert.equal(newOwner[0], buyer, "Ownership should be change to buyer");
    });
    it("State of contract should be ACTIVATED", async () => {
      let stateOfCert = await realEstate.tokenToState(idCertificate.toNumber());
      assert.equal(
        stateOfCert.toNumber(),
        1,
        "State of certificate should be ACTIVATED: 1"
      );
    });
  });
});
