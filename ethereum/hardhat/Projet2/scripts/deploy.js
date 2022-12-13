const hre = require("hardhat");

async function main() {

  const HelloC = await hre.ethers.getContractFactory("Hello");
  const helloC = await HelloC.deploy("Kylian");

  await helloC.deployed();

  console.log(`Contract deployed at address : ${helloC.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
