const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Basic ERC20
    const AlyraIsERC20 = await ethers.getContract("AlyraIsERC20", deployer)
    let amountToMint = ethers.BigNumber.from("1000000000000000000000000");
    const MintTx = await AlyraIsERC20.mint(deployer, amountToMint)
    await MintTx.wait(1)
    let balance = await AlyraIsERC20.balanceOf(deployer)
    console.log(`Balance of deployer ${deployer} is ${balance.toString()}`)
    
}
module.exports.tags = ["all", "mint"]