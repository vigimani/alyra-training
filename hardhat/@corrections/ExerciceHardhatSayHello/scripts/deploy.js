const hre = require("hardhat");

async function main() {

  const SayHello = await hre.ethers.getContractFactory("SayHello");
  const sayHello = await SayHello.deploy("Jean");

  await sayHello.deployed();

  console.log(
    `sayHello deployed at address : ${sayHello.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
