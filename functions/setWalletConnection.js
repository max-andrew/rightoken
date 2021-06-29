import {
	walletconnect, 
	walletlink 
} from './connectors'

export const connectWallet = (error, walletAppSelected, setActivatingConnector, activate) => {
	if (error)
		disconnectWallet()

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