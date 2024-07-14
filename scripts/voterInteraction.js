const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/base_sepolia');

const wallet = new ethers.Wallet("0xa1f9bdb63318d4ec835f23c0e18dc541d7694ac587130f4847baf5f34218bc76", provider);
console.log("owner", wallet.address);

const newOwner = new ethers.Wallet("0x7cca78e5b80856b38342e2259957e8b9705288ee4397239fb24da756b43a5b21", provider);
console.log("new addr: ", newOwner.address);

const contractArtifact = require('../artifacts/contracts/CounterV3.sol/CounterV3.json');
const contractAddress = "0x158870387F5695da6cB8fB6e2Bc9DfEB9F9367FD";
let contract = new ethers.Contract(contractAddress, contractArtifact.abi, wallet);

const votingArtifact = require('../artifacts/contracts/Voting.sol/Voting.json');
const votingContractAddress = "0x4cd82C206e90B9619Cf1206913d04fDB1E2f6dA8";
const votingContract = new ethers.Contract(votingContractAddress, votingArtifact.abi, wallet);

async function main() {
    // let tx = await contract.addOwner(votingContractAddress);
    // let rec = await tx.wait();
    // console.log("add owner", votingContractAddress);

    const deadline = parseInt((Date.now() + 1000 * 60 * 60 * 24 * 7)/1000);
    tx = await votingContract.createCampaign("Campaign 1", "some random description", deadline);
    rec = await tx.wait();
    console.log("campaign created");
    console.log(tx);

    const campains = await votingContract.getCampaigns();
    console.log("campains", campains);

    // const voter = new ethers.Contract(votingContractAddress, votingArtifact.abi, newOwner);
    // const vote = await voter.vote(5, true);
}
main();
