import Head from 'next/head'

import { Fragment, useEffect, useState, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedButton from '../components/RoundedButton'
import CommunityWidget from '../components/CommunityWidget'
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

import { ethers } from 'ethers'

import deployFunction from '../scripts/deploy'

import { NFTStorage, File } from 'nft.storage'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyNmViRWFFMUUyQmUxNDFCREM0QjIxRjBGYTlBNzdiMDU3OGZlNjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODQ1MjAxMDQ4MiwibmFtZSI6IlJpZ2h0b2tlbiJ9.D8o845sX8yBmgwDc6DkNSTFJ4-auXFjRGHLyC7MOSIQ'
const client = new NFTStorage({ token: apiKey })

export default function Artist() {
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

	const [songTitle, setSongTitle] = useState()
	const [artistName, setArtistName] = useState()

	const audioInputFile = useRef(null)
	const [audioFileName, setAudioFileName] = useState()

	useEffect(() => {
		if (!!audioInputFile) {
			audioInputFile.current.addEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			return () => {
				audioInputFile.current.removeEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			}
		}
	})

	const storeNFT = async () => {
		const metadata = await client.store({
			name: 'Pinpie',
			description: 'Pin is not delicious beef!',
			image: new File([/* data */], 'rightoken.png', { type: 'image/png' }),
			properties: new File([/* data */], 'BabyElephantWalk60.wav', { type: 'audio/wav' })
		})
		console.log(metadata.url)
		// ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
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
							<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Artists</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Your work. Your terms.
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/artist-graphic.svg"
									alt="music note graphic"
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Rightoken empowers artists by letting them control monetization and ownership. Artists are given the tools to write their own terms for the investment agreement and have the option to undo tokenization.
							</p>
							<p className="mt-6 max-w-2xl text-md text-gray-500 lg:mx-auto">
								
							</p>
						</div>

						<br />
						<br />

						<div className="border-2 border-indigo-100 border-opacity-80 bg-gradient-to-r from-green-50 to-blue-50 rounded-md px-12 py-10 max-w-xl flex flex-col place-items-center place-self-center m-auto">
							<p className="text-center text-xs font-extrabold uppercase mb-2">Tokenize your song</p>
							<br />
							<p className="text-xs font-mono my-2">
								By signing up below you acknowledge you are the sole owner of the sound recording rights associated with the uploaded file. You agree that all rights will be transferred to tokenholders. 
								<br />
								<br /> 
								This process is reverted if the token is burned. After approval, 100% of tokenized rights for the song provided will be transferred to the wallet address provided for the artist to disburse, sell, or swap with any other user on the blockchain.
							</p>
							<p className="text-xs font-mono text-center">❦</p>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<div>
								<div>
									<p className="tracking-widest text-center font-extrabold text-2xl mb-6 text-red-800 uppercase">• Presenting •</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none max-w-md py-2 text-3xl font-mono text-gray-700 font-center" spellCheck="false" placeholder="Song Title" value={songTitle} onChange={e => setSongTitle(event.target.value)} />
								</div>
								<br />
								<br />
								<div className="flex flex-col">
									<p className="tracking-wider text-center italic font-bold text-lg mb-4 text-gray-800">☟ by the illustrious ☟</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none py-2 text-2xl font-mono text-gray-700 place-self-center" spellCheck="false" placeholder="Artist Name" value={artistName} onChange={e => setArtistName(event.target.value)} />
								</div>
							</div>
							<br />
							<div className="text-center">
								{!!audioFileName &&
									<div className="space-y-2 mt-8 p-4 border-purple-900 border-t-2 border-b-2">
										<p className="text-sm font-mono font-semibold">Located at</p>
										<p className="text-md font-mono font-bold">{audioFileName}</p>
										<p className="text-xs font-mono font-semibold">(certified ҉ <i>slapper</i> ҉)</p>
									</div>
								}
								<br />
								<div className="flex justify-center text-sm text-gray-600">
										<label
											htmlFor="audio-upload"
											className={"mb-2 relative cursor-pointer hover:bg-indigo-50 rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 capitalize" + " " + (!!audioFileName ? "text-xs p-2 text-gray-500 hover:text-gray-600" : "bg-white text-md p-4 text-purple-500 hover:text-purple-600") }
										>
										<span>{(!!audioFileName ? "Choose a different track" : "Upload your track")} &nbsp; ♫</span>
										<input id="audio-upload" name="audio-upload" type="file" accept=".wav, .mp3" className="sr-only" ref={audioInputFile} />
									</label>
								</div>
								{(!audioFileName &&
									<p className="text-xs font-mono text-gray-500">WAV, MP3 up to 64MB</p>
								)}
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<p className="my-2">The Rightoken holder agrees to the following terms</p>
							<p className="text-xs font-mono text-center">~</p>
							<br />
							<br />
							<p>and acknowledge that exclusive <a className="underline" href="https://www.law.cornell.edu/uscode/text/17/114">sound recording copyright</a> will be transferred to the tokenholder, untill burned whereby rights are returned to the artist.</p>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<div className="flex flex-row text-sm">
								<p>I, &nbsp;</p> <input className="bg-transparent outline-none border-indigo-100 border-b-2" placeholder="Full Legal Name" /> <p>,&nbsp; agree to the terms constructed above.</p>
							</div>
							<br />
							<br />
							<RoundedButton onClick={() => storeNFT()} customBG className={"bg-green-400 hover:bg-green-500 max-w-md m-auto uppercase" + " " + (!!songTitle && !!artistName && !!audioFileName && "motion-safe:animate-pulse")} textClassName="text-xs font-bold" text="Mint" />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
