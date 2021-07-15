import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { URI_AVAILABLE } from "@web3-react/walletconnect-connector"

import { injected } from "../functions/connectors"

export function useWalletAppSelected(connectedWalletApp, walletQuery) {
	if (typeof(walletQuery === "undefined")) {
		console.log("hello")
		const [walletAppSelected, setWalletAppSelected] = useState("coinbase")
		return [walletAppSelected, setWalletAppSelected]
	}

	// track user's wallet provider preference
	const [walletAppSelected, setWalletAppSelected] = useState(walletQuery === "metamask" ? "metamask" : "coinbase")
	// account for existing connectors and query params
	useEffect(() => {
		// check for an existing connector
		if (!!connectedWalletApp) {
			setWalletAppSelected(connectedWalletApp)
		}
		// use query parameter if no connector found
		else if (walletQuery === "metamask") {
		 	setWalletAppSelected("metamask")
		}
	}, [])

	return [walletAppSelected, setWalletAppSelected]
}

export function useActivatingConnector(connector) {
	const [activatingConnector, setActivatingConnector] = useState()

	// handle logic to recognize the connector currently being activated
	useEffect(() => {
		console.log('Identifying connector being activated')
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	return [activatingConnector, setActivatingConnector]
}

export function useEagerConnect() {
	const { activate, active } = useWeb3React()

	const [tried, setTried] = useState(false)

	useEffect(() => {
		injected.isAuthorized().then(isAuthorized => {
			if (isAuthorized) {
				
				activate(injected, undefined, true).catch(() => {
					setTried(true)
				})
			} else {
				setTried(true)
			}
		})
	}, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (!tried && active) {
			setTried(true)
		}
	}, [tried, active])

	return tried
}

export function useInactiveListener(suppress = false) {
	const { active, error, activate } = useWeb3React()

	useEffect(() => {
		const { ethereum } = window
		if (ethereum && ethereum.on && !active && !error && !suppress) {
			const handleChainChanged = chainId => {
				console.log("chainChanged", chainId)
				activate(injected)
			}

			const handleAccountsChanged = accounts => {
				console.log("accountsChanged", accounts)
				if (accounts.length > 0) {
					activate(injected)
				}
			}

			const handleNetworkChanged = networkId => {
				console.log("networkChanged", networkId)
				activate(injected)
			}

			ethereum.on("chainChanged", handleChainChanged)
			ethereum.on("accountsChanged", handleAccountsChanged)
			ethereum.on("networkChanged", handleNetworkChanged)

			return () => {
				if (ethereum.removeListener) {
					ethereum.removeListener("chainChanged", handleChainChanged)
					ethereum.removeListener("accountsChanged", handleAccountsChanged)
					ethereum.removeListener("networkChanged", handleNetworkChanged)
				}
			}
		}

		return () => {}
	}, [active, error, suppress, activate])
}

export function useBlockNumber(library, chainId) {
	const [blockNumber, setBlockNumber] = useState()

	// set up block listener
	useEffect(() => {
		console.log('Getting block number')
		if (library) {
			let stale = false

			library.getBlockNumber()
			.then(blockNumber => {
				if (!stale) {
					setBlockNumber(blockNumber)
				}
			})
			.catch(() => {
				if (!stale) {
					setBlockNumber(null)
				}
			})

			const updateBlockNumber = blockNumber => {
				setBlockNumber(blockNumber)
			}
			library.on("block", updateBlockNumber)

			return () => {
				library.removeListener("block", updateBlockNumber)
				stale = true
				setBlockNumber(undefined)
			}
		}
	}, [library, chainId])

	return blockNumber
}

export function useEthBalance(library, account, chainId) {
	const [ethBalance, setEthBalance] = useState()

	// fetch eth balance of the connected account
	useEffect(() => {
		console.log('Getting Eth balance')
		if (library && account) {
			let stale = false

			library
				.getBalance(account)
				.then(balance => {
					if (!stale) {
						setEthBalance(balance)
					}
				})
				.catch(() => {
					if (!stale) {
						setEthBalance(null)
					}
				})

			return () => {
				stale = true
				setEthBalance(undefined)
			}
		}
	}, [library, account, chainId])

	return ethBalance
}

export function useWalletConnectURI(walletconnect) {
	// log the walletconnect URI
	useEffect(() => {
		console.log('Getting URI')
		const logURI = uri => {
			console.log("WalletConnect URI", uri)
		}
		walletconnect.on(URI_AVAILABLE, logURI)

		return () => {
			walletconnect.off(URI_AVAILABLE, logURI)
		}
	}, [])
}