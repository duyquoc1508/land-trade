// require run all describe one time. don't use "only"

const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");

require("chai").use(require("chai-as-promised")).should();

contract("RealEstate", (accounts) => {
  const [superadmin, notary, owner, buyer] = [...accounts];
  // default account[0] has role 'SUPER_ADMIN'
  let realEstate, roleBasedAcl;

  before(async () => {
    // deploy role based ACL contract first.
    roleBasedAcl = await RoleBasedAcl.new();
    // get RoleBasedAcl contract address to create realEstate contract
    realEstate = await RealEstate.new(roleBasedAcl.address);
  });

  describe("Deployment", async () => {
    it("Deploys RealEstate successfully", async () => {
      const address = await realEstate.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  // account1: notary, [owner]: owners
  describe("Create certificate", async () => {
    let result, idCertificate, tokenToOwners, tokenToState, tokenToNotary;
    const certificate = ["Base64 of certificate", [owner]];
    before(async () => {
      // Grant notary permissions to account1
      await roleBasedAcl.addRole(notary, 1, { from: superadmin });
      result = await realEstate.createCertificate(...certificate, {
        from: notary,
      });
      // current certificate id
      idCertificate = await realEstate.certificateCount();
      tokenToNotary = await realEstate.tokenToNotary(idCertificate);
      tokenToState = await realEstate.tokenToState(idCertificate);
      tokenToOwners = await realEstate.getOwnersOf(idCertificate);
    });
    it("Create certificate successfully", async () => {
      assert.equal(idCertificate, 1);
      assert.equal(tokenToNotary, notary);
      assert.equal(
        tokenToState.toNumber(),
        0,
        "State of certificate should be pendding"
      );
    });
    it("Should be emit event NewCertificate", async () => {
      let event = result.logs[0].args;
      assert.equal(event.idCertificate.toNumber(), 1);
    });
    it("Only allow notary", async () => {
      // FAILURE: Superadmin should be rejected
      await realEstate.createCertificate(...certificate, { from: superadmin })
        .should.be.rejected;
      // FAILURE: Normal user should be rejected
      await realEstate.createCertificate(...certificate, { from: owner }).should
        .be.rejected;
    });
  });

  describe("Activate certificate", async () => {
    let tokenToState,
      tokenToOwners,
      idCertificate = 1;
    let result;
    before(async () => {
      tokenToOwners = await realEstate.getOwnersOf(idCertificate);
      tokenToState = await realEstate.tokenToState(idCertificate);
      tokenToApprove = await realEstate.getOwnerApproved(idCertificate);
    });

    it("Activate successfully", async () => {
      assert.equal(tokenToState.toNumber(), 0);
      result = await realEstate.activate(idCertificate, { from: owner });
      tokenToState = await realEstate.tokenToState(idCertificate);
      assert.equal(
        tokenToState.toNumber(),
        1,
        "State of certificate should be 1"
      );
    });
    it("Should be emit event Activate", async () => {
      let event = result.logs[0].args;
      assert.equal(event.owner, owner);
    });
    it("Should be reject if not onwer", async () => {
      //FAILURE: Role superadmin
      await realEstate.activate(idCertificate, { from: superadmin }).should.be
        .rejected;
      //FAILUREl Role notary
      await realEstate.activate(idCertificate, { from: notary }).should.be
        .rejected;
    });
  });
});
