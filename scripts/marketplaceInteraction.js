const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/base_sepolia');
// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

const buyer = new ethers.Wallet("0xa1f9bdb63318d4ec835f23c0e18dc541d7694ac587130f4847baf5f34218bc76", provider);
// const buyer = new ethers.Wallet("0xe296bb3a7c5b6d9dcfe734652512054233f843791b4e2c4f7c465e3bbdc87090", provider);
console.log("buyer:", buyer.address);

const seller = new ethers.Wallet("0x7cca78e5b80856b38342e2259957e8b9705288ee4397239fb24da756b43a5b21", provider);
// const seller = new ethers.Wallet("0x022de6c59e884641d98200ccaae4d323b8b4649a4396d27312fb202dba173c98", provider);
console.log("seller:", seller.address);

const mpArtifact = require('../artifacts/contracts/MarketplaceV2.sol/MarketplaceV2.json');
const mpContractAddress = "0xC57f3a8ed810d812E196d73736d267cfE1090EFf";

const mpSellerContract = new ethers.Contract(mpContractAddress, mpArtifact.abi, seller);
const mpBuyerContract = new ethers.Contract(mpContractAddress, mpArtifact.abi, buyer);

const erc20Artifact = require('@openzeppelin/contracts/build/contracts/ERC20.json');
const usdcAddress = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";
const usdcContract = new ethers.Contract(usdcAddress, erc20Artifact.abi, buyer);

async function main() {
    let txn, rec;

    const pName = "Product 1";
    const pPrice = 100_000;
    const pQuantity = 100;

    // let txnData = await mpSellerContract.populateTransaction.addProduct(pName, pPrice, pQuantity);
    // console.log("txnData:", txnData);
    // const abi = new ethers.utils.Interface(mpArtifact.abi);
    // const encodedData = abi.encodeFunctionData('addProduct', [pName, pPrice, pQuantity]);
    // console.log("enc:", encodedData);
    // const decodedData = abi.decodeFunctionData('addProduct', txn.data);
    // console.log("dec:", decodedData);
    // const decodedTxn = abi.parseTransaction(txn);
    // console.log("dec txn:", decodedTxn);

    // txn = await mpSellerContract.addProduct(pName, pPrice, pQuantity);
    // console.log("txn:", txn);
    // rec = await txn.wait();
    // for (const log of rec.logs) {
    //     if (log.address !== mpContractAddress) continue;
    //     const parsedLog = mpSellerContract.interface.parseLog(log);
    //     if (!parsedLog.name === "ProductAdded") continue;
    //     console.log("parsedLog, productId:", parsedLog.args.id.toNumber());
    // }

    // const productCount = await mpBuyerContract.getProductCount();
    // console.log("productCount:", productCount);

    // const products = await mpBuyerContract.getProducts();
    // console.log("products:", products);

    // const productId = 0;
    // const product = await mpBuyerContract.getProduct(productId);
    // console.log("product:", product);

    // txn = await usdcContract.approve(mpContractAddress, pPrice);
    // console.log("txn:", txn);
    // rec = await txn.wait();
    // console.log("rec:", rec);

    const valueToSend = ethers.utils.parseEther("0.001");

    txn = await mpBuyerContract.executeOrder({
        productId: 0,
        quantity: 1
    }, {value: valueToSend});
    console.log("txn:", txn);
    rec = await txn.wait();
    console.log("rec:", rec);
    for (const log of rec.logs) {
        if (log.address !== mpContractAddress) continue;
        const parsedLog = mpBuyerContract.interface.parseLog(log);
        if (!parsedLog.name === "OrderExecuted") continue;
        console.log("parsedLog, Order details:", parsedLog);
    }
}
main();
