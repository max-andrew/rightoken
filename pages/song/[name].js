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

import { Zora, AuctionHouse, ManageAuction } from '@zoralabs/zdk'
import {useZNFT, useNFTMetadata, MediaFetchAgent, Networks} from '@zoralabs/nft-hooks'

import { createClient } from 'urql'
const APIURL = "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1-mumbai"

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

	const [walletAppSelected, setWalletAppSelected] = useState(getConnectedWalletApp())
	const [activatingConnector, setActivatingConnector] = useActivatingConnector(connector)

	// link wallet if it is already connected (but page has refreshed)
	useEffect(() => {
		if (!account && getConnectedWalletApp() === walletAppSelected)
			connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)
	})

/*
	// get balance of rightoken
	const [rightokenBalance, setRightokenBalance] = useState(0)
*/

	// get query params for default wallet selection

	const [songTitle, setSongTitle] = useState("")
	const [artistName, setArtistName] = useState("")

	const router = useRouter()
	const { name } = router.query

	useEffect(async () => {
		if (name && library && chainId) {
			const zora = new Zora(library.getSigner(), chainId)

			const metadataURI = await zora.fetchMetadataURI(name)
			console.log(metadataURI)

			const data = await fetch(metadataURI+"/metadata.json")
			.then(response => response.json())
			.then(data => { return data })

			setSongTitle(data.properties.songTitle)
			setArtistName(data.properties.artistName)
		}
	}, [name, library, chainId, songTitle, artistName])

/*
	// redirect user if song does not exist
	if ((typeof(window) !== "undefined") && (typeof(songLibrary[name]) === "undefined")) {
		window.location.replace("../marketplace")
	}
*/


	const getRightokenCard = id => {
		return (
			<SongCard 
				key={id} 
				song={songTitle} 
				artist={artistName} 
				img="./../rightoken-logo.png"
				price={songLibrary["space"].price}
				link={id} 
			/>
		)
	}

	const doIOwnThisRightoken = async id => {
		if (account && chainId) {
			const zora = new Zora(library.getSigner(), chainId)
			const ownerID = await zora.fetchOwnerOf(id)

			return (ownerID === account)
		}
		return false
	}

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl uppercase">
								{  songTitle }
							</p>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								You {doIOwnThisRightoken(name) ? "" : "don't"} currently hold this Rightoken
							</p>
						</div>
					</div>
					<div className="min-w-xl mt-20 flex flex-row justify-center space-x-12">
					{
						name && 
							getRightokenCard(name)
					}
					{ account && 
						<RoundedLinkButton outerDivClassName="place-self-center" link="https://zora.co" text={doIOwnThisRightoken(name) ? "Manage auction" : "Bid now" } />
					}
					{ !account && 
						<RoundedLinkButton outerDivClassName="place-self-center" link="/beta" text="Start beta testing" />
					}
					</div>
					<br />
					<br />
					{ /* typeof(window) !== "undefined" &&
						<p className="mt-6 max-w-2xl text-center text-md text-gray-500 lg:mx-auto">
							Add the token address {songLibrary[name].tokenAddress} to track your ownership off Rightoken.
						</p>
					*/ }
				</div>
			</main>

			<Footer />
		</>
	)
}
