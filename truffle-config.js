module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // change to 8545 if using ganache-cli
      network_id: "*"
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    }
  }
};
