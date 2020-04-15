const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("RealEstate", accounts => {
  const [owner, account1, account2, account3, account4, account5] = [...accounts];
  // default owner has role 'SUPER_ADMIN'
  let realEstate, roleBasedAcl;

  before(async () => {
    // deploy role based ACL contract first.
    roleBasedAcl = await RoleBasedAcl.new();
    // get RoleBasedAcl contract address to create realEstate contract
    realEstate = await RealEstate.new(roleBasedAcl.address);
  });

  describe("Deployment", async () => {
    it("deploys RoleBasedAcl successfully", async () => {
      const address = await roleBasedAcl.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
    it("deploys RealEstate successfully", async () => {
      const address = await realEstate.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  // account1: notary, [account3, account4]: owners
  describe("Certificate", async () => {
    let result, idCertificate, tokenToOwners, tokenToState, tokenToNotary;
    const certificate = [
      ["address", "purpose of use", "time of use", "origin of use", "20", "20", 200],
      [
        4,
        "200",
        "address",
        "house type",
        "appartment name",
        "floor area",
        "form of own",
        "time of use"
      ],
      "orther construction",
      "prod forest is artificial forest",
      "perennial tree",
      "notice",
      [account3, account4]
    ];
    before(async () => {
      // Grant notary permissions to account1
      await roleBasedAcl.addRole(account1, 1, { from: owner });
      result = await realEstate.createCertificate(...certificate, { from: account1 });
      // current certificate id
      idCertificate = await realEstate.certificateCount();
      tokenToNotary = await realEstate.tokenToNotary(idCertificate);
      tokenToState = await realEstate.tokenToState(idCertificate);
      tokenToOwners = await realEstate.getOwnersOf(idCertificate);
    });
    it("Create certificate successfully", async () => {
      assert.equal(idCertificate, 1);
      assert.equal(tokenToNotary, account1);
      // token state is 'pendding': 0
      assert.equal(tokenToState.toNumber(), 0, "State of certificate should be pendding");
      const event = result.logs[0].args;
      assert.equal(event.notary, account1);
      assert.equal(tokenToOwners.length, 2);
    });
    it("Only allow notary", async () => {
      // FAILURE: Superadmin should be rejected
      await realEstate.createCertificate(...certificate, { from: owner }).should.be.rejected;
      // FAILURE: Normal user should be rejected
      await realEstate.createCertificate(...certificate, { from: account2 }).should.be.rejected;
    });
  });

  describe("Activate", async () => {
    let tokenToState,
      tokenToApprove,
      tokenToOwners,
      idCertificate = 1;
    before(async () => {
      tokenToOwners = await realEstate.getOwnersOf(idCertificate);
      tokenToState = await realEstate.tokenToState(idCertificate);
      tokenToApprove = await realEstate.getOwnerApproved(idCertificate);
    });

    it("Activate successfully", async () => {
      assert.equal(tokenToState.toNumber(), 0);
      assert.equal(tokenToApprove.length, 0);
      const tx1 = await realEstate.activate(idCertificate, { from: account3 });
      const tx2 = await realEstate.activate(idCertificate, { from: account4 });
      tokenToState = await realEstate.tokenToState(idCertificate);
      assert.equal(tokenToState.toNumber(), 1);
      assert.equal(tx1.logs[0].args.owner, account3);
      assert.equal(tx2.logs[0].args.owner, account4);
    });

    it("Should be reject if not onwer", async () => {
      //FAILURE: Role superadmin
      await realEstate.activate(idCertificate, { from: owner }).should.be.rejected;
      //FAILUREl Role notary
      await realEstate.activate(idCertificate, { from: account1 }).should.be.rejected;
    });
  });

  describe("Activate sell", async () => {
    let tokenToState,
      tokenToApprove,
      tokenToOwners,
      idCertificate = 1;
    before(async () => {
      tokenToOwners = await realEstate.getOwnersOf(idCertificate);
      tokenToState = await realEstate.tokenToState(idCertificate);
      tokenToApprove = await realEstate.getOwnerApproved(idCertificate);
    });

    it("Activate sell successfully", async () => {
      assert.equal(tokenToState.toNumber(), 1);
      assert.equal(tokenToApprove.length, 0);
      const tx1 = await realEstate.activateSale(idCertificate, { from: account3 });
      const tx2 = await realEstate.activateSale(idCertificate, { from: account4 });
      tokenToState = await realEstate.tokenToState(idCertificate);
      assert.equal(tokenToState.toNumber(), 2);
      assert.equal(tx1.logs[0].args.owner, account3);
      assert.equal(tx2.logs[0].args.owner, account4);
    });

    it("Should be reject if not onwer", async () => {
      //FAILURE: Role superadmin
      await realEstate.activate(idCertificate, { from: owner }).should.be.rejected;
      //FAILUREl Role notary
      await realEstate.activate(idCertificate, { from: account1 }).should.be.rejected;
    });
  });

  describe("Transfer", async () => {
    let result,
      idCertificate = 1;
    before(async () => {
      result = await realEstate.transfer([account2], idCertificate, { from: account1 });
    });
    it("Transfer should successfully", async () => {
      const tokenToState = await realEstate.tokenToState(idCertificate);
      const tokenToApprove = await realEstate.getOwnerApproved(idCertificate);
      const tokenToOwners = await realEstate.getOwnersOf(idCertificate);
      assert.equal(tokenToState.toNumber(), 1);
      assert.equal(tokenToApprove.length, 0);
      assert.equal(tokenToOwners[0], account2);
      const event = result.logs[0].args;
      assert.equal(event.notary, account1);
      assert.equal(event.idCertificate, idCertificate);
    });
    it("Only allow notary", async () => {
      // FAILURE: Superadmin should be rejected
      await realEstate.transfer([account5], { from: owner }).should.be.rejected;
      // FAILURE: Current owner should be rejected
      await realEstate.transfer([account5], { from: account2 }).should.be.rejected;
    });
    it("Transfer to current owner should be rejected", async () => {
      // FAILURE: Can't transfer to current owner
      await realEstate.transfer([account3], { from: account1 }).should.be.rejected;
    });
  });
});
