require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.0" },
      { version: "0.8.20" }
    ],
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
      accounts: ['0x188380c867c3f27ea8332597f82ee42e60a81db891df47ebee9a47efec85de29']
    },
    basepolia: {
      url: "https://rpc.ankr.com/base_sepolia",
      accounts: ['0xa1f9bdb63318d4ec835f23c0e18dc541d7694ac587130f4847baf5f34218bc76']
    }
  }
};
