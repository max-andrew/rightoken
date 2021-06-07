// TypeScript
import WalletLink from 'walletlink'
import Web3 from 'web3'

const APP_NAME = 'Rightoken'
const APP_LOGO_URL = '/rightoken-logo.png'
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/a821166085054d0891f13e00e9a0767e'
const CHAIN_ID = 1

export const walletLink = (typeof window !== 'undefined') && new WalletLink({
	appName: APP_NAME,
	appLogoUrl: APP_LOGO_URL,
	darkMode: false
})

// Initialize a Web3 Provider object
export const ethereum = (typeof window !== 'undefined') && walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)

// Initialize a Web3 object
export const web3 = new Web3(ethereum as any)

export const linkWallet = () => {
	// Use eth_RequestAccounts
	ethereum.send('eth_requestAccounts').then((accounts: string[]) => {
		console.log(`User's address is ${accounts[0]}`)

		// Optionally, have the default account set for web3.js
		web3.eth.defaultAccount = accounts[0]
	}).catch(() => {
		console.log("Promise rejected")
	})
}

export const unlinkWallet = () => {
	walletLink.disconnect()
}

export const test = () => {
	web3.eth.getBalance("0xfef19d3bb4575f69bff2b74d20d9155e67ebe777")
	.then(console.log)
}