import { Fragment, useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { injected } from '../functions/connectors'

import { formatEther } from '@ethersproject/units'

import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

import FunkyButton from '../components/FunkyButton'
import LinkWalletButton from '../components/LinkWalletButton'

export default function Invest() {
	const { 
		library,
		account,
		activate,
		chainId,
	} = useWeb3React()

	const [showFAQs, setShowFAQs] = useState(true)
	const [showWhatIs, setShowWhatIs] = useState(false)
	const [showSoundRecording, setShowSoundRecording] = useState(false)
	const [showTokenPrice, setShowTokenPrice] = useState(false)
	const [showListAmount, setShowListAmount] = useState(false)
	const [showHowMany, setShowHowMany] = useState(false)
	const [showPermanence, setShowPermanence] = useState(false)
	const [showNFT, setShowNFT] = useState(false)
	const [showWhyCrypto, setShowWhyCrypto] = useState(false)
	const [showCrashCourse, setShowCrashCourse] = useState(false)
	const [showUseCost, setShowUseCost] = useState(false)
	const [showMeTheMoney, setShowMeTheMoney] = useState(false)

	const [ethBalance, setEthBalance] = useState(0.0)
	useEffect(() => {
		updateEthBalance()
	}, [chainId])

	const faqs = [
		{
			question: "What is Rightoken?", 
			answer: "Rightoken is open-source code that enables artists to monetize their work while keeping control of it and sharing the benefits with fans. This is done by converting sound recording copyright to tokens that can be bought and sold like shares of a company.", 
			flag: showWhatIs, 
			flagSetter: setShowWhatIs
		},
		{
			question: "What is sound recording copyright?", 
			answer: "Sound recording copyright is the right to a song's master. A master is a recording of an underlying composition. After tokenizing, an artist maintains rights to the composition and may re-record or allow covers of the song.", 
			flag: showSoundRecording, 
			flagSetter: setShowSoundRecording
		},
		{
			question: "Who sets the price?", 
			answer: "You decide the asking price when you list your tokens. The price rises as more people buy in.", 
			flag: showTokenPrice, 
			flagSetter: setShowTokenPrice
		},
		{
			question: "How much do I need to list?", 
			answer: "You can list anywhere from 0-100%.", 
			flag: showListAmount, 
			flagSetter: setShowListAmount
		},
		{
			question: "How many tokens do I get?", 
			answer: "After tokenizing your song, you are given 100 tokens representing 100% of ownership. Each token has 18 decimal places though, so a fan can invest in a tiny sliver of a song.", 
			flag: showHowMany, 
			flagSetter: setShowHowMany
		},
		{
			question: "Can I undo this?", 
			answer: "Yes, tokens can be bought back and delisted similarly to how public companies can go private.", 
			flag: showPermanence, 
			flagSetter: setShowPermanence
		},
		{
			question: "Is this a memey NFT project?", 
			answer: "No, Rightoken uses blockchain, but NFTs aren't involved.", 
			flag: showNFT, 
			flagSetter: setShowNFT
		},
		{
			question: "Why use crypto?", 
			answer: "Crypto is incidentally the best solution. Crypto gives artists total ownership by removing the need for a trusted third-party organization. Rightoken works without any one company running it or able to manipulate it.", 
			flag: showWhyCrypto, 
			flagSetter: setShowWhyCrypto
		},
		{
			question: "What does this cost?", 
			answer: <>&nbsp;&nbsp;Every blockchain charges network fees. Network fees, or gas, are charged to create new tokens and list them on an exchange for fans to buy into. These fees do not go to Rightoken. <br /> &nbsp;&nbsp; Gas prices are lower during off-peak hours like nights and weekends where a total cost per song should be under $20.</>, 
			flag: showUseCost, 
			flagSetter: setShowUseCost
		},
		{
			question: "How does Rightoken make money?", 
			answer: "Rightoken is supported by Crescendao, a record label cooperative owned and managed by select Rightoken artists.", 
			flag: showMeTheMoney, 
			flagSetter: setShowMeTheMoney
		},
	]

	const [tokenAddress, setTokenAddress] = useState("")
	useEffect(() => {
		if (typeof(window) !== "undefined") {
			const url = new URL(window.location.href)
			const searchParams = new URLSearchParams(url.search)
			const tokenAddress = searchParams.get("tokenAddress")
			if (tokenAddress !== null)
				setTokenAddress(searchParams.get("tokenAddress"))
		}
	})


	function updateEthBalance() {
		if (library && account) {
			console.log('Getting Eth balance...')
			library.getBalance(account)
			.then(balance => {
				console.log('Balance:', parseFloat(formatEther(balance)).toPrecision(4))
				setEthBalance(parseFloat(formatEther(balance)).toPrecision(4))
			})
		}
	}

	return (
		<>
			<Head>
				<title>Invest in Artists</title>
			</Head>
			<div className="mx-auto max-w-xs md:max-w-lg">
				<Header linkTo="artist" />
				<main>
					<div className="absolute right-0 top-20 bg-gradient-to-r from-inherit via-red-50 to-green-100 h-20 w-10/12 md:w-4/12" />
					<div className="py-9 relative z-10">
						{ showFAQs &&
							<>
								<h2 className="font-bold text-3xl md:text-4xl text-gray-900 max-w-xs md:max-w-md">Support your favorite independent artists <span className="text-gray-800">and share the profits and royalties</span></h2>
								<p className="font-bold text-lg md:text-2xl text-gray-600 max-w-xs md:max-w-md mt-2">Rightoken is how you can support artists by holding tokens that make you a true co-owner of songs</p>
							</>
						}

						<FunkyButton className="mt-4" onClick={() => setShowFAQs(!showFAQs)} text={showFAQs ? "Ready" : "FAQs"} grayOut={!showFAQs} />

						<br />
						<br />

						{ showFAQs ?
							<>
								<div id="faq">
									<fieldset className="border-2 rounded border-gray-700 p-8">
										<legend className="font-mono md:text-lg">FAQs</legend>
										<div className="md:text-lg">
											{
												faqs.map((question, i) =>
													<>
														<p className="underline font-medium inline cursor-pointer" onClick={() => question.flagSetter(!question.flag)}>{question.question}</p>
														{ question.flag &&
															<p className="inline-block text-sm font-medium md:text-base">{question.answer}</p>
														}
														{ i + 1 !== faqs.length &&
															<>
																<br />
																<br />
															</>
														}
													</>
												)
											}
										</div>
									</fieldset>
								</div>

								<br />

								<FunkyButton onClick={() => setShowFAQs(false)} text="Start" />
							</>
							: <>
								{(typeof(tokenAddress) !== 'undefined' && tokenAddress !== "" && tokenAddress !== null) ?
									<>
										<br />
										<h3 className="font-bold text-4xl text-center mb-4 text-zinc-600">1.</h3>
										<p>
											You need a crypto wallet to create, hold, and sell your tokens. Rightoken is optimized for the MetaMask app on <a href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202" className="underline" target="_blank" rel="noreferrer">iOS</a> and <a href="https://play.google.com/store/apps/details?id=io.metamask" className="underline" target="_blank" rel="noreferrer">Android</a>. 
											<br />
											<span className="font-medium">Download the app, create your wallet, find the browser in the wallet app, and return to this page there.</span>
										</p>
										<br />
										<LinkWalletButton account={account} activate={activate} injected={injected} />
									</>
									: <>
										<br />
										<p>You currently need a link from an artist to get started. <a href="https://discord.gg/QCmetTcbPj" className="underline" target="_blank" rel="noreferrer"><span className="font-medium">Join the community to find artists you can invest in.</span></a></p>
									</>
								}
								<br />
							
								{typeof(account) !== 'undefined' &&
									<>
										<br />
										<h3 className="font-bold text-4xl text-center mb-4 text-zinc-600">2.</h3>
										<span className="font-medium">You need Ethereum in your Arbitrum wallet to pay blockchain gas fees.</span> The fees don't go to Rightoken. <br /><br /> Download the Crypto.com <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank" rel="noreferrer">iOS</a> or <a href="https://play.google.com/store/apps/details?id=co.mona.android&hl=en&gl=US" className="underline" target="_blank" rel="noreferrer">Android</a> app, purchase at least 0.006 ETH, and withdraw to Arbitrum using your wallet address: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">{account}</span> <br /><br /> If you have Ethereum not on Arbitrum, you can send it to your wallet and <a href="https://bridge.arbitrum.io/" className="underline" target="_blank" rel="noreferrer">bridge to Arbitrum</a>, but it'll cost more in gas fees.
										<br />
										<br />
										{((chainId === 42161 || chainId === 421611) && ethBalance > 0.005) ? 
											<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  You have {ethBalance} ETH</p></div>
											: <div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-zinc-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-zinc-600 animate-ping" />  You have {ethBalance} ETH</p></div>
										}
										<div className="flex flex-col">
											<button
												className="uppercase text-xs font-bold px-3 py-2 text-zinc-400 mix-blend-multiply active:bg-zinc-200 rounded-md"
												onClick={() => updateEthBalance()}
											>
												Get Current Balance
											</button>
										</div>
										<br />
									</>
								}

								{typeof(account) !== 'undefined' && ((chainId === 42161 && ethBalance > 0.001) || chainId === 421611) &&
									<>
										<br />
										<h3 className="font-bold text-4xl text-center mb-4 text-zinc-600">3.</h3>
										<p>Here's your link to the market:</p>
										<span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">app.uniswap.org/#/swap?exactField=input&exactAmount=250&inputCurrency=0x2f3C1B6A51A469051A22986aA0dDF98466cc8D3c&outputCurrency={tokenAddress}</span>
									</>
								}
							</>
						}
					</div>
				</main>
			</div>

			<Footer />
		</>
	)
}
