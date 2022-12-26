const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const Hello = await ethers.getContract("Hello")

    const firstname = await Hello.getFirstname()
    console.log(`The firstname is ${firstname}`)

    const setFirstname = await Hello.setFirstname("bang2")
    await setFirstname.wait(1)

    let newFirstname = await Hello.getFirstname()
    console.log(`The new firstname is ${newFirstname}`)
}

module.exports.tags = ["all", "erc20", "mint"]