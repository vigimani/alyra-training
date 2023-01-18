// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {

    uint number;

    function setNumber(uint _number) external {
        number = _number;
    }

    function getNumber() external view returns(uint) {
        return number;
    }

}
