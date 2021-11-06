import {
	walletconnect, 
	walletlink,
	injected
} from './connectors'

export const connectWallet = (error, walletAppSelected, setActivatingConnector, activate, connector, deactivate) => {
	if (error)
		disconnectWallet(connector, deactivate)

	let walletConnector

	if (walletAppSelected == "metamask") {
		walletConnector = walletconnect
	}
	else if (walletAppSelected == "coinbase") {
		walletConnector = walletlink
	}
	else {
		walletConnector = injected
	}

	setActivatingConnector(walletConnector)
	activate(walletConnector)
}

export const disconnectWallet = (connector, deactivate) => {
	if (connector) {
		try {
			connector.close()
		}
		catch {
			console.log("Injected connector disconnecting")
		}
		finally {
			deactivate()
			connector.walletConnectProvider = undefined
		}
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
		else if (!!window.ethereum) {
			return "injected"
		}
	}
	return ""
}