// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Bank{
    uint Balance;

    mapping(address => uint) balances;

    function deposit(uint _amount) external payable {
        balances[msg.sender] += _amount; 
    }

    function getBalance(address _addr) public view returns(uint){
        return balances[_addr];
    }
    function withdraw() external {
        require(balances[msg.sender] > 0, "You dont have enough funds");
        uint balance = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool received, ) = msg.sender.call{value: balance}("");
        require(received, "Withdraw failed");

    }

}