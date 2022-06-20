import {
	walletconnect,
	injected
} from './connectors'

export const connectWallet = (error, walletAppSelected, setActivatingConnector, activate, connector, deactivate) => {
	if (error)
		disconnectWallet(connector, deactivate)

	let walletConnector

	if (walletAppSelected == "metamask") {
		walletConnector = walletconnect
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
		else if (!!window.ethereum) {
			return "injected"
		}
	}
	return ""
}