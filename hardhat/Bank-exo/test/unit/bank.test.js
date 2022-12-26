const { assert, expect } = require("chai")
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { messagePrefix } = require("@ethersproject/hash");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Units tests of Bank smart contract", function () {
        let accounts;
        let bank;
        before(async () => {
            accounts = await ethers.getSigners() 
            deployer = accounts[0]
        })

        describe("Deployment", async function() {
            it("should deploy the smart contract", async function() {
                await deployments.fixture(["bank"])
                bank = await ethers.getContract("Bank")
            })
        })

        describe("deposit", async function() {
            it("should deposit on the contract", async function() {
                
              
            })
            it("should NOT deposit on the contract", async function() {
                await expect(bank.deposit()).to.be.revertedWith("not enough funds deposited")
            })
        })
    })