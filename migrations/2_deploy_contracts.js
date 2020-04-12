const RoleBasedAcl = artifacts.require("./RoleBasedAcl.sol");
const RealEstate = artifacts.require("./RealEstate.sol");

module.exports = function(deployer) {
  deployer.deploy(RoleBasedAcl).then(function() {
    deployer.deploy(RealEstate, RoleBasedAcl.address);
  });
};
