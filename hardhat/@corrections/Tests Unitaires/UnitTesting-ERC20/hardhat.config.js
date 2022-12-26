require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")

const INFURA = process.env.INFURA || "";
const PK = process.env.PK  || "";
const ETHERSCAN = process.env.ETHERSCAN  || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: INFURA,
      accounts: [`0x${PK}`],
      chainId: 5,
      blockConfirmations: 6
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN,
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  gasReporter: {
    enabled: true,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17"
      }
    ]
  }
};