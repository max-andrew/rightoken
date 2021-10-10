import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
const { infuraApiKey } = require('../secrets.json')

const POLLING_INTERVAL = 6000
const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
	5: `https://goerli.infura.io/v3/${infuraApiKey}`,
	10: `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`,
	42: `https://kovan.infura.io/v3/${infuraApiKey}`,
	69: `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`
}

export const injected = new InjectedConnector({
	supportedChainIds: [1, 5, 10, 42, 69]
})

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1], 5: RPC_URLS[5], 10: RPC_URLS[10], 42: RPC_URLS[42], 69: RPC_URLS[69] },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1, 5, 10, 42, 69],
	qrcode: true,
	appName: "Rightoken"
})