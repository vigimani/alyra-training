const SimpleStorage = artifacts.require("SimpleStorage");

module.exports=(deployer) => {
    deployer.deploy(SimpleStorage, {value: "926000000000000000000"})
}