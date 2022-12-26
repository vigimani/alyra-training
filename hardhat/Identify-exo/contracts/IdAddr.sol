// SPDX-License-Identifier: MIT 
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

pragma solidity 0.8.17;

contract Identification is Ownable {
    struct Person {
        string lastName;
        string firstName; 
        uint age;
    }
    mapping(address => Person) persons;

    constructor(string memory _lastname, string memory _firstname, uint _age){
        Person memory people = Person(_lastname, _firstname, _age);
        persons[msg.sender]=people;
    }
    function addPerson(address _address, string memory _lastname, string memory _firstname, uint _age) external onlyOwner {
        Person memory people = Person(_lastname, _firstname, _age);
        persons[_address]=people;
    }
    function getPerson(address _address) external view returns (Person memory) {
        return persons[_address];
    }

}