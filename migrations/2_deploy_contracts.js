const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");
const Transaction = artifacts.require("./Transaction.sol");

module.exports = function (deployer) {
  deployer.deploy(RoleBasedAcl).then(function () {
    return deployer.deploy(RealEstate, RoleBasedAcl.address).then(function () {
      return deployer.deploy(Transaction, RealEstate.address);
    });
  });
};
