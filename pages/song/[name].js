import Head from 'next/head'

import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../../components/Header'
import SongCard from '../../components/SongCard'
import RoundedLinkButton from '../../components/RoundedLinkButton'
import RoundedButton from '../../components/RoundedButton'
import Footer from '../../components/Footer'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

import { getWeb3ErrorMessage } from '../../functions/getWeb3ErrorMessage'
import { walletconnect } from '../../functions/connectors'

export default function Song(props) {
	const context = useWeb3React()
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error
	} = context

	const [activatingConnector, setActivatingConnector] = useState()
	const [blockNumber, setBlockNumber] = useState()
	const [ethBalance, setEthBalance] = useState()

	// handle logic to recognize the connector currently being activated
	useEffect(() => {
		console.log('Identifying connector being activated')
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

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

	// link wallet if it is already connected
	useEffect(() => {
		if ((typeof(window) !== undefined) && !!window.localStorage.walletconnect && !account)
			connectWallet()
	}, [])

	const connectWallet = () => {
		setActivatingConnector(walletconnect)
		activate(walletconnect)
	}

	const router = useRouter()
	const { name } = router.query

	return (
		<div>
			<div>

				<Head>
					<title>Rightoken</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<Header />

					<div className="py-12 bg-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="lg:text-center">
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Invest in { name }
								</p>
							</div>
						</div>
						<div className="min-w-xl mt-12 flex flex-row justify-center space-x-12">
							<SongCard />
							<RoundedLinkButton link="/beta" text="Go to beta" className="place-self-center" />
							<div>
								<RoundedButton onClick={() => connectWallet()} text="Connect wallet" />
							</div>
						</div>
					</div>

				</main>

				<div style={{ padding: "1rem" }}>
					<h3
						style={{
							display: "grid",
							gridGap: "1rem",
							gridTemplateColumns: "1fr min-content 1fr",
							maxWidth: "20rem",
							lineHeight: "2rem",
							margin: "auto"
						}}
					>
						<span>Chain Id</span>
						<span role="img" aria-label="chain">
							⛓
						</span>
						<span>{chainId === undefined ? "..." : chainId}</span>

						<span>Block Number</span>
						<span role="img" aria-label="numbers">
							🔢
						</span>
						<span>
							{blockNumber === undefined
								? "..."
								: blockNumber === null
								? "Error"
								: blockNumber.toLocaleString()}
						</span>

						<span>Account</span>
						<span role="img" aria-label="robot">
							🤖
						</span>
						<span>
							{account === undefined
								? "..."
								: account === null
								? "None"
								: `${account.substring(0, 6)}...${account.substring(
										account.length - 4
									)}`}
						</span>

						<span>Balance</span>
						<span role="img" aria-label="gold">
							💰
						</span>
						<span>
							{ethBalance === undefined
								? "..."
								: ethBalance === null
								? "Error"
								: `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
						</span>
					</h3>
				</div>

				<Footer />
			</div>
		</div>
	)
}
