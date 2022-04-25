// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Rightoken is ERC20 {
	constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_) {
		_mint(msg.sender, 100*10**18);
	}

	function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
		_transfer(_msgSender(), recipient, amount);
		return true;
	}
}