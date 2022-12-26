require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const PK = process.env.PK || "";
const ALCHEMY = process.env.ALCHEMY_API || "";
const POLYGONSCAN = process.env.POLYGONSCAN || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    mumbai : {
      url: ALCHEMY,
      accounts: [`0x${PK}`],
      chainId: 80001
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  solidity : {
    compilers: [
      {
        version: "0.8.17"
      }
    ]
  },
  etherscan: {
    apiKey: POLYGONSCAN,
  }
};
