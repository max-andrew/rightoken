// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UnspokenRightoken is ERC20 {
	constructor() ERC20("Unspoken-Ekaynuh", "RTKN-MKNULLA-4") {
		_mint(0xe72F45c742866E4FF07bA49Fade57C758962C6dA, 100000000000000000000);
	}
}