import { Fragment, useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { PUBLIC_RPC_URLS, injected } from '../functions/connectors'

import { ethers } from 'ethers'
import { formatEther } from '@ethersproject/units'

import { optimismNetworkBundle } from '../data/networkData'

import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Countdown from 'react-countdown'
import FunkyButton from '../components/FunkyButton'
import LinkWalletButton from '../components/LinkWalletButton'
import CommunityWidget from '../components/CommunityWidget'
import { SwapWidget } from '@uniswap/widgets'

import Image from 'next/image'

export default function Invest() {
	const {
		library,
		account,
		activate,
		chainId,
	} = useWeb3React()

	const networkDefaults = optimismNetworkBundle

	const infuraApiKey = process.env.INFURA_KEY
	const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
	const defaultInputDAIAmount = 50

	let stablecoinAddress = networkDefaults.mainnet.stablecoin_address

	if (chainId === networkDefaults.testnet.id) {
		stablecoinAddress = networkDefaults.testnet.stablecoin_address
	}

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

	const RIGHTOKEN_TOKEN_LIST = [
		{
			"name": "Rightoken",
			"address": tokenAddress,
			"symbol": "RTKN",
			"decimals": 18,
			"chainId": chainId,
			"logoURI": "https://github.com/max-andrew/rightoken/blob/main/public/512x512_App_Icon.png"
		},
		{
			"name": "Dai Stablecoin",
			"address": stablecoinAddress,
			"symbol": "DAI",
			"decimals": 18,
			"chainId": chainId,
			"logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
		},
	]

	let minABI = [
		{
			"constant": true,
			"inputs": [{"name":"_owner","type":"address"}],
			"name": "balanceOf",
			"outputs": [{"name":"balance","type":"uint256"}],
			"type": "function"
		},
	]

	const [openFAQs, setOpenFAQs] = useState(false)
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
	const [daiBalance, setDAIBalance] = useState(0.0)

	useEffect(() => {
		updateEthBalance()
		updateDAIBalance()
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
			answer: <>Every blockchain charges network fees. Network fees, or gas, are charged to create new tokens and list them on an exchange for fans to buy into. These fees do not go to Rightoken. <br /> Gas prices are lower during off-peak hours like nights and weekends where a total cost per song should be under $20.</>, 
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


	// Countdown renderer
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <p>Rightoken's first mint, "Obsessed!" is now available to everyone!</p>
		} 
		else {
			return <span>Rightoken's first mint, "Obsessed!" is now in presale! Public launch in: {days}:{hours}:{minutes}:{seconds}</span>
		}
	}

	function updateEthBalance() {
		if (library && account) {
			console.log('Getting Eth balance...')
			library.getBalance(account)
			.then(balance => {
				console.log('Eth balance:', parseFloat(formatEther(balance)).toPrecision(4))
				setEthBalance(parseFloat(formatEther(balance)).toPrecision(4))
			})
		}
	}

	async function updateDAIBalance() {
		if (library && account) {
			console.log('Getting DAI balance...')

			const signer = library.getSigner(account)
			let contract = new ethers.Contract(stablecoinAddress, minABI, signer)

			const balance = await contract.balanceOf(account)
			const formattedBalance = parseFloat(formatEther(balance)).toPrecision(4)
			console.log(`DAI balance: ${formattedBalance}`)
			setDAIBalance(formattedBalance)
		}
	}

	return (
		<>
			<Head>
				<title>Invest in Artists</title>
			</Head>
			<div className="grid place-items-center font-mono text-xs text-cyan-500 bg-gradient-to-r from-red-50 via-blue-50 py-4 to-green-100 text-center">
				<span className="max-w-sm sm:max-w-none">
					<Countdown
						/* suppressHydrationWarning */
						date={1658418825363 + (7 * 24 * 60 * 60 * 1000)}
						renderer={renderer}
						/>
				</span>
			</div>
			<div className="mx-auto max-w-xs md:max-w-lg">
				<Header linkTo="artist" />
				<main>
					<div className="absolute right-0 top-00 z-0 bg-gradient-to-r from-inherit via-red-50 to-green-100 h-20 w-10/12 md:w-4/12" />
					<div className="absolute right-0 md:left-40 top-44 md:top-72 z-10">
						<Image
							src="/static/obsessed.jpg"
							alt="Obsessed! cover art"
							width={250}
							height={250}
							className="rounded-lg opacity-20 scale-50 md:scale-100"
							/>
					</div>
					<div className="py-9 relative z-20">
						<div>
							{ showFAQs &&
								<div className="border-2 border-purple rounded bg-gradient-to-r from-red-50/50 via-green-50/50 to-blue-100/50 px-8 py-4">
									<h2 className="font-bold text-4xl md:text-5xl text-gray-900 max-w-xs md:max-w-md">Co-own your favorite songs</h2>
									<p className="font-bold text-md md:text-xl text-gray-600 max-w-xs md:max-w-md mt-3">Rightoken lets artists tokenize their song rights so fans can support independent artists and share the profits and royalties</p>
								</div>
							}

							<br />

							<FunkyButton className="mt-4" onClick={() => setShowFAQs(!showFAQs)} text={showFAQs ? "Enter App ↝" : "↜ Back"} grayOut={!showFAQs} />
						</div>

						<br />

						{ showFAQs ?
							openFAQs ?
								<>
									<br />
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
										<br />
										<div className="text-center">
											<button className="text-sm font-medium px-3 py-1 bg-gray-100 active:bg-gray-200 rounded-md text-zinc-800" onClick={() => setOpenFAQs(!openFAQs)}>Close FAQs ↾</button>
										</div>
									</div>
								</>
							: <>
								<div className="text-center">
									<button className="text-sm font-medium px-3 py-1 bg-gray-100 active:bg-gray-200 rounded-md text-zinc-800" onClick={() => setOpenFAQs(!openFAQs)}>Open FAQs ⇂</button>
								</div>
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
										<div className="border-2 border-purple rounded bg-gradient-to-r from-red-50/50 via-green-50/50 to-blue-100/50 px-8 py-4 text-center">
											<a href="https://discord.gg/QCmetTcbPj" className="underline text-green-900/75" target="_blank" rel="noreferrer">
												<p className="font-medium text-lg">Get a link to invest in Sam Setton's new song, "Obsessed!"</p>
											</a>
											<p className="mt-4 text-xs text-red-400/75">You currently need a link from an artist to get started.</p>
										</div>
									</>
								}
								<br />
							
								{typeof(account) !== 'undefined' &&
									<>
										<br />
										<h3 className="font-bold text-4xl text-center mb-4 text-zinc-600">2.</h3>

										<span className="font-medium">You need DAI in your {networkDefaults.mainnet.name} wallet to pay.</span>
										<br />
										<br />
										<p>Purchase some Eth and bridge to {networkDefaults.mainnet.name}.</p>
										<br />
										Download the Crypto.com <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank" rel="noreferrer">iOS</a> or <a href="https://play.google.com/store/apps/details?id=co.mona.android&hl=en&gl=US" className="underline" target="_blank" rel="noreferrer">Android</a> app, purchase some ETH, and withdraw to {networkDefaults.mainnet.name} using your wallet address: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">{account}</span> <br /><br /> If you have Ethereum not on {networkDefaults.mainnet.name}, you can send it to your wallet and <a href="https://app.hop.exchange/" className="underline" target="_blank" rel="noreferrer">bridge to {networkDefaults.mainnet.name}</a>, but it'll cost more in gas fees.
										<br />
										<br />
										<p>Swap Eth to DAI on {networkDefaults.mainnet.name} using Uniswap.</p>
										<br />
										<SwapWidget
											provider={library.getSigner(account).provider}
											jsonRpcEndpoint={PUBLIC_RPC_URLS[chainId]}
											width="100%"
											tokenList={"https://static.optimism.io/optimism.tokenlist.json"}
											defaultOutputTokenAddress={stablecoinAddress}
										/>
										<br />
										<br />
										<span className="font-medium">What is DAI?</span>
										<p>DAI is a price-stable currency which is softly-pegged to one USD.</p>
										<p>We use DAI as the liquidity pair for Rightoken so that the token price is clear and easy for everyone to understand.</p>
										<br />
										<span className="font-medium">What is Uniswap?</span>
										<p>Uniswap is the largest decentralized exchange based on Ethereum.</p>
										<p>It allows artists and investors to exchange tokens without intermediary.</p>
										<br />

										<div className="flex flex-col justify-center space-y-2">
											{ (chainId !== networkDefaults.testnet.id && chainId !== networkDefaults.testnet.id) &&
												<button
													className={`uppercase text-sm font-bold px-4 py-3 mix-blend-multiply ${chainId === networkDefaults.testnet.id ? "bg-zinc-200" : "bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100"} text-zinc-700 active:text-zinc-500 rounded-md`}
													onClick={
														async () => {
															try {
																await library.provider.request({
																	method: "wallet_switchEthereumChain",
																	params: [{ chainId: `0x${networkDefaults.mainnet.id.toString(16)}` }]
																})
															}
															catch (e) {
																await library.provider.request({
																	method: "wallet_addEthereumChain",
																	params: [
																		{
																			chainId: `0x${networkDefaults.mainnet.id.toString(16)}`, // OPTIMISM_CHAIN_ID
																			chainName: networkDefaults.mainnet.name,
																			rpcUrls: [networkDefaults.mainnet.rpc_url],
																			blockExplorerUrls: [networkDefaults.mainnet.block_explorer_url]
																		}
																	]
																})
															}
															finally {
																location.reload() // for MetaMask mobile app
															}
														}
													}
												>
													Connect to {networkDefaults.mainnet.name}
												</button>
											}
										</div>
										{((chainId === networkDefaults.mainnet.id || chainId === networkDefaults.testnet.id)) &&
										<div>
											<div className="flex flex-col">
												<button
													className="uppercase text-xs font-bold px-3 py-2 text-zinc-400 mix-blend-multiply active:bg-zinc-200 rounded-md"
													onClick={() => updateDAIBalance()}
												>
													Get DAI Current Balance
												</button>
											</div>
											<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  You have {daiBalance} DAI</p></div>
										</div>
										}
										<br />
									</>
								}

								{typeof(account) !== 'undefined' && ((chainId === networkDefaults.mainnet.id && daiBalance > 0) || chainId === networkDefaults.testnet.id) &&
									<>
										<br />
										<h3 className="font-bold text-4xl text-center mb-4 text-zinc-600">3.</h3>
										<p>You're ready to buy some rightokens!</p>
										<br />
										<SwapWidget
											provider={library.getSigner(account).provider}
											jsonRpcEndpoint={PUBLIC_RPC_URLS[chainId]}
											width="100%"
											tokenList={RIGHTOKEN_TOKEN_LIST}
											defaultInputTokenAddress={stablecoinAddress}
											defaultOutputTokenAddress={tokenAddress}
										/>
									</>
								}
							</>
						}

						<br />

						<CommunityWidget />
					</div>
				</main>
			</div>

			<Footer />
		</>
	)
}
