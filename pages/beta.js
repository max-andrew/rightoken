import Head from 'next/head'

import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedLinkButton from '../components/RoundedLinkButton'
import RoundedButton from '../components/RoundedButton'
import Web3DebugPanel from '../components/Web3DebugPanel'
import Footer from '../components/Footer'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'

import { 
	injected,
	walletconnect
} from '../functions/connectors'
import {
	useWalletAppSelected,
	useActivatingConnector,
	useEagerConnect,
	useInactiveListener,
	useBlockNumber,
	useEthBalance
} from '../hooks/web3Hooks'
import { connectWallet, disconnectWallet, getConnectedWalletApp } from '../functions/setWalletConnection'
import { getWeb3ErrorMessage } from '../functions/getWeb3ErrorMessage'

export default function Beta(props) {
	// get values from context
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error
	} = useWeb3React()

	const acceptableMainNetworks = [1, 10]
	const acceptableTestNetworks = [5, 42, 69]
	const optimisticNetworks = [42, 10, 69]
	const acceptableNetworks = acceptableMainNetworks.concat(acceptableTestNetworks)

	const [cryptoPro, setCryptoPro] = useState(false)

	const instructionSet = {
		download: {
			coinbase: <>The Coinbase Wallet app is how you store your rightokens independently of the Rightoken organization. This is not the same as the Coinbase app for buying and selling crypto. No Coinbase account is required. <br /> <br /> You can optionally choose to use the MetaMask browser extension.</>,
			metamask: <>The MetaMask app is how you store your rightokens independently of the Rightoken organization. You can optionally choose to use the MetaMask browser extension.</>,
		},
		connect: {
			unconnected: {
				pro: <>Rightoken currently supports the Coinbase Wallet and MetaMask mobile wallets. Hit Connect and scan the QR code inside the wallet app.</>,
				noob: <>Once you finish creating a wallet, you&apos;re ready to link it to Rightoken. Hit Connect and scan the QR code inside the wallet app.</>
			},
			connected: <>Your wallet is connected! Next you have to configure it.</>,
		},
		configure: {
			unconfigured: {
				coinbase: {
					pro: <>
						Rightoken is built on Optimistic Ethereum. Select Optimism as your Default Network under Connections in the settings.
					</>,
					noob: <>
						Rightoken uses a network called Optimism built on top of Ethereum to give artists and investors the option to keep transactions quick and fees low. <br /> <br /> 
						To change to this network, open Coinbase Wallet and select the settings cog on the right of the toolbar at the bottom. Next, find the Default Network option in the Connections section. 
						Finally, select Optimism under Eth Mainnets and return to your wallet in the left of the toolbar.
					</>
				},
				metamask: {
					pro: <>
						Rightoken is currently in test mode. Select Kovan as your active network.
					</>,
					noob: <>
						Rightoken uses a network called Kovan to collect user feedback before launching on the mainnet. Change to this network by selecting Wallet from the center of the main toolbar and selecting Kovan Test Network from the Networks popup.
					</>
				}
			},
			configured: <>
				Nice work! Your wallet successfully linked to Kovan. Make sure to stay on this network when using Rightoken.
			</>
		},
		done: <>
			You&apos;re ready to mint rightokens and build your portfolio!
		</>
	}

	// get query params for default wallet selection
	const router = useRouter()
	// track user's wallet preference
	const [walletAppSelected, setWalletAppSelected] = useState("metamask")

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = useActivatingConnector(connector)

	// link wallet if it is already connected (but page has refreshed)
	useEffect(() => {
		if (!account && getConnectedWalletApp() === walletAppSelected)
			connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)
	})

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()
	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

	// get web3 data
	const blockNumber = useBlockNumber(library, chainId)
	const ethBalance = useEthBalance(library, account, chainId)

	const browseMarketplaceLinkButton = <RoundedLinkButton link="/marketplace" text="Browse now" customBG className="bg-green-500 hover:bg-green-600" textClassName="text-sm font-bold hover:bg-green-600" />
	const mintLinkButton = <RoundedLinkButton link="/artist" text="Mint now" customBG className="bg-green-300 hover:bg-green-400" textClassName="text-sm font-bold" />

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />

				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							{ (!!account && acceptableNetworks.includes(chainId))  ? "Welcome to the beta test! 🎉" : "Join the beta test" }
						</p>
						<p className="mt-6 max-w-2xl text-xl text-gray-500 mx-auto">
							<a className="underline" href="/community#widget">Please reach out to our community with any questions here.</a> Your feedback makes us better and we love to hear from you!
						</p>
					</div>

					<div className="mt-16 max-w-sm md:max-w-none self-center justify-items-center text-center md:text-left m-auto self-center">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 md:gap-x-8 gap-y-8 md:gap-y-16">
							<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-600" } `}>
								0.
							</p>
							<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
								<p className="text-2xl font-semibold">
									{ !cryptoPro ? "New to crypto?" : "Crypto pro mode ⚡️" }
								</p>
								<p className="text-sm font-mono">
									{ !cryptoPro &&
										"More forward to the next step if you're a crypto beginner and we'll provide additional instructions to get you started from scratch. Unselect the box if you're a crypto pro though and we'll streamline this tutorial."
									}
								</p>
							</div>
							<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start mb-6 md:mb-0 m-auto md:m-0 space-y-3">
								<div>
									<input
										className="my-4"
										type="checkbox"
										defaultChecked={!cryptoPro}
										onChange={() => setCryptoPro(!cryptoPro)} />
									<p className="text-sm font-mono">Simple instructions</p>
								</div>
							</div>

							<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ account && "text-green-600" } `}>
								1.
							</p>
							<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
								<p className="text-2xl font-semibold">
									{ !cryptoPro ? "Download your wallet" : "Connect your wallet" }
								</p>
								<p className="text-sm font-mono">
									{ !cryptoPro ? 
										instructionSet.download[walletAppSelected] 
										: !account ?
											instructionSet.connect.unconnected.pro
											: instructionSet.connect.connected }
								</p>
							</div>
							<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start mb-6 md:mb-0 m-auto md:m-0 space-y-3">
								{ !cryptoPro ? 
									!account &&
										<>
											<RoundedLinkButton link={walletAppSelected === "coinbase" ? "https://apps.apple.com/us/app/coinbase-wallet/id1278383455" : "https://apps.apple.com/us/app/metamask/id1438144202" } textClassName="text-sm font-bold" text="iOS" />
											<RoundedLinkButton link={walletAppSelected === "coinbase" ? "https://play.google.com/store/apps/details?id=org.toshi" : "https://play.google.com/store/apps/details?id=io.metamask" } className="bg-opacity-80 hover:bg-opacity-80" textClassName="text-sm font-bold" text="Android" />
											<br />
										</>
									: !account ?
										<RoundedButton onClick={() => connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)} textClassName="text-sm font-bold" text="Connect wallet" />
										: <RoundedButton onClick={() => disconnectWallet(connector, deactivate)} customBG className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
									
								}
							</div>

							{ (!cryptoPro || account) &&
								<>
									<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ ((!cryptoPro && account) || (cryptoPro && optimisticNetworks.includes(chainId)))  && "text-green-600" } `}>
										2.
									</p>
									<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
										<p className="text-2xl font-semibold">
											{ !cryptoPro ? "Connect your wallet" : "Configure your wallet" }
										</p>
										{ !error ?
											<p className="text-sm font-mono">
												{ 
													!cryptoPro ?
														!account ?
															instructionSet.connect.unconnected.noob
															: instructionSet.connect.connected
														: optimisticNetworks.includes(chainId) ?
															instructionSet.configure.configured
															: instructionSet.configure.unconfigured[walletAppSelected].pro

												}
											</p>
											: <p className="text-sm font-mono text-red-800">
												{ getWeb3ErrorMessage(error) }
											</p>
										}
									</div>
									<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start mb-6 md:mb-0 m-auto md:m-0 space-y-3">
										{ 
											!cryptoPro ?
												!account ?
													<RoundedButton onClick={() => connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)} textClassName="text-sm font-bold" text="Connect wallet" />
													: <RoundedButton onClick={() => disconnectWallet(connector, deactivate)} customBG className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
												: ""
										}
									</div>
								</>
							}

							{ account && (!cryptoPro || (cryptoPro && optimisticNetworks.includes(chainId))) && 
								<>
									<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ optimisticNetworks.includes(chainId) && "text-green-600" } `}>
										3.
									</p>
									<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
										<p className="text-2xl font-semibold">
											{ !cryptoPro ? "Configure your wallet" : "All set! 🚀" }
										</p>
										<p className="text-sm font-mono">
											{ 
												!cryptoPro ?
													!optimisticNetworks.includes(chainId) ?
														instructionSet.configure.unconfigured[walletAppSelected].noob
														: instructionSet.configure.configured
													: instructionSet.done
											}
										</p>
									</div>
									{
										cryptoPro ?
											<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start mb-6 md:mb-0 m-auto md:m-0 space-y-4">
												{ browseMarketplaceLinkButton }
												{ mintLinkButton }
											</div>
											: <div />
									}
								</>
							}

							{ account && optimisticNetworks.includes(chainId) && !cryptoPro &&
								<>
									<p className={`text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end ${ optimisticNetworks.includes(chainId) && "text-green-600" } `}>
										4.
									</p>
									<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
										<p className="text-2xl font-semibold">
											All set! 🚀
										</p>
										<p className="text-sm font-mono">
											{ instructionSet.done }
										</p>
									</div>
									<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start mb-6 md:mb-0 m-auto md:m-0 space-y-4">
										{ mintLinkButton }
									</div>
								</>
							}
						</div>
					</div>
				</div>
			</main>
			
			<Footer />
		</>
	)
}
