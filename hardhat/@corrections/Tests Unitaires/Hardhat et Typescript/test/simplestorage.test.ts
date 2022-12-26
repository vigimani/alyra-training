import { expect, assert } from "chai";
import { ethers, network, deployments } from "hardhat";
import { SimpleStorage } from "../typechain-types/SimpleStorage";
import { developmentChains } from "../helper-hardhat-config"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Simple Storage test", function () {
      let contract: SimpleStorage; 
      let accounts;//type tab de signers
      let deployer;//type signers
      before(async function() {
        accounts = await ethers.getSigners() 
        deployer = accounts[0]
      })
      
      describe("Test", function() {
        beforeEach(async() => {
          await deployments.fixture(["simplestorage"])
          contract = await ethers.getContract("SimpleStorage")
        })

        it("should get the number and the number should be equal to 0", async function() {
          let number = await contract.get();
          console.log(number.toString())
        })
      })
})