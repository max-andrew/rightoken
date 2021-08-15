import Head from 'next/head'

import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import SongCard from '../components/SongCard'
import RoundedLinkButton from '../components/RoundedLinkButton'
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

import { Zora, AuctionHouse, ManageAuction } from '@zoralabs/zdk'

import { createClient } from 'urql'
const APIURL = "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1-mumbai"

import songLibrary from '../data/songLibrary'

export default function Marketplace() {
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

	const getNFTMetadata = async id => {
		if (library && chainId) {
			const zora = new Zora(library.getSigner(), chainId)

			return await fetch(""+await zora.fetchMetadataURI(id)+"/metadata.json")
			.then(response => response.json())
			.then(data => { return data })
			.catch(error => console.log(error))
		}
	}

	const [rightokens, setRightokens] = useState([])
	useEffect(async () => {
		const tokensQuery = `
			query {
				medias {
					id
					metadataURI
				}
			}
		`

		const client = createClient({ url: APIURL })
		const data = await client.query(tokensQuery).toPromise()

		const rightokenIDs = []
		for (const media of data.data.medias) {
			fetch(""+media.metadataURI+"/metadata.json")
			.then(response => response.json())
			.then(data => { 
				if (data.name === "Rightoken" && rightokens.indexOf(media.id) === -1)
					setRightokens({...rightokens,  test: { properties: data.properties } })
			})
			.catch(error => {/*console.log(error)*/})
		}
	}, [])

	useEffect(async () => {
		if (library && chainId) {
			const zora = new Zora(library.getSigner(), chainId)

			console.log(await zora.fetchCurrentBidShares(32))
		}
	})

	const getRightokenCard = id => {
		return (
			<SongCard 
				key={id} 
				song={rightokens.test.properties.songTitle} 
				artist={rightokens.test.properties.artistName} 
				img={`./${songLibrary["space"].albumArt}`}
				price={songLibrary["space"].price}
				link={id} 
			/>
		)
	}

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main>
				<Header />

				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Marketplace</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Explore and invest in the next chart-toppers.
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/marketplace-graphic.svg"
									alt=""
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Support growing artists by sharing ownership over song recordings. <a className="underline" href="/investor">Learn more about how investors can build a portfolio of songs.</a> <a className="underline" href="/artist">Or how artists can flexibly fund their work and stay independent.</a>
							</p>
						</div>

						<div className="mt-16 md:mt-22 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 lg:gap-x-6 lg:gap-y-14">
							{ Object.keys(rightokens).map(id => getRightokenCard(id) ) }
							{ Object.keys(songLibrary).map(songName => <SongCard key={songName} song={songName} artist={songLibrary[songName].artist} img={`./${songLibrary[songName].albumArt}`} price={songLibrary[songName].price} link={songName} />) }
							<SongCard song="List your song" artist="You" price="X" link="../artist" />
						</div>

					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
