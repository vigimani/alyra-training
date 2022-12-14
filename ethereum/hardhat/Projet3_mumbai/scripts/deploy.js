const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const hre = require("hardhat");

async function main() {

  const Contract = await hre.ethers.getContractFactory("Bank");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`Contract deployed at address : ${contract.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
