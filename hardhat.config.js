require('@nomiclabs/hardhat-ethers');
const { infuraApiKey, mnemonic } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.6.6",
			},
			{
				version: "0.8.4",
			},
		],
	},
	networks: {
		goerli: {
			url: `https://goerli.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
		},
		mumbai: {
			url: `https://polygon-mumbai.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
		},
	},
};

