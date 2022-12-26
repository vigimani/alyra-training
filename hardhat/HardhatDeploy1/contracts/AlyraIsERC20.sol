// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract AlyraIsERC20 is ERC20, Ownable {
    constructor() ERC20("Alyra", "VGAlyra") {
        _mint(msg.sender, 77777 * 10 ** decimals());
    }
    function mint(address _to, uint256 _amount) public onlyOwner{
        _mint(_to, _amount);
    }

}