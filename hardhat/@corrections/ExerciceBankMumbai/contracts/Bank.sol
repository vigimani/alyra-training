// SPDX-License-Identifier: MIT 
pragma solidity 0.8.17;

contract Bank {

    mapping(address => uint) balances;

    function withdraw() external {
        require(balances[msg.sender] > 0, "You dont have enough funds");
        uint balance = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool received, ) = msg.sender.call{value: balance}("");
        require(received, "Withdraw failed");
    }

    function deposit() external payable {
        require(msg.value >= 1, "Not enought funds provided");
        balances[msg.sender] += msg.value;
    }
}