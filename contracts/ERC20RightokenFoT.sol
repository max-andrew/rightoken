// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Rightoken is ERC20 {
	constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_) {
		_mint(msg.sender, 100*10**18);
	}

	// override transfer method
	function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
		_transfer(_msgSender(), recipient, amount-(amount.div(5).mul(2).div(10)));
		_transfer(_msgSender(), 0xA5390a8D9b255043f8C1E5A7808b24B509f7A390, amount.div(5).mul(2).div(10));
		return true;
	}

	// check if the msg.sender in transferFrom is the uniswap router
}