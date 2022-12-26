// const { assert, expect } = require("chai")
// const { network, deployments, ethers } = require("hardhat")
// const { developmentChains } = require("../../helper-hardhat-config")
// const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// !developmentChains.includes(network.name)
//     ? describe.skip
//     : describe("Spa Unit Tests", function () {
//         let accounts;
//         let spa;
//         before(async () => {
//             // could also do with getNamedAccounts
//             accounts = await ethers.getSigners() 
//             deployer = accounts[0]
//         })

//         describe("Deployment", async function() {
//             it("should deploy the smart contract", async function() {
//                 await deployments.fixture(["spa"])
//                 spa = await ethers.getContract("Spa")
//             })
//         })

//         describe("Add", async function() {
//             it("should add an animal", async function() {
//                 await expect(await spa.add("Bleu Russe", 30, 10)).to.emit(
//                     spa,
//                     "animalAdded"
//                 )
//                 let animal = await spa.get(0)
//                 assert(animal[0] === "Bleu Russe")
//             })
//         })

//         describe("Get", async function() {
//             it("should get an animal", async function() {
//                 let animal = await spa.get(0)
//                 assert(animal[0] === "Bleu Russe")
//             })
//         })

//         describe("Set", async function() {
//             it('should set an animal', async function() {
//                 await spa.set(0, "Rouge Russe", 31, 16)
//                 let animal = await spa.get(0)
//                 assert(animal[0] === "Rouge Russe")
//                 assert(animal[1].toString() === "31")
//                 assert(animal[2].toString() === "16")
//                 assert(animal[3] === false)
//             })
//         })

//         describe("Remove", async function() {
//             it('should remove an animal', async function() {
//                 await spa.remove(0)
//                 let animal = await spa.get(0)
//                 assert(animal[0] === "")
//             })
//         })

//         describe("Add", async function() {
//             it("should add an animal", async function() {
//                 await expect(await spa.add("Bleu Russe", 30, 10)).to.emit(
//                     spa,
//                     "animalAdded"
//                 )
//                 let animal = await spa.get(1)
//                 assert(animal[0] === "Bleu Russe")
//             })
//         })

//         describe("Adopt", async function() {
//             it('should adopt en animal', async function() {
//                 await expect(await spa.adopt(1)).to.emit(
//                     spa,
//                     "animalAdopted"
//                 )
//                 let animal = await spa.get(1)
//                 assert(animal[3] === true)
//             })

//             it('should NOT adopt an animal if the animal is already adopted', async function() {
//                 await expect(spa.adopt(1)).to.be.revertedWithCustomError(
//                     spa,
//                     "Spa__AlreadyAdopted"
//                 )
//             })
//         })

//         describe("Adoption", async function() {
//             it('should get the animal adopted by an address', async function() {
//                 let animal = await spa.getAdoption(deployer.address)
//                 assert(animal[0] === "Bleu Russe")
//             })
//         })

//         describe("Add", async function() {
//             it("should add an animal", async function() {
//                 await expect(await spa.add("Berger Allemand", 70, 3)).to.emit(
//                     spa,
//                     "animalAdded"
//                 )
//                 let animal = await spa.get(2)
//                 assert(animal[0] === "Berger Allemand")
//             })
//             it("should add an animal", async function() {
//                 await expect(await spa.add("Doberman", 60, 5)).to.emit(
//                     spa,
//                     "animalAdded"
//                 )
//                 let animal = await spa.get(3)
//                 assert(animal[0] === "Doberman")
//             })
//         })

//         describe("AdoptIfMax", async function() {
//             it("should adopt if correct values are provided", async function() {
//                 await expect(spa.connect(accounts[1]).adoptIfMax("Doberman", 70, 6)).to.emit(
//                     spa,
//                     "animalAdopted"
//                 )
//                 let animal = await spa.get(3)
//                 assert(animal[3] === true)
//             })

//             it('should NOT adopt an animal if no animal corresponds to the demand', async function() {
//                 let transaction = await spa.connect(accounts[1]).adoptIfMax("Berger Allemand", 60, 6)
//                 let animal = await spa.get(2)
//                 assert(animal[3] === false)
//             })
//         })
//     })