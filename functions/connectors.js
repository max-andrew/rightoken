import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
const infuraApiKey = process.env.INFURA_KEY

const POLLING_INTERVAL = 6000
const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
	4: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
	10: `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`,
	42: `https://kovan.infura.io/v3/${infuraApiKey}`,
	69: `https://optimism-kovan.infura.io/v3/{infuraApiKey}`,
	42161: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`,
	421611: "https://rinkeby.arbitrum.io/rpc"
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 4, 10, 42, 69, 42161, 421611] })

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4], 42161: RPC_URLS[42161], 421611: RPC_URLS[421611] },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1, 4, 42161, 421611],
	qrcode: true,
	appName: "Rightoken"
})