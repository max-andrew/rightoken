import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

// Create a connector
const connector = new WalletConnect({
	bridge: "https://bridge.walletconnect.org", // Required
	qrcodeModal: QRCodeModal,
})

export const uri = connector.uri

// Check if connection is already established
if (!connector.connected) {
	// create new session
	connector.createSession()
}

export const openQR = () => {
	QRCodeModal.open(uri)
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
	if (error) {
	 throw error
	}

	// Get provided accounts and chainId
	const { accounts, chainId } = payload.params[0]
})

connector.on("session_update", (error, payload) => {
	if (error) {
	 throw error
	}

	// Get updated accounts and chainId
	const { accounts, chainId } = payload.params[0]
})

export const disconnect = () => {
	connector.on("disconnect", (error, payload) => {
		if (error) {
		 throw error
		}

		// Delete connector
	})
}