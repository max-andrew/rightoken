import {
	walletconnect, 
	walletlink 
} from './connectors'

export const connectWallet = (error, walletAppSelected, setActivatingConnector, activate, connector, deactivate) => {
	if (error)
		disconnectWallet(connector, deactivate)

	const walletConnector = walletAppSelected === "coinbase" ? walletlink : walletconnect

	setActivatingConnector(walletConnector)
	activate(walletConnector)
}

export const disconnectWallet = (connector, deactivate) => {
	if (connector) {
		connector.close()
		deactivate()
		connector.walletConnectProvider = undefined
	}
}

export const getConnectedWalletApp = () => {
	if (typeof(window) !== "undefined") {
		if (!!window.localStorage.walletconnect) {
			return "metamask"
		}
		else if (!!window.localStorage["-walletlink:https://www.walletlink.org:Addresses"]) {
			return "coinbase"
		}
		else {
			return ""
		}
	}
}