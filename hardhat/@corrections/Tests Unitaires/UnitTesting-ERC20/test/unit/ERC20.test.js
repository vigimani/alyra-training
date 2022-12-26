const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require('../../helper-hardhat-config')
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

!developmentChains.includes(network.name)
    ? describe.skip 
    : describe("AlyraIsERC20 Unit Tests", function() {
        let accounts;
        let alyraIsERC20;

        before(async() => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
        })

        describe("Deployment", async function() {
            it('Should deploy the smart contract and send tokens to the deployer', async function() {
                await deployments.fixture(["erc20"])
                alyraIsERC20 = await ethers.getContract("AlyraIsERC20")
                
                let balanceOfDeployer = await alyraIsERC20.balanceOf(deployer.getAddress())
                //console.log(balanceOfDeployer.toString())
                //assert(balanceOfDeployer.toString() === "1000000000000000000000000")
                //expect(balanceOfDeployer).eq(ethers.BigNumber.from("1000000000000000000000000"))
                let oneMillionInWei = ethers.utils.parseEther("1000000")
                expect(balanceOfDeployer).eq(oneMillionInWei)

                let nameOfToken = await alyraIsERC20.name()
                let symbolOfToken = await alyraIsERC20.symbol()
                // console.log(nameOfToken)
                // console.log(symbolOfToken)
                assert(nameOfToken === "Alyra")
                assert(symbolOfToken === "AlToken")
            })
        })

        describe("Mint", async function() {
            it("should be possible to mint if owner", async function() {
                await alyraIsERC20.mint(deployer.getAddress(), 100)
                let balanceOfDeployer = await alyraIsERC20.balanceOf(deployer.getAddress())
                //assert(balanceOfDeployer.toString() === "1000000000000000000000100")
                let newBigNumber = ethers.utils.parseEther("1000000")
                const bigNumber = ethers.BigNumber.from(newBigNumber.toString()).add(100)
                assert(balanceOfDeployer.toString() === bigNumber.toString())
            })

            it("should NOT be possible to mint if NOT the owner", async function() {
                await expect(
                    alyraIsERC20.connect(accounts[1]).mint(accounts[1].getAddress(), 52345435435400)
                ).to.be.revertedWith("Ownable: caller is not the owner")
            })
        })
    })