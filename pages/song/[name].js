import Head from 'next/head'

import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../../components/Header'
import SongCard from '../../components/SongCard'
import RoundedLinkButton from '../../components/RoundedLinkButton'
import RoundedButton from '../../components/RoundedButton'
import Web3DebugPanel from '../../components/Web3DebugPanel'
import Footer from '../../components/Footer'

import { useWeb3React } from '@web3-react/core'
import Matic from '@maticnetwork/maticjs'

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
		error,
		eth
	} = useWeb3React()

	// get query params for default wallet selection
	const router = useRouter()
	const { name } = router.query
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

	useEffect(() => {
		console.log(account)
		if (account) {
			// Create sdk instance
			const matic = new Matic({
				// set network name
				network: "testnet",
				// set network version
				version: "mumbai",
				// set Matic provider - string or provider instance
				maticProvider: "https://polygon-mumbai.infura.io/v3/a821166085054d0891f13e00e9a0767e",
				// set Mainchain provider - string or provider instance
				parentProvider: "https://goerli.infura.io/v3/a821166085054d0891f13e00e9a0767e",
				// set default options e.g { from }
				parentDefaultOptions: { from: account },
				// set default options
				maticDefaultOptions: { from: account },
			})

			// init matic
			matic.initialize()

			matic.balanceOfERC721(account, "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e", { parent: false })
			.then(balance => {
				console.log("balance", balance)
			})
		}
	}, [account])

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
							<SongCard song="Rigamortus" artist="Kendrick Lamar" />
							{ account && 
								<RoundedButton outerDivClassName="place-self-center" onClick={() => {
									console.log("hello")
								}} text="Secure your share" />
							}
							{ !account && 
								<RoundedLinkButton outerDivClassName="place-self-center" link="/beta" text="Start beta testing" />
							}
						</div>
					</div>
				</main>

				<Web3DebugPanel chainId={chainId} blockNumber={blockNumber} account={account} ethBalance={ethBalance} library={library} account={account} />

				<Footer />
			</div>
		</div>
	)
}
