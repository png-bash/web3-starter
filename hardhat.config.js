require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.0" }
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
      accounts: ['0xa9abb575842ac760073f7e14819bd65eb57ea03030052bafba8e05c1bcaaa664']
    }
  }
};
