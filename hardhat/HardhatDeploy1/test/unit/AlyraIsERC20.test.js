const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { reverted, revertedWith } = require("@nomicfoundation/hardhat-chai-matchers");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Units tests of AlyraERC20 smart contract", function () {
        let accounts;
        let AlyraIsERC20;
        before(async () => {
            accounts = await ethers.getSigners() 
            deployer = accounts[0]
        })

        describe("Deployment", async function() {
            it("should deploy the smart contract", async function() {
                await deployments.fixture(["erc20"])
                AlyraIsERC20 = await ethers.getContract("AlyraIsERC20")
            })
            it("should check balance of owner", async function() {
                let balance = await AlyraIsERC20.balanceOf(accounts[0].address)
                assert.equal(balance.toString(),77777000000000000001000 )
            })
        })
        describe("Mint", async function() {
            it("should mint tokens", async function() {
                let oldBalance = await AlyraIsERC20.balanceOf(deployer.address)
                console.log(oldBalance)
                let amountToMint = 1111111111;
                let balance = parseInt(oldBalance.toString()) + amountToMint
                const mintTx = await AlyraIsERC20.mint(deployer.address, amountToMint)
                await mintTx.wait(1)
                let newBalance = await AlyraIsERC20.balanceOf(deployer.address)
                console.log("Old Balance : "+oldBalance.toString())
                console.log("amount minted : "+amountToMint.toString())
                console.log("New Balance : "+newBalance.toString())
                assert.equal(balance, newBalance.toString())
            }),
            it("should revert minting if not owner", async function() {
                let amountToMint = 1111111111;
                const mintTx = await AlyraIsERC20.mint(accounts[1].address, amountToMint)
                await mintTx.wait(1)
                expect(await mintTx).to.be.revertedWith("")
            })
        })

        

    })