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
import { formatEther } from '@ethersproject/units'

import { 
	injected,
	walletconnect
} from '../../functions/connectors'
import {
	useWalletAppSelected,
	useActivatingConnector,
	useEagerConnect,
	useInactiveListener,
	useBlockNumber,
	useEthBalance
} from '../../hooks/web3Hooks'
import { connectWallet, disconnectWallet, getConnectedWalletApp } from '../../functions/setWalletConnection'

export default function Song(props) {
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

	// get query params for default wallet selection
	const router = useRouter()
	// track user's wallet provider preference
	const [walletAppSelected, setWalletAppSelected] = useWalletAppSelected(getConnectedWalletApp(), router.query.wallet)

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
						{ account && 
							<div className="min-w-xl mt-12 flex flex-row justify-center space-x-12">
								<SongCard />
								<RoundedButton onClick={() => connectWallet()} text="Invest now" />
							</div>
						}
						{ !account && 
							<div className="min-w-xl mt-12 flex flex-row justify-center space-x-12">
								<SongCard />
								<RoundedLinkButton link="/beta" text="Start beta testing" className="place-self-center" />
							</div>
						}
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
											window.alert(`Success!\n\n${signature}`)
										})
										.catch(error => {
											window.alert(
												"Failure!" +
													(error && error.message ? `\n\n${error.message}` : "")
											)
										})
								}}
							>
								Sign Message
							</button>
						)}
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
