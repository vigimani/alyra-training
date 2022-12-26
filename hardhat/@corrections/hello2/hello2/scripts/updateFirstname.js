const { ethers } = require("hardhat")

async function updateFirstname() {
    const Hello = await ethers.getContract("Hello")

    const setFirstname = await Hello.setFirstname("bang3")
    await setFirstname.wait(1)

    let newFirstname = await Hello.getFirstname()
    console.log(`The new firstname is ${newFirstname}`)
}

updateFirstname()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
    })