import Head from 'next/head'

import { Fragment, useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { injected } from '../functions/connectors'
import { formatEther } from '@ethersproject/units'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Mint() {
	const { 
		library,
		account,
		activate,
		chainId,
	 } = useWeb3React()

	const [currentStep, setCurrentStep] = useState(0)
	// handle dropped step state like from page refresh on network change in mobile wallets
	useEffect(() => {
		if (mintStepPages[4].successCondition && mintStepPages[3].successCondition && mintStepPages[2].successCondition && mintStepPages[1].successCondition) {
			setCurrentStep(4)
		}
		else if (mintStepPages[3].successCondition && mintStepPages[2].successCondition && mintStepPages[1].successCondition) {
			setCurrentStep(3)
		}
		else if (mintStepPages[2].successCondition && mintStepPages[1].successCondition) {
			setCurrentStep(2)
		}
		else if (mintStepPages[1].successCondition) {
			setCurrentStep(1)
		}
	}, [chainId])

	// eagerly (re-)connect the wallet
	useEffect(() => {
		if (window?.sessionStorage.getItem('hasSeenIntro'))
			activate(injected)
	}, [activate])

	// set a flag if the user has passed the intro
	useEffect(() => {
		window?.sessionStorage.setItem('hasSeenIntro', true)
	}, [currentStep])

	const [ethBalance, setEthBalance] = useState()
	useEffect(() => {
		console.log('Getting Eth balance')
		if (library && account) {
			library
				.getBalance(account)
				.then(balance => {
					setEthBalance(parseFloat(formatEther(balance)).toPrecision(4))
				})
		}
	}, [library, account, chainId])

	function LinkWalletButton(props) {
		let account = props.account

		if (typeof(account) === 'undefined') {
			return <div className="flex flex-col justify-center space-y-3">
				<button 
					className="uppercase text-sm font-bold px-4 py-3 bg-zinc-200 active:bg-zinc-300 rounded-md"
					onClick={() => activate(injected)}
				>
					Connect
				</button>
				<p className="text-xs text-zinc-500 font-mono">Your wallet isn't linked</p>
			</div>
		}
		else if (typeof(account) !== 'undefined') {
			return <p className="text-green-600">Your wallet ending in {account.substring(account.length - 4)} is linked.</p>
		}
	}

	function SwitchNetworkButton(props) {
		let chainId = props.chainId

		if (chainId !== 42161 && chainId !== 421611) {
			return <div className="flex flex-col justify-center space-y-4">
				<button
					className="uppercase text-sm font-bold px-4 py-3 bg-zinc-200 active:bg-zinc-300 rounded-md"
					onClick={
						() => {
							window?.ethereum.request({
								id: 1,
								jsonrpc: "2.0",
								method: "wallet_addEthereumChain",
								params: [
									{
										chainId: "0xa4b1", // 42161
										chainName: "Arbitrum One",
										rpcUrls: ["https://arb1.arbitrum.io/rpc"],
										blockExplorerUrls: ["https://arbiscan.io/"]
									}
								]
							})
						}
					}>
					Connect to Arbitrum
				</button>
			</div>
		}
		else if (chainId === 42161 || chainId === 421611) {
			return <p className="text-green-600">Your wallet connected to Arbitrum successfully.</p>
		}
	}

	const [agreedToTerms, setAgreedToTerms] = useState(false)
	const legalAgreementLibrary = {
		metadata: {
			title: "Metadata",
			body: "The sound recording title, and associated cover art may be distributed by the tokenholder in relation to the work, but copyright is not conferred for these works.",
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
			body: "You agree that perpetual, irrevocable, and exclusive license to use the song will be transferred to tokenholders, until burned or otherwise determined through a social recovery mechanism, whereby rights are returned to the artist, or to the appropriate owner, respectively.",
			mutable: false,
		}
	}

	const mintStepPages = [
		{
			title: "Intro",
			body: <>Here you'll convert your sound recording copyright to tokens. Rights to the master and related royalties like those from streaming are conferred proportionately to holders of the new tokens. <br /><br /> You'll be walked through what's happening each step of the way. This process should take someone new to crypto 10-20 minutes.</>,
		},
		{
			title: "Link wallet",
			body: <>You need a crypto wallet to create, hold, and sell your tokens. <a className="underline" href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet" target="_blank">Learn more about crypto wallets here.</a> <br /><br /> Rightoken is optimized for the Coinbase Wallet app on <a href="https://apps.apple.com/us/app/coinbase-wallet/id1278383455" className="underline" target="_blank">iOS</a> and <a href="https://play.google.com/store/apps/details?id=org.toshi&hl=en_US&gl=US" className="underline" target="_blank">Android</a>. It's different from the standalone Coinbase app. <br /><br /> Once you download the app and create your wallet, return to this page in the in-app browser using the center icon on the bottom toolbar.</>,
			additionalContent: <LinkWalletButton account={account} />,
			successCondition: typeof(account) !== 'undefined',
		},
		{
			title: "Configure wallet",
			body: <>Rightoken is built on Arbitrum, a network that makes Ethereum much cheaper to use. <br /><br /> We'll connect your wallet to it now.</>,
			additionalContent: <SwitchNetworkButton chainId={chainId} />,
			successCondition: (chainId === 42161 || chainId === 421611),
		},
		{
			title: "Fund wallet",
			body: <>You need some Ethereum in your Arbitrum wallet to pay gas fees for using the blockchain. These do not go to Rightoken. <br /><br /> The easiest way to get some is to have a contact send it to you. <br /><br /> Otherwise, download the Crypto.com <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank">iOS</a> or <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank">Android</a> app, purchase at least 0.0064 ETH, and withdraw it to Arbitrum using your wallet address: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose px-2">{account}</span> Be sure you withdraw to Arbitrum to avoid extra fees. <br /><br /> If you already have Ethereum or could not withdraw to Arbitrum, you can also send that Ethereum to your new wallet and <a href="https://bridge.arbitrum.io/" className="underline" target="_blank">bridge it to Arbitrum</a>, but it'll cost more in gas fees. <br /><br /> {(chainId === 42161 || chainId === 421611) ? <span className={ethBalance > 0.005 && "text-green-500"}> Right now you have {ethBalance} ETH in your Arbitrum wallet.</span> : "Connect to the Arbitrum network using the previous page to check your balance here."}</>,
			successCondition: ethBalance > 0.005
		},
		{
			title: "Tokenholder terms",
			body: <>These are the terms of the tokenholder agreement. It outlines what holders of the newly created tokens are entitled to.</>,
			additionalContent: <>
				{Object.keys(legalAgreementLibrary).map(sectionKey => <>
					<p className="font-bold text-sm uppercase">{legalAgreementLibrary[sectionKey].title}</p>
					<p>{legalAgreementLibrary[sectionKey].body}</p>
					<br />
				</>)}
				<div className="flex space-x-2 justify-center">
					<input type="radio" name="agree" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
					<label for="agree">I agree</label>
				</div>
			</>,
			successCondition: agreedToTerms
		},
		{
			title: "Join Crescendao",
			body: <>Crescendao is a cooperative record label owned entirely by Rightoken artists who join in. Crescendao allows artists to pool their work, talent, efforts, and connections to lift each other up, while remaining truly independent. <br /><br /> This works by utilizing economies of scale, whereby an artist cannot achieve alone what a group of talented artists can easily accomplish together. In other words, the sum is greater than the individual parts. <br /><br /> What this functionally looks like is artists working together for cross-promotion, getting onto exclusive Spotify playlists, and pooling funds for distribution, marketing, and Rightoken maintenance. <br /><br /> Best yet, this costs nothing to artists. Membership is funded entirely by investor resales, a 4% fee paid by each investor on purchase of a Rightoken, put towards a communal pool, managed entirely by Rightoken artists and workers.</>,
		},
		{
			title: "Tokenize song",
			body: <>Here you'll </>,
		},
		{
			title: "List your tokens",
			body: <>Here you'll </>,
		},
		{
			title: "Share with fans",
			body: <>Here you'll </>,
		},
	]

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header linkTo="support" />

				<div className="py-12 mx-auto max-w-xs md:max-w-sm">
					<p className="text-xs text-zinc-500 font-bold text-center uppercase mb-3">{ mintStepPages[currentStep].title }</p>
					<p className="font-medium break-words">{ mintStepPages[currentStep].body }</p>
					{ mintStepPages[currentStep].additionalContent && 
						<>
							<br />
							<>{ mintStepPages[currentStep].additionalContent }</>
						</>
					}
					<p className="font-medium text-center mt-1">~</p>
					<div className="flex flex-row space-x-2 justify-center mt-4">
						{ currentStep > 0 &&
							<button className="text-sm font-medium px-3 py-1 active:bg-gray-200 rounded-md" onClick={() => setCurrentStep(currentStep-1)}>Back</button>
						}
						{ currentStep < mintStepPages.length-1 && (typeof(mintStepPages[currentStep].successCondition) === 'undefined' ? true : mintStepPages[currentStep].successCondition) &&
							<button className="text-sm font-medium px-3 py-1 active:bg-gray-200 rounded-md animate-pulse" onClick={() => setCurrentStep(currentStep+1)}>Next</button>
						}
						{ currentStep === mintStepPages.length-1 &&
							<button className="text-sm font-medium px-3 py-1 active:bg-green-200 rounded-md" onClick={() => alert("Congrats!")}>Finish</button>
						}
					</div>
					<p className="text-sm text-zinc-300 font-medium text-center mt-2">{Math.round(currentStep/(mintStepPages.length-1) * 100)}%</p>
				</div>
			</main>

			<Footer />
		</>
	)
}