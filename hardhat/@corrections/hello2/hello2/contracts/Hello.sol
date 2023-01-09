// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Hello is Ownable {
    string firstname;

    constructor(string memory _firstname) {
        firstname = _firstname;
    }

    function sayHello() external view returns (string memory) {
        return concatenate("Hello", firstname);
    }

    function getFirstname() external view returns (string memory) {
        return firstname;
    }

    function setFirstname(string memory _firstname) external onlyOwner {
        firstname = _firstname;
    }

    function concatenate(string memory a, string memory b)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(a, " ", b));
    }
}
