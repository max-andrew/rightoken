import Head from 'next/head'

import { Fragment, useEffect, useState, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

import { getWeb3ErrorMessage } from '../functions/getWeb3ErrorMessage.js'
import { walletconnect } from '../functions/connectors'
import { useEagerConnect, useInactiveListener } from '../hooks/web3Hooks'

import Header from '../components/Header'
import RoundedLinkButton from '../components/RoundedLinkButton'
import RoundedButton from '../components/RoundedButton'
import Footer from '../components/Footer'

export default function Beta(props) {
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

	const [refresh, setRefresh] = useState()
	const [activatingConnector, setActivatingConnector] = useState()
	const [blockNumber, setBlockNumber] = useState()
	const [ethBalance, setEthBalance] = useState()

	// handle logic to recognize the connector currently being activated
	useEffect(() => {
		console.log('running')
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

	// set up block listener
	useEffect(() => {
		console.log('running')
		if (library) {
			let stale = false

			console.log('fetching block number!!')
			library
				.getBlockNumber()
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
		console.log('running')
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
		console.log('running')
		const logURI = uri => {
			console.log("WalletConnect URI", uri)
		}
		walletconnect.on(URI_AVAILABLE, logURI)

		return () => {
			walletconnect.off(URI_AVAILABLE, logURI)
		}
	})

	// check if wallet is already connected
	useEffect(() => {
		if (!account) {
			setActivatingConnector(walletconnect)
			activate(walletconnect)
		}
	})

	const connectWallet = () => {
		if (account)
			disconnectWallet()

		setActivatingConnector(walletconnect)
		activate(walletconnect)
	}

	const disconnectWallet = () => {
		// setActivatingConnector("")
		connector.close()
		deactivate()

		connector.walletConnectProvider = undefined
	}

	return (
		<div>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />

				<div className="py-12 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Join the beta test
							</p>
					</div>

					<div className="mt-16 max-w-md md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-x-10 md:gap-x-8 gap-y-6 md:gap-y-16 self-center justify-items-center text-center md:text-left m-auto">
						<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-700" } `}>
							1.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Download crypto wallet
							</p>
							<p className="text-sm font-mono">
								The MetaMask app is how you store your rightokens independently of the organization. Other wallets might work, but aren't yet fully supported.
							</p>
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-4">
							<RoundedLinkButton link="https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=930587986804252278" textClassName="text-sm font-bold" text="For iOS" />
							<RoundedLinkButton link="https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=930682544992985021" className="bg-purple-400 hover:bg-purple-500" textClassName="text-sm font-bold" text="For Android" />
						</div>

						<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-700" } `}>
							2.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Connect your wallet
							</p>
							{!error && (
								<p className="text-sm font-mono">
									Hit Connect and use your phone camera to scan the QR code.
								</p>
							)}
							{!!error && (
								<p className="text-sm font-mono text-red-800">
									{ getWeb3ErrorMessage(error) }
								</p>
							)}
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
							{ !account && (
								<RoundedButton onClick={() => oldConnectWallet()} textClassName="text-sm font-bold" text="Old connect" />
							)}
							{ !account && (
								<RoundedButton onClick={() => connectWallet()} textClassName="text-sm font-bold" text="Connect wallet" />
							)}
							{ account && (
								<RoundedButton onClick={ () => disconnectWallet() } className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
							)}
						</div>

						<p className="text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
							3.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Start investing
							</p>
							<p className="text-sm font-mono">
								Support growing artists and build your portfolio. Browse rightokens on the market now at the marketplace.
							</p>
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
							<RoundedLinkButton link="/marketplace" text="Invest now" className="bg-green-500 hover:bg-green-600" textClassName="text-sm font-bold" />
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
				<div
					style={{
						display: "grid",
						gridGap: "1rem",
						gridTemplateColumns: "fit-content",
						maxWidth: "20rem",
						margin: "auto"
					}}
				>
					{!!(library && account) && (
						<button
							style={{
								height: "3rem",
								borderRadius: "1rem",
								cursor: "pointer"
							}}
							onClick={() => {
								library
									.getSigner(account)
									.signMessage("👋")
									.then(signature => {
										window.alert(`Success!\n\n${signature}`);
									})
									.catch(error => {
										window.alert(
											"Failure!" +
												(error && error.message ? `\n\n${error.message}` : "")
										);
									});
							}}
						>
							Sign Message
						</button>
					)}
					{!!(connector === /*network && */ chainId) && (
						<button
							style={{
								height: "3rem",
								borderRadius: "1rem",
								cursor: "pointer"
							}}
							onClick={() => {
								console.log(connector)
								connector.changeChainId(chainId === 1 ? 4 : 1);
							}}
						>
							Switch Networks
						</button>
					)}
				</div>
			</div>

			{/*<Footer />*/}
		</div>
	)
}
