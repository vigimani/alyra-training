// SPDX-license-identifier: MIT 
pragma solidity ^0.8.17;

contract People {
    
    struct Wallet {
        uint balance;
        uint numPayments;
    }

    mapping(address => Wallet) wallets;

    function getTotalBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getBalance() public view returns(uint) {
        return wallets[msg.sender].balance;
    }

    function withdraw(address payable _to) public {
        uint balanceOfUser = wallets[msg.sender].balance;
        wallets[msg.sender].balance = 0;
        (bool received, ) = _to.call{value: balanceOfUser}("");
    }

    receive() external payable {
        wallets[msg.sender].balance += msg.value;
        wallets[msg.sender].numPayments++;
    }

}