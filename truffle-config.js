const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: "0.5.3",
    },
  },
  networks: {
    production: {
      host: "167.179.75.85",
      port: 8545,
      network_id: 2020,
      from: "0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f",
      gasPrice: 0,
      gas: 6721975,
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gasPrice: 0,
    },
  },
};
