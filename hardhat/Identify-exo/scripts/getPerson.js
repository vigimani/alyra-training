const { network, ethers, getNamedAccounts } = require("hardhat")

async function getPeople() {
    const { deployer } = await getNamedAccounts()
    const IdAddresse = await ethers.getContract("Identification")
    const getPeople = await IdAddresse.getPerson("0x60714bc8a71095eA454572AAEb23e845f6446760")
    console.log(getPeople.age.toNumber())
}

getPeople()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })