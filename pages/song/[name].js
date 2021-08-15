import Head from 'next/head'

import { Fragment, useEffect, useState, useMemo } from 'react'
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

import songLibrary from '../../data/songLibrary'

import { AuctionHouse, ManageAuction } from '@zoralabs/zdk'
import {useZNFT, useNFTMetadata, MediaFetchAgent, Networks} from '@zoralabs/nft-hooks'

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

	// get balance of rightoken
	const [rightokenBalance, setRightokenBalance] = useState(0)

/*
	// get query params for default wallet selection
	const router = useRouter()
	const { name } = router.query

	// redirect user if song does not exist
	if ((typeof(window) !== "undefined") && (typeof(songLibrary[name]) === "undefined")) {
		window.location.replace("../marketplace")
	}
*/

	const [walletAppSelected, setWalletAppSelected] = useState(getConnectedWalletApp())
	const [activatingConnector, setActivatingConnector] = useActivatingConnector(connector)

	// link wallet if it is already connected (but page has refreshed)
	useEffect(() => {
		if (!account && getConnectedWalletApp() === walletAppSelected)
			connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)
	})

/*
	useEffect(async () => {
		if (chainId) {
			const auctionHouse = new AuctionHouse(library.getSigner(), chainId)

			// 2. Create an Auction
			const createAuctionTx = await auctionHouse.createAuction(18, 1000000, .001, "0x000", curatorFeePercentage, auctionCurrency)

			// 3. Await confirmation from the Ethereum Network and receive a receipt
			const receipt = await createAuctionTx.wait()

			// 4. Finally, get the auction information from the transaction receipt
			const auction = await auctionHouse.fetchAuctionFromTransactionReceipt(receipt)
		}
	})
*/
	// get web3 data
	const blockNumber = useBlockNumber(library, chainId)
	const ethBalance = useEthBalance(library, account, chainId)

	useEffect(() => {
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

			matic.balanceOfERC20(account, songLibrary[name].tokenAddress, { parent: false })
			.then(balance => {
				setRightokenBalance(balance)
			})
		}
	}, [account])

	const {data} = useZNFT("32")
	const {metadata} = useNFTMetadata(data && data.metadataURI)

	const auctionHouse = useMemo(() => {
		if (library && chainId) {
			return new AuctionHouse(library.getSigner(), chainId);
		}
	}, [library, chainId])

	useEffect(async () => {
		const fetchAgent = new MediaFetchAgent(Networks.TESTNET)
		const result = await fetchAgent.loadZNFTData("17")
		console.log(result)
	})

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
				{ /*
					auctionHouse ? (		
						<ManageAuction auctionHouse={auctionHouse} />
					) : <div>Please connect wallet</div>
				*/ }
{/*
				<div>
					<h3>{metadata.title}</h3>
					<p>{metadata.description}</p>
					<p>Owned by: {data.owner.id}</p>
				</div>
*/}
				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
						{ typeof(window) !== "undefined" &&
							<>
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl uppercase">
									Invest in { name }
								</p>
								<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									You currently hold {rightokenBalance/(10**18)}% of {name.toUpperCase()}
								</p>
							</>
						}
						</div>
					</div>
					<div className="min-w-xl mt-12 flex flex-row justify-center space-x-12">
						{ typeof(songLibrary[name]) !== "undefined" &&
							<SongCard key={name} song={name} artist={songLibrary[name].artist} img={`../${songLibrary[name].albumArt}`} price={songLibrary[name].price} link={name} />
						}
						{ account && 
							<RoundedLinkButton outerDivClassName="place-self-center" link="https://quickswap.exchange/#/swap" text="Secure your share" />
						}
						{ !account && 
							<RoundedLinkButton outerDivClassName="place-self-center" link="/beta" text="Start beta testing" />
						}
					</div>
					<br />
					<br />
					{ typeof(window) !== "undefined" &&
						<p className="mt-6 max-w-2xl text-center text-md text-gray-500 lg:mx-auto">
							Add the token address {songLibrary[name].tokenAddress} to track your ownership off Rightoken.
						</p>
					}
				</div>
			</main>

			<Footer />
		</>
	)
}
