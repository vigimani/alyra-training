// SPDX-License-Identifier: MIT 
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity 0.8.17;

contract Hello is Ownable {
    string name;
    constructor (string memory _name){
        name = _name;
    }

    function sayHello() external view returns(string memory){
        return string(abi.encodePacked("Hello", " ", name));
    }
    function setPrenom(string memory _name) external onlyOwner {
        name = _name;
    }

}
