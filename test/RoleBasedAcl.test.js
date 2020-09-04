const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");

require("chai").use(require("chai-as-promised")).should();

contract("RoleBasedAcl", async (accounts) => {
  const [owner, account1, account2] = [...accounts];

  let instance;
  before(async () => {
    instance = await RoleBasedAcl.new();
  });

  describe("Deploy contract", async () => {
    it("Deployer should has role superadmin", async () => {
      const isSuperAdmin = await instance.hasRole(owner, 0);
      assert.equal(isSuperAdmin, true);
    });
  });

  describe("Add role", async () => {
    let result;
    it("Should add role successfully", async () => {
      result = await instance.addRole(account1, 1, { from: owner });
      const isNotary = await instance.hasRole(account1, 1);
      assert.equal(isNotary, true);
      const event = result.logs[0].args;
      assert.equal(event.account, account1);
      assert.equal(event.role, 1);
    });
    it("Should be emit event RoleAdded", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "RoleAdded");
      assert.equal(event.account, account1);
    });
    it("Should be rejected, user not permissions", async () => {
      {
        // FAILURE: An account should has only one role
        await instance.addRole(owner, 1, { from: owner }).should.be.rejected;
        // FAILURE: Method allowed only superadmin
        await instance.addRole(owner, 1, { from: account1 }).should.be.rejected;
      }
    });
  });

  describe("Remove role", async () => {
    before(async () => {
      let result = await instance.addRole(account2, 1, { from: owner });
    });
    let result;
    it("Should remove role successfully", async () => {
      result = await instance.removeRole(account2, 1, { from: owner });
      const isNotary = await instance.hasRole(account2, 1);
      assert.equal(isNotary, false);
      const event = result.logs[0].args;
      assert.equal(event.account, account2);
      assert.equal(event.role, 1);
    });
    it("Should be emit event RoleRemoved", async () => {
      let event = result.logs[0].args;
      assert.equal(result.logs[0].event, "RoleRemoved");
      assert.equal(event.account, account2);
    });
    it("Should be rejected", async () => {
      // FAILURE: Remove role account doesn't have role
      await instance.removeRole(owner, 1, { from: owner }).should.be.rejected;
      // FAILURE: Method allowed only superadmin
      await instance.removeRole(account1, 1, { from: account2 }).should.be
        .rejected;
      // FAILURE: Unable remove role superadmin by itself
      await instance.removeRole(owner, 0, { from: owner }).should.be.rejected;
    });
  });
});
