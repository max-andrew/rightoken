require('@nomiclabs/hardhat-ethers')
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
		mainnet: {
			url: `https://mainnet.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l2: "optimism",
			},
		},
		// arbitrum: {
		// 	url: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`,
		// 	accounts: { mnemonic: mnemonic },
		// 	companionNetworks: {
		// 		l1: "mainnet",
		// 	},
		// },
		optimism: {
			url: `https://mainnet.optimism.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
	  },
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l2: "optimisticKovan",
			},
		},
		optimisticKovan: {
			url: `kovan.optimism.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
	  },
		// arbitrumRinkeby: {
		// 	url: `https://arbitrum-rinkeby.infura.io/v3/${infuraApiKey}`,
		// 	accounts: { mnemonic: mnemonic },
		// 	companionNetworks: {
		// 		l1: "rinkeby",
		// 	},
		// },
	},
};

