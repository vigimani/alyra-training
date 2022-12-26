// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./Owner.sol";

error CorrigeCompteEpargne__MoneyNoReceived();

contract CorrigeCompteEpargne is Owner {

    mapping(uint => uint)  deposits;
    uint public numberOfDeposits;
    uint public timestampFirstDeposit;

    function withdraw() external onlyOwner {
        require(block.timestamp > timestampFirstDeposit + 1 minutes, "It's not the time to withdraw");
        (bool received, ) = i_owner.call{value: address(this).balance}("");
        //require(received, "An error occured");
        if(!received) {
            revert CorrigeCompteEpargne__MoneyNoReceived();
        }
    }

    receive() external payable {
        numberOfDeposits++;
        if(numberOfDeposits == 1) {
            timestampFirstDeposit = block.timestamp;
        }
        deposits[numberOfDeposits] = msg.value;
    }
}