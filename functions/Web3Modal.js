import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: "a821166085054d0891f13e00e9a0767e" // required
		}
	}
}

export const web3Modal = (typeof window !== 'undefined') && new Web3Modal({
	network: "mainnet", // optional
	cacheProvider: true, // optional
	providerOptions // required
})

export const provider = async () => await web3Modal.connect()

export const web3 = new Web3(provider)

// const accounts = await web3.eth.getAccounts()