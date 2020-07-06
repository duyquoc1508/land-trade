const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");
const Transaction = artifacts.require("./Transaction.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Transaction", (accounts) => {
  const [superadmin, notary, owner, seller, buyer] = [...accounts];
  // default owner has role 'SUPER_ADMIN'
  let realEstate, roleBasedAcl, transaction;

  before(async () => {
    // deploy role based ACL contract first.
    roleBasedAcl = await RoleBasedAcl.new();
    // get RoleBasedAcl contract address to create realEstate contract
    realEstate = await RealEstate.new(roleBasedAcl.address);
    // get RealEstate contract address to create Transaction contract
    transactionInstance = await Transaction.new(realEstate.address);
  });

  describe.skip("Deployment", async () => {
    it("deploys Transaction successfully", async () => {
      const address = await transactionInstance.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  // account1: notary, [owner]: owners
  describe("Create transaction", async () => {
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let certificate, idCertificate, idTransaction, tokenToState, tokenToNotary;
    let beforeBalance, afterBalance;
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
      beforeBalance = await web3.eth.getBalance(buyer);
      result = await transactionInstance.createTransaction(
        [buyer],
        idCertificate,
        web3.utils.toWei(depositPrice, "ether"),
        web3.utils.toWei(transferPrice, "ether"),
        30,
        { from: buyer, value: web3.utils.toWei(depositPrice, "ether") }
      );
      afterBalance = await web3.eth.getBalance(buyer);
    });
    it("Create transaction successfully", async () => {
      balanceBeforeOfOwner = await web3.eth.getBalance(owner);
      idTransaction = await transactionInstance.id;
      assert(idTransaction, 1, "Transaction id should be equal to 1");
      let stateOfTransaction = await transactionInstance.idToState(1);
      assert(stateOfTransaction, 0, "state of transaction should be equal 0");
      assert(
        beforeBalance - afterBalance,
        web3.utils.toWei(depositPrice, "ether"),
        "buyer must transfer the full deposit amount"
      ); // or balance of contract equal 1eth
    });
  });

  describe("Accept transaction", async () => {
    let tokenToState,
      tokenToOwners,
      idTransaction = 1;
    let depositPrice = "1"; //ETH
    let transferPrice = "2";
    let balanceBeforeOfOwner, balanceAfterOfOwner;
    before(async () => {
      balanceBeforeOfOwner = await web3.eth.getBalance(owner);
      console.log("balanceBeforeOfOwner", balanceBeforeOfOwner);
      result = await transactionInstance.acceptTransaction(idTransaction, {
        from: owner,
        value: "0",
      });
      balanceAfterOfOwner = await web3.eth.getBalance(owner);

      console.log("balanceAfterOfOwner", balanceAfterOfOwner);
      balanceBeforeOfOwner = new web3.utils.BN(balanceBeforeOfOwner);
      let price = web3.utils.toWei(depositPrice, "Ether");
      price = new web3.utils.BN(price);
      //check that seller recived funds
      const exepectedBalance = balanceBeforeOfOwner.add(price);
      assert.equal(balanceAfterOfOwner.toString(), exepectedBalance.toString());
    });
    it("Create transaction successfully", async () => {
      stateOfTransaction = await transactionInstance.idToState(1);
      assert.equal(
        stateOfTransaction.toNumber(),
        3,
        "State of transaction should be DEPOSIT_SIGNED: 3"
      );
    });
  });

  describe.only("test", async () => {
    it("create transaction", async () => {
      console.log(await web3.eth.getBalance(owner));
      await roleBasedAcl.addRole(notary, 1, { from: superadmin });
      console.log(await web3.eth.getBalance(owner));
      await realEstate.createCertificate("Base64 of certificate", [owner], {
        from: notary,
      });
      console.log(await web3.eth.getBalance(owner));
      await realEstate.activate(1, { from: owner, value: "0" });
      console.log(await web3.eth.getBalance(owner));
      await transactionInstance.createTransaction(
        [buyer],
        1,
        1000000,
        2000000,
        20,
        { from: buyer, value: 1000000 }
      );
      console.log(await web3.eth.getBalance(owner));
      await transactionInstance.acceptTransaction(1, {
        from: owner,
        value: "0",
      });
      console.log(await web3.eth.getBalance(owner));
    });
  });
});
