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
				l2: "arbitrum",
			},
		},
		arbitrum: {
			url: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l1: "mainnet",
			},
		},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l2: "arbitrumRinkeby",
			},
		},
		arbitrumRinkeby: {
			url: `https://arbitrum-rinkeby.infura.io/v3/${infuraApiKey}`,
			accounts: { mnemonic: mnemonic },
			companionNetworks: {
				l1: "rinkeby",
			},
		},
	},
};

