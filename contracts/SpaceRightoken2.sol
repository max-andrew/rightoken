// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SpaceRightoken2 is ERC20 {
	constructor() ERC20("Space-Ekaynuh", "RTKN-MKNULLA-2") {
		_mint(0xe72F45c742866E4FF07bA49Fade57C758962C6dA, 100000000000000000000);
	}
}