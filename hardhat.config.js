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
      accounts: ['0x2a567ca8aa3bb4afebd7d157010218422d625c18598c5967ab3626d6e8e44a43']
    },
    basepolia: {
      url: "https://rpc.ankr.com/base_sepolia",
      accounts: ['0xa9abb575842ac760073f7e14819bd65eb57ea03030052bafba8e05c1bcaaa664']
    }
  }
};
