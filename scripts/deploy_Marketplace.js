async function main() {
  const Contract = await ethers.getContractFactory("Marketplace");
  const CounterV3Contract = "0x158870387f5695da6cb8fb6e2bc9dfeb9f9367fd";
  const USDCContract = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";
  const deployedContract = await Contract.deploy(CounterV3Contract, USDCContract);


  // console.log(deployedContract);
  console.log("Contract deployed to address:", deployedContract.address);
}

main()
  .then()
  .catch(console.error)
  .finally(() => process.exit(0));
