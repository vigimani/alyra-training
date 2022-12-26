// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Bank {
    struct Account {
        uint balance;
        uint lastDeposit;
    }
    uint Balance; 

    mapping(address => Account) private accounts;

    event etherDeposited(address indexed account, uint amount);
    event etherWithdrawed(address indexed account, uint amount);

    function getBalanceAndLastPayment() external view returns(Account memory) {
        return accounts[msg.sender];
    }

    function getBalanceTotal() public view returns(uint){
        return Balance;
    }
    function withdraw(uint _amount) external {
        require(accounts[msg.sender].balance >= _amount, "not enough funds");
        accounts[msg.sender].balance -= _amount;
        Balance -= _amount;
        (bool success, ) = msg.sender.call{value: _amount, gas:50000}("");
        require(success, "transfer failed");
        emit etherWithdrawed(msg.sender, _amount);
    }
    function deposit() public payable {
        require(msg.value >0, "not enough funds deposited");
        accounts[msg.sender].balance += msg.value;
        accounts[msg.sender].lastDeposit = block.timestamp; 
        Balance += msg.value;
        emit etherDeposited(msg.sender, msg.value);
    }
}
