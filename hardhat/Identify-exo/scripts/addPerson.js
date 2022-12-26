const { network, ethers, getNamedAccounts } = require("hardhat")

async function addPeople() {
    const { deployer } = await getNamedAccounts()
    const IdAddresse = await ethers.getContract("Identification")
    const addPeopletx = await IdAddresse.addPerson("0x60714bc8a71095eA454572AAEb23e845f6446760", "meta", "mask", 357)
    await addPeopletx.wait(1)
    console.log(`New people add by ${deployer}`)
}

addPeople()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })