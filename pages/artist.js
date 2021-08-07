import Head from 'next/head'

import { Fragment } from 'react'
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
								Rightoken empowers artists by letting them control monetization and ownership. Artists are given the tools to write their own terms for the investment agreement and have the option to buy their rights back.
							</p>
							<p className="mt-6 max-w-2xl text-md text-gray-500 lg:mx-auto">
								
							</p>
						</div>

						<br />
						<br />

						<div className="border-2 border-indigo-100 bg-gradient-to-r from-green-50 to-blue-50 rounded-md px-12 py-10 max-w-xl flex flex-col place-items-center place-self-center m-auto">
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
							<div className="align-left">
								<div>
									<p className="italic bold text-4xl mb-2 text-gray-800">Presenting</p>
									<input className="bg-transparent border-indigo-100 border-b-2 outline-none max-w-md py-2 text-5xl font-mono text-purple-700" spellcheck="false" placeholder="Song Title" type="textarea" />
								</div>
								<br />
								<br />
								<div>
									<p className="italic bold text-3xl mb-2 text-gray-700">By the illustrious</p>
									<input className="bg-transparent border-indigo-100 border-b-2 outline-none max-w-md py-2 text-4xl font-mono text-purple-700" placeholder="Artist Name" />
								</div>
							</div>
							<br />
							<br />
							<div className="space-y-1 text-center">
								<div className="flex justify-center text-sm text-gray-600">
									<label
										htmlFor="file-upload"
										className="p-4 mb-2 relative cursor-pointer bg-white hover:bg-indigo-50 rounded-md font-medium text-purple-500 hover:text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 capitalize"
									>
										<span>Upload your track &nbsp; ♫</span>
										<input id="file-upload" name="file-upload" type="file" accept=".mp4" className="sr-only" />
									</label>
								</div>
								<p className="text-xs font-mono text-gray-500">MP4 up to 32MB</p>
							</div>
							<br />
							<br />
							<p>Rightoken Agreement</p>
							<br />
							<div className="flex flex-row text-xs">
								<input className="place-self-center mr-2" type="checkbox" />
								<p>I, &nbsp;</p> <input className="bg-transparent border-b-2 outline-none max-w-md" placeholder="Legal name" /> <p>,&nbsp; agree to the terms constructed above &nbsp;</p>
							</div>
							<br />
							<br />
							<RoundedButton onClick={() => deployFunction()} customBG className="bg-green-400 hover:bg-green-500 max-w-md m-auto uppercase" textClassName="text-xs font-bold" text="Mint" />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
