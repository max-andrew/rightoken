import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
const infuraApiKey = process.env.INFURA_KEY

const POLLING_INTERVAL = 6000
const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
	4: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
	10: `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`,
	69: `https://optimism-kovan.infura.io/v3/${infuraApiKey}`,
	420: `https://optimism-goerli.infura.io/v3/${infuraApiKey}`,
	42161: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`,
	421611: `https://arbitrum-rinkeby.infura.io/v3/${infuraApiKey}`
}

export const PUBLIC_RPC_URLS = {
	10: `https://mainnet.optimism.io`,
	69: `https://kovan.optimism.io`,
	420: `https://goerli.optimism.io`
}

export const injected = new InjectedConnector({ supportedChainIds: Object.keys(RPC_URLS).map(x => parseInt(x)) })

export const walletconnect = new WalletConnectConnector({
	rpc: RPC_URLS,
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
})