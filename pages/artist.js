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

	const audioInputFile = useRef(null)

	const [audioFileName, setAudioFileName] = useState()

	useEffect(() => {
		audioInputFile.current.addEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
		return () => {
			audioInputFile.current.removeEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
		}
	})

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
							<p className="text-center text-xs font-bold uppercase mb-2">Tokenize your song</p>
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
									<p className="tracking-widest text-center font-extrabold text-2xl mb-8 text-purple-800 uppercase">• Presenting •</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none max-w-md py-2 text-3xl font-mono text-gray-700 font-center" spellCheck="false" placeholder="Song Title" />
								</div>
								<br />
								<br />
								<div className="flex flex-col">
									<p className="tracking-wider text-center italic font-semibold text-xl mb-4 text-purple-800">☟ by the illustrious ☟</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none py-2 text-2xl font-mono text-gray-700 place-self-center" spellCheck="false" placeholder="Artist Name" />
								</div>
							</div>
							<br />
							<br />
							<div className="text-center">
								{!!audioFileName &&
									<div className="space-y-1 p-4 border-purple-800 border-t-2 border-b-2">
										<p className="text-sm font-mono font-semibold">Ok we just listened to</p>
										<p className="text-md font-mono font-bold">{audioFileName}</p>
										<p className="text-xs font-mono font-semibold">(and it ҉ slaps ҉)</p>
									</div>
								}
								<br />
								<div className="flex justify-center text-sm text-gray-600">
										<label
											htmlFor="audio-upload"
											className={"mb-2 relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 capitalize" + " " + (!!audioFileName ? "bg-green-50 hover:bg-indigo-50 text-xs p-2 text-gray-500 hover:text-gray-600" : "bg-white text-md p-4 text-purple-500 hover:text-purple-600") }
										>
										<span>{(!!audioFileName ? "Choose a different track" : "Upload your track")} &nbsp; ♫</span>
										<input id="audio-upload" name="audio-upload" type="file" accept=".mp3" className="sr-only" ref={audioInputFile} />
									</label>
								</div>
								{(!audioFileName &&
									<p className="text-xs font-mono text-gray-500">MP3 up to 32MB</p>
								)}
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<p className="">The holder of the song's Rightoken agrees to:</p>
							<br />
							<div className="flex flex-row text-xs">
								<p>I, &nbsp;</p> <input className="bg-transparent outline-none" placeholder="Full Legal Name" /> <p>,&nbsp; agree to the terms constructed above and acknowledge that exclusive <a className="underline" href="https://www.law.cornell.edu/uscode/text/17/114">sound recording copyright</a> will be transferred to the tokenholder, untill burned whereby rights are returned to the artist.</p>
							</div>
							<br />
							<br />
							<RoundedButton onClick={() => alert(audioInputFile.current.files[0].name)} customBG className="bg-green-400 hover:bg-green-500 max-w-md m-auto uppercase" textClassName="text-xs font-bold" text="Mint" />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
