async function main() {
  const Contract = await ethers.getContractFactory("NamasteDuniya");
  const deployedContract = await Contract.deploy();

  // console.log(deployedContract);
  console.log("Contract deployed to address:", deployedContract.address);
}

main()
  .then()
  .catch(console.error)
  .finally(() => process.exit(0));
