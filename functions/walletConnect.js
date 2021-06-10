import WalletConnectProvider from "@walletconnect/web3-provider"
import QRCodeModal from "@walletconnect/qrcode-modal"
import { providers } from "ethers"

const provider = new WalletConnectProvider({
	infuraId: "a821166085054d0891f13e00e9a0767e",
})

export const enable = async () => { await provider.enable().catch(e => console.log(e)) }

export const disconnect = () => {
  QRCodeModal.close()
  provider.disconnect()
}

export const providerinfo = () => { console.log(provider) }

//  Wrap with Web3Provider from ethers.js
const web3Provider = new providers.Web3Provider(provider)

export const openQR = () => {
	enable().then(() => { QRCodeModal.open("wc:c56bc944-b4d9-4f7d-a435-472457ef7402@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=4017f12ae2dd7f4b00f31bce80003ba785ba1a9382f7f4219fe8aad4479e0c23") })
}