import { HardhatRuntimeEnvironment } from "hardhat/types";
import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { verify } from "../utils/verify";
import { developmentChains } from "../helper-hardhat-config";
    
const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("--------------------------------------")
    let args = [] 
    const SimpleStorage = await deploy("SimpleStorage", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    //Verify the smart contract 
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
        log("Verifying...")
        await verify(SimpleStorage.address, args)
    }
}

export default func;
func.tags = ['simplestorage'];