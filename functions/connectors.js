import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
const infuraApiKey = process.env.INFURA_KEY

const POLLING_INTERVAL = 6000
const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
	4: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
	10: `https://mainnet.optimism.infura.io/v3/${infuraApiKey}`,
	69: "https://kovan.optimism.io/rpc"
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 4, 10, 69] })

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4], 10: RPC_URLS[10], 69: RPC_URLS[69] },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1, 4, 10, 69],
	qrcode: true,
	appName: "Rightoken"
})