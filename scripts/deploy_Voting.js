async function main() {
  const Contract = await ethers.getContractFactory("Voting");
  const CounterV3Contract = "0x158870387f5695da6cb8fb6e2bc9dfeb9f9367fd";
  const deployedContract = await Contract.deploy(CounterV3Contract);

  // console.log(deployedContract);
  console.log("Contract deployed to address:", deployedContract.address);
}

main()
  .then()
  .catch(console.error)
  .finally(() => process.exit(0));
