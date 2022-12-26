// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract ExerciceTransferts {

    address myAddress;

    function setMyAddress(address _myAddress) public {
        require(_myAddress != address(0), "Don't send money on address 0 please");
        myAddress = _myAddress;
    }

    function getBalance() view public returns(uint) {
        return myAddress.balance;
    }

    function getBalanceOfAddress(address _myAddress) view public returns(uint) {
        return _myAddress.balance;
    }

    function transferEth(address payable _to) public payable {
        require(msg.value >= 1, "Not enought Eth transfered");
        require(_to != address(0), "Don't send money on address 0 please");
        (bool received, ) = _to.call{value: msg.value}("");
        require(received, "The transfer failed");
    }

    function tryToTransfer(uint _limit) public payable {
        require(msg.value >= 1, "Not enought Eth transfered");
        require(getBalance() >= _limit, "Not enought funds on the address that will receive the Eths");
        (bool received, ) = myAddress.call{value: msg.value}("");
        require(received, "The transfer failed");

    }

}