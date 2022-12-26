// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error Owner__NotTheOwner();
error Owner__ContractIsPaused();

contract Owner {

    address immutable i_owner;
    bool public paused;
    uint public number;

    constructor() {
        i_owner = msg.sender;
    }

    function setPaused(bool _paused) public {
        if(msg.sender != i_owner) {
            revert Owner__NotTheOwner();
        }
        paused = _paused;
    }

    function setNumber(uint _number) public {
        if(msg.sender != i_owner) {
            revert Owner__NotTheOwner();
        }
        if(paused) {
            revert Owner__ContractIsPaused();
        }
        number = _number;
    }

}


