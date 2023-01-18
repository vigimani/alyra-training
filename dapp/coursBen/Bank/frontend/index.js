import { ethers } from "./ethers.min.js"
import { abi, contractAddress }  from "./constant.js"

const connectButton = document.getElementById('connectButton')
const sendEthers = document.getElementById('sendEthers')
const withdrawEthers =document.getElementById('withdrawEthers')
const inputNumberSend = document.getElementById('inputNumberSend')
const inputNumberWithdraw =document.getElementById('inputNumberWithdraw')
const getMyBalance =document.getElementById('getNumber')
let connectedAccount;

connectButton.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined") {
        const resultAccount = await window.ethereum.request({method:"eth_requestAccounts"})
        connectedAccount = ethers.utils.getAddress(resultAccount[0]);
        connectButton.innerHTML = "Connected with " + connectedAccount.substring(0,5) + "..." + connectedAccount.substring(connectedAccount.length-4) 
        await updateBalance()
    } else {
        connectButton.innerHTML = "Please install metamask"
    }
})

withdrawEthers.addEventListener('click', async function(){
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let ethToWithdraw = inputNumberWithdraw.value
            ethToWithdraw = ethers.utils.parseEther(ethToWithdraw)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.withdraw(ethToWithdraw)
            await transaction.wait(1)
            await updateBalance()
        }
        catch(e) {
            console.log(e.message)
        }
    } else {
        connectButton.innerHTML = "Please install metamask"
    }
})

sendEthers.addEventListener('click', async function(){
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let ethToSend = inputNumberSend.value
            ethToSend = ethers.utils.parseEther(ethToSend)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.sendEthers({value: ethToSend})
            const number = await contract.getMyBalance()
            await transaction.wait(1)
            await updateBalance()
        }
        catch(e) {
            console.log(e.message)
        }
    } else {
        connectButton.innerHTML = "Please install metamask"
    }
})

const updateBalance = async() => {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let askbalance = await contract.getBalance()
            askbalance = ethers.utils.formatEther(askbalance.toString())
            document.getElementById("ethers_in_vault").innerHTML = askbalance
        }
        catch(e) {
            console.log(e.message)
        }
    } else {
        connectButton.innerHTML = "Please install metamask"
    }
}