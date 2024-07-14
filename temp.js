const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/base_sepolia');

const contractArtifact = require('./artifacts/contracts/NamasteDuniya.sol/NamasteDuniya.json');

const contractAddress = "0x58316360C94b45a4D48eb4162C0b06f90e642D5E";
const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

contract.get().then((greeting) => {
    console.log('greeting', greeting);
}).catch((err) => {
    console.error('error', err);
}).finally(() => {
    process.exit(0);
});