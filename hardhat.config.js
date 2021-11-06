import "@nomiclabs/hardhat-ethers"
const { infuraApiKey, mnemonic } = require('./secrets.json')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		compilers: [
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
		kovan: {
			url: `https://kovan.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l2: "kovanOptimism",
			},
		},
		kovanOptimism: {
			url: `https://optimism-kovan.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l1: "kovan",
			},
		}
	},
};

