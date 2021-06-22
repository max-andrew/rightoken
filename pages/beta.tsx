import Head from 'next/head'

import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedLinkButton from '../components/RoundedLinkButton'
import RoundedButton from '../components/RoundedButton'
import Footer from '../components/Footer'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

import { getWeb3ErrorMessage } from '../functions/getWeb3ErrorMessage'
import { injected, network, walletconnect, walletlink } from '../functions/connectors'
import { useEagerConnect, useInactiveListener } from '../hooks/web3Hooks'

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

	// get query params for default wallet selection
	const router = useRouter()

	const [walletAppSelected, setWalletAppSelected] = useState( router.query.wallet === "metamask" ? "metamask" : "coinbase" )
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

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

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

	const connectWallet = walletAppSelected => {
		if (error)
			disconnectWallet()

		const walletConnector = walletAppSelected === "coinbase" ? walletlink : walletconnect

		setActivatingConnector(walletConnector)
		activate(walletConnector)
	}

	const disconnectWallet = () => {
		if (connector) {
			connector.close()
			deactivate()
			connector.walletConnectProvider = undefined
		}
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
								{ (!!account && chainId === 137)  ? "Welcome to the beta test! 🎉" : "Join the beta test" }
							</p>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								<a className="underline" href="/community#widget">Please reach out to our community with any questions here.</a> Your feedback makes us better and we love to hear from you!
							</p>
					</div>

					<div className="mt-16 max-w-md md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-x-10 md:gap-x-8 gap-y-6 md:gap-y-16 self-center justify-items-center text-center md:text-left m-auto">
						<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-600" } `}>
							1.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Download your wallet
							</p>
							{ walletAppSelected === "coinbase" &&
								<p className="text-sm font-mono">
									The Coinbase Wallet app is how you store your rightokens independently of the Rightoken organization. This is not the same as the Coinbase app for buying and selling crypto. No Coinbase account is required. <br /> <br /> You can optionally choose to use the MetaMask wallet instead of Coinbase Wallet, though this will require slightly more setup.
								</p>
							}
							{ walletAppSelected === "metamask" &&
								<p className="text-sm font-mono">
									The MetaMask app is how you store your rightokens independently of the Rightoken organization. You can optionally choose to use Coinbase Wallet instead of MetaMask.
								</p>
							}
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-4">
							<RoundedLinkButton link={walletAppSelected === "coinbase" ? "https://apps.apple.com/us/app/coinbase-wallet/id1278383455" : "https://apps.apple.com/us/app/metamask/id1438144202" } textClassName="text-sm font-bold" text="For iOS" />
							<RoundedLinkButton link={walletAppSelected === "coinbase" ? "https://play.google.com/store/apps/details?id=org.toshi" : "https://play.google.com/store/apps/details?id=io.metamask" } className="bg-purple-400 hover:bg-purple-500" textClassName="text-sm font-bold" text="For Android" />
							<br />
							<RoundedButton onClick={ () => setWalletAppSelected(walletAppSelected === "coinbase" ? "metamask" : "coinbase") } className="bg-gray-200 hover:bg-gray-300 font-mono" textClassName="text-xs font-bold text-gray-400" text={"Use " + (walletAppSelected === "coinbase" ? "MetaMask" : "Coinbase")} />
						</div>

						<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-600" } `}>
							2.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Connect your wallet
							</p>
							{ !error &&
								<p className="text-sm font-mono">
									{ (!account) ? "Once you finish creating a wallet, you're ready to link it to Rightoken. Hit Connect and use your phone camera to scan the QR code."
										: "Great! You connected your wallet to Rightoken, but you still need to change one last setting."
									}
								</p>
							}
							{ !!error &&
								<p className="text-sm font-mono text-red-800">
									{ getWeb3ErrorMessage(error) }
								</p>
							}
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
							{ !account &&
								<RoundedButton onClick={() => connectWallet(walletAppSelected)} textClassName="text-sm font-bold" text="Connect wallet" />
							}
							{ account &&
								<RoundedButton onClick={ () => disconnectWallet() } className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
							}
						</div>

						{ account &&
							<>
								<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ chainId === 137 && "text-green-600" } `}>
									3.
								</p>
								<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
									<p className="text-2xl font-semibold">
										Configure your wallet
									</p>
									{ chainId !== 137 && walletAppSelected === "coinbase" &&
										<p className="text-sm font-mono">
											Rightoken uses a network called Polygon built on top of Ethereum to keep transactions quick and fees low for artists and investors. <br /> <br /> To change to this network, open Coinbase Wallet and select the settings cog on the bottom right toolbar. Next, scroll down the settings page until you find the Active Network option in the Advanced section. Finally, select Polygon Mainnet and return to your wallet in the bottom left of the toolbar. Once completed, you should see the 4th and final step.
										</p>
									}
									{ chainId !== 137 && walletAppSelected === "metamask" &&
										<p className="text-sm font-mono">
											Rightoken uses a network called Polygon built on top of Ethereum to keep transactions quick and fees low for artists and investors. <br /> <br /> To change to this network, open MetaMask and hamburger menu icon in the top left corner. Select Settings in the popover. Then, select Networks. Choose Add Network and enter these values for the following fields: <br /> <br /> Network Name: <br /> Matic Mainnet <br /> <br /> RPC URL: <br /> https://rpc-mainnet.maticvigil.com/ <br /> <br /> Chain ID: <br /> 137 <br /> <br /> Symbol: <br /> MATIC <br /> <br /> Block Explorer URL: <br /> https://polygonscan.com/ <br /> <br /> Finally, click Add. MetaMask should automatically redirect to your wallet page with the new network selected, but you can confirm or change this network by selecting Wallet from the center of the main toolbar, and scrolling down and selecting Matic Mainnet from the Networks popup. Once completed, you should see the 4th and final step.
										</p>
									}
									{ chainId === 137 &&
										<p className="text-sm font-mono">
											Nice work! Your wallet successfully linked to the Polygon network. Make sure to stay on this network when using Rightoken.
										</p>
									}
								</div>
								<div />
							</>
						}

						{ account && chainId === 137 &&
							<>
								<p className="text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
									4.
								</p>
								<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
									<p className="text-2xl font-semibold">
										All set! 🚀
									</p>
									<p className="text-sm font-mono">
										You're ready to support growing artists and build your portfolio! Browse rightokens on the market now at the marketplace. Your rightokens will be available to view or trade in your wallet.
									</p>
								</div>
								<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-4">
									<RoundedLinkButton link="/marketplace" text="Invest now" className="bg-green-500 hover:bg-green-600" textClassName="text-sm font-bold" />
									<RoundedLinkButton link="/artist" text="I'm an artist" className="bg-green-300 hover:bg-green-400" textClassName="text-sm font-bold" />
								</div>
							</>
						}
					</div>
				</div>

			</main>
			<br />
			<br />
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
				<br />
				{!!(library && account) && (
					<RoundedButton 
						onClick={() => {
							library
							.getSigner(account)
							.signMessage("👋")
							.then(signature => {
								window.alert(`Success!\n\n${signature}`)
							})
							.catch(error => {
								window.alert(
									"Failure!" +
										(error && error.message ? `\n\n${error.message}` : "")
								)
							})
						}}
						textClassName="text-sm font-bold" 
						text="Sign Message"
						className="w-1/4 m-auto"
					/>
				)}
			</div>

			{/*<Footer />*/}
		</div>
	)
}
