const OPTIMISM_CHAIN_ID = 10
const OPTIMISM_KOVAN_CHAIN_ID = 69

const ARBITRUM_CHAIN_ID = 42161
const ARBITRUM_RINKEBY_CHAIN_ID = 421611

const OPTIMISM_DAI_ADDRESS = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
const OPTIMISM_KOVAN_DAI_ADDRESS = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"

const ARBITRUM_DAI_ADDRESS = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
const ARBITRUM_RINKEBY_DAI_ADDRESS = "0x2f3C1B6A51A469051A22986aA0dDF98466cc8D3c"

export const optimismNetworkBundle = {
	mainnet_name: "Optimism",
	testnet_name: "Optimistic Kovan",
	mainnet_id: OPTIMISM_CHAIN_ID,
	testnet_id: OPTIMISM_KOVAN_CHAIN_ID,
	stablecoin_mainnet_address: OPTIMISM_DAI_ADDRESS,
	stablecoin_testnet_address: OPTIMISM_KOVAN_DAI_ADDRESS,
	mainnet_rpc_url: ["https://mainnet.optimism.io"],
	testnet_rpc_url: ["https://kovan.optimism.io"],
	mainnet_block_explorer_url: ["https://optimistic.etherscan.io"],
	testnet_block_explorer_url: ["https://kovan-optimistic.etherscan.io"]
}

export const arbitrumNetworkBundle = {
	mainnet_name: "Arbitrum",
	testnet_name: "Arbitrum Rinkeby",
	mainnet_id: ARBITRUM_CHAIN_ID,
	testnet_id: ARBITRUM_RINKEBY_CHAIN_ID,
	stablecoin_mainnet_address: ARBITRUM_DAI_ADDRESS,
	stablecoin_testnet_address: ARBITRUM_RINKEBY_DAI_ADDRESS,
	mainnet_rpc_url: ["https://arb1.arbitrum.io/rpc"],
	testnet_rpc_url: ["https://rinkeby.arbitrum.io/rpc"],
	mainnet_block_explorer_url: ["https://arbiscan.io"],
	testnet_block_explorer_url: ["https://testnet.arbiscan.io/#/"]
}
