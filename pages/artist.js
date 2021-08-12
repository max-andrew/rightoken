import Head from 'next/head'

import { Fragment, useEffect, useState, useRef, useMemo } from 'react'
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

// import { NFTStorage, File } from 'nft.storage'
// const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyNmViRWFFMUUyQmUxNDFCREM0QjIxRjBGYTlBNzdiMDU3OGZlNjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODQ1MjAxMDQ4MiwibmFtZSI6IlJpZ2h0b2tlbiJ9.D8o845sX8yBmgwDc6DkNSTFJ4-auXFjRGHLyC7MOSIQ'
// const client = new NFTStorage({ token: apiKey })

// import { Zora } from '@zoralabs/zdk'
// import { AuctionHouse } from '@zoralabs/zdk'

import Confetti from 'react-confetti'

export default function Artist() {
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

	/*
	useEffect(async () => {
		if (chainId) {
			alert(chainId)
		}
	}, [library])

	const auctionHouse = useMemo(() => {
		if (library && chainId) {
			alert(chainId)
			return new AuctionHouse(library.getSigner(), chainId)
		}
	}, [library, chainId])
	*/

	const [songTitle, setSongTitle] = useState()
	const [artistName, setArtistName] = useState()
	const [legalName, setLegalName] = useState()

	const audioInputFile = useRef(null)
	const [audioFileName, setAudioFileName] = useState()

	useEffect(() => {
		if (audioInputFile !== null) {
			audioInputFile.current.addEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			return () => {
				audioInputFile.current.removeEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			}
		}
	})

	const [songTitleError, setSongTitleError] = useState(false)
	const [artistNameError, setArtistNameError] = useState(false)
	const [legalNameError, setLegalNameError] = useState(false)
	const [audioFileError, setAudioFileError] = useState(false)

	const [enableSocialRecoverySelection, setEnableSocialRecoverySelection] = useState(true)

	const [mintSuccessful, setMintSuccessful] = useState(false)
	const [runConfetti, setRunConfetti] = useState(false)
	const topOfPage = useRef(null)

	const resetFormValues = () => {
		setSongTitle("")
		setArtistName("")
		setLegalName("")
		setAudioFileName("")
		audioInputFile.current.files[0] = ""
	}

	const resetErrors = () => {
		setSongTitleError(false)
		setArtistNameError(false)
		setLegalNameError(false)
		setAudioFileError(false)
	}

	const setErrors = () => {
		if (songTitle === "")
			setSongTitleError(true)
		if (artistName === "")
			setArtistNameError(true)
		if (legalName === "")
			setLegalNameError(true)
		if (audioFileName === "")
			setAudioFileError(true)
	}

	const isFormValid = () => {
		setErrors()

		if (songTitleError || artistNameError || legalNameError || audioFileError) {
			return false
			alert("hi")
		}
		else {
			return true
		}
	}

	// const storeNFT = async () => {
	// 	const metadata = await client.store({
	// 		name: 'Rightoken',
	// 		description: 'Test Rightoken v0',
	// 		image: new File([/* data */], 'rightoken.png', { type: 'image/png' }),
	// 		properties: {
	// 			audio: new File([/* data */], audioInputFile.current.files[0], { type: 'audio/wav' }),
	// 			songTitle: songTitle,
	// 			artistName: artistName
	// 		}
	// 	})
	// 	return metadata.url
	// }

	const mintRightoken = () => {
		resetErrors()

		if (isFormValid()) {
			setRunConfetti(true)
			scrollTo(topOfPage)
			// storeNFT().then(text => alert(text))
			setMintSuccessful(true)
			// resetFormValues()
			setTimeout(() => setMintSuccessful(false), 10000)
		}
	}

	const scrollTo = (ref) => ref.current && ref.current.scrollIntoView({behavior: 'smooth'})

	const legalAgreementLibrary = {
		/*resaleRoyalties: {
			title: "Resale Royalties",
			body: "The artist shall be given the following percent of each successful bid on secondary markets",
			mutable: true,
		},*/
		socialRecovery: {
			title: "Social Recovery",
			body: "The original artist may verify their identity and contact the Rightoken team in case of lost Rightoken. The artist's must be verified before having lost the asset and the artist must publicly post that the token was lost to allow any potential rightful owner to come forward to dispute the issue. If a dispute arises Rightoken will initiate a dispute resolution process and transparently weigh the facts of the case before arriving at a decision. Following its ruling, a replacement Rightoken will be issued, voiding the previous token.",
			mutable: true,
		},
		metadata: {
			title: "Metadata",
			body: "The sound recording title and associated cover art may be distributed by the tokenholder, but copyright is not conferred for these works.",
			mutable: false,
		},
		credit: {
			title: "Credit",
			body: "The tokenholder shall acknowledge the original authorship of the composition appropriately and reasonably in all media and performance formats in writing where possible and vocally otherwise.",
			mutable: false,
		},
		definingRights: {
			title: "Defining Rights",
			body: "Scope of exclusive rights in sound recordings shall be understood under the terms of 17 U.S. Code § 114.",
			mutable: false,
		},
		governingLaw: {
			title: "Governing Law",
			body: "This agreement is governed by and shall be construed under the law of the State of New York, United States of America, without regard to the conflicts of laws principles thereof.",
			mutable: false,
		},
		rightTransfer: {
			title: "Copyright Transfer",
			body: "You agree that perpetual, irrevocable, and exclusive license to use the song will be transferred to tokenholders. will be transferred to the tokenholder, untill burned whereby rights are returned to the artist.",
			mutable: false,
		}
	}

	const getLegalAgreementSectionJSX = sectionKey => {
		const section = legalAgreementLibrary[sectionKey]
		const title = section.title
		const isSocialRecoverySection = sectionKey === "socialRecovery"

		const termCustomization = section.mutable ? <div className=""><p className="text-center"><input type="checkbox" defaultChecked={isSocialRecoverySection ? true : false} onClick={() => setEnableSocialRecoverySelection(!enableSocialRecoverySelection)} />&nbsp;&nbsp;Enable {title}</p></div> : ""

		return (
			<div key={section} className="my-6 space-y-2">
				<p className="text-sm font-semibold uppercase">{title}</p>
				<br />
				<p className="space-y-2">{section.body}</p>
				<br />
				{termCustomization}
			</div>
		)
	}

	// plain text document to be added as metadata
	const getLegalAgreementText = () => {

	}

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main ref={topOfPage}>
				<Header />
				{ (typeof window !== "undefined" && runConfetti) &&
					<Confetti
						className="m-auto"
						opacity={0.95}
						width={window.width}
						height={window.height}
						run={runConfetti}
						recycle={false}
						onConfettiComplete={() => setRunConfetti(false)}
					/>
				}
				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className={"text-base text-purple-600 font-semibold tracking-wide uppercase" + " " + (mintSuccessful && "animate-bounce")}>{ !mintSuccessful ? "Artists" : "Congrats"}</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{ !mintSuccessful ? "Your work. Your terms." : "Welcome to the bleeding edge of music 🎉"}
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/artist-graphic.svg"
									alt="music note graphic"
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Rightoken empowers artists by letting them control monetization and ownership. Artists are given the tools to write their own terms for the investment agreement and have the option to upgrade or undo tokenization.
							</p>
							<p className="mt-6 max-w-2xl text-md text-gray-500 lg:mx-auto">
								
							</p>
						</div>

						<br />

						{ 
							/* auctionHouse ? (
								<ManageAuction auctionHouse={auctionHouse} />
							) : <div>Please connect wallet</div> */
						}

						<br />
						<br />

						<div className="border-2 border-indigo-100 border-opacity-80 bg-gradient-to-r from-green-50 to-blue-50 rounded-md px-16 py-10 max-w-xl flex flex-col place-items-center place-self-center m-auto">
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
									<p className="tracking-widest text-center font-extrabold text-2xl mb-6 text-indigo-600 uppercase">• Presenting •</p>
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
										<span>{(!!audioFileName ? "Choose a different track" : "Upload master track")} &nbsp; ♫</span>
										<input id="audio-upload" name="audio-upload" type="file" accept=".wav" className="sr-only" ref={audioInputFile} />
									</label>
								</div>
								{(!audioFileName &&
									<p className="text-xs font-mono text-gray-500">WAV up to 80MB</p>
								)}
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<p className="my-2 text-center italic">The Rightoken holder shall agree to the following and be granted the rights included</p>
							<p className="text-xs font-mono text-center">~</p>
							<br />
							<br />
							<div className="space-y-12">
								{Object.keys(legalAgreementLibrary).map(sectionKey => getLegalAgreementSectionJSX(sectionKey))}
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full" />
							<br />
							<br />
							<div className="flex flex-row text-sm word-wrap">
								<p>I,&nbsp;<input className={"bg-transparent outline-none border-b-2" + " " + (legalNameError ? "border-red-100" : "border-indigo-100")} placeholder="Full Legal Name" />,&nbsp;affirm I am the rightful owner of sound recording and agree to the terms constructed above.</p>
							</div>
							<br />
							<br />
							<RoundedButton onClick={() => mintRightoken()} customBG className={"max-w-md m-auto uppercase" + " " + (isFormValid() ? "bg-green-400 hover:bg-green-500 motion-safe:animate-pulse" : "bg-gray-400")} textClassName="text-xs font-bold" text="Mint" />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
