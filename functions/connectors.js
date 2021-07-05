import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"

const POLLING_INTERVAL = 6000
const RPC_URLS = {
	1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
	3: "https://ropsten.infura.io/v3/a821166085054d0891f13e00e9a0767e",
	4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
	5: "https://goerli.infura.io/v3/a821166085054d0891f13e00e9a0767e",
	137: "https://rpc-mainnet.maticvigil.com/v1/ddbb9e650437acc2b4638d408726a305bf9cc9c6",
	80001: "https://rpc-mumbai.maticvigil.com/v1/ddbb9e650437acc2b4638d408726a305bf9cc9c6"
}

export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 42, 137, 80001]
})

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1], 3: RPC_URLS[3], 4: RPC_URLS[4], 5: RPC_URLS[5], 137: RPC_URLS[137], 80001: RPC_URLS[80001] },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1, 3, 4, 5, 137, 80001],
	qrcode: true,
	appName: "Rightoken"
})