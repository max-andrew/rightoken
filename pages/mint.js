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

	// eagerly connect wallet
	useEffect(() => {
		activate(injected)
	}, [activate])

	const [ethBalance, setEthBalance] = useState(0.0)
	useEffect(() => {
		if (library && account) {
			console.log('Getting Eth balance...')
			library
				.getBalance(account)
				.then(balance => {
					console.log('Balance:', parseFloat(formatEther(balance)).toPrecision(4))
					setEthBalance(parseFloat(formatEther(balance)).toPrecision(4))
				})
		}
	}, [chainId])

	const [currentStep, setCurrentStep] = useState(0)
	// initialize currentStep to most recent step on page reload
	useEffect(() => {
		let currentStepInSessionStorage = 0

		if (typeof(window?.sessionStorage.getItem('currentStep')) === null) {
			window?.sessionStorage.setItem('currentStep', currentStepInSessionStorage)
		}
		else {
			currentStepInSessionStorage = window?.sessionStorage.getItem('currentStep')
		}

		setCurrentStep(parseInt(currentStepInSessionStorage))
	}, [])

	useEffect(() => {
		window?.sessionStorage.setItem('currentStep', currentStep)
		window?.scrollTo(0, 0)
	}, [currentStep])

	const [percentListed, setPercentListed] = useState()
	const [marketCap, setMarketCap] = useState()
	const [invalidTokenPriceInfo, setInvalidTokenPriceInfo] = useState(false)
	// validate forms
	useEffect(() => {
		// percentListed exists and is within range, and marketCap exists and is within range
		if (((percentListed !== "" && typeof(percentListed) !== 'undefined') && (percentListed < 0 || percentListed > 100)) || ((marketCap !== "" && typeof(marketCap) !== 'undefined') && (marketCap < 0 || marketCap > 1000000))) {
			setInvalidTokenPriceInfo(true)
		}
		else if ((percentListed === "" && marketCap === "") && (typeof(percentListed) === 'undefined' && typeof(marketCap) === 'undefined')) {
			setInvalidTokenPriceInfo(false)
		}
		else {
			setInvalidTokenPriceInfo(false)
		}
	}, [percentListed, marketCap])


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
			return <div className="flex flex-col justify-center space-y-2">
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
				<button 
					className="uppercase text-xs font-bold px-3 py-2 text-zinc-600 active:bg-zinc-200 rounded-md"
					onClick={
						() => {
							window?.ethereum.request({
								id: 1,
								jsonrpc: "2.0",
								method: "wallet_addEthereumChain",
								params: [
									{
										chainId: "0x66eeb", // 421611
										chainName: "Arbitrum Testnet",
										rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
										blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"]
									}
								]
							})
						}
					}>
					Use in test mode
				</button>
			</div>
		}
		else if (chainId === 42161 || chainId === 421611) {
			return <p className="text-green-600">Your wallet connected to Arbitrum {chainId === 421611 && "testnet"} successfully.</p>
		}
	}

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
			body: "You agree that global, perpetual, and exclusive license to use the sound recording will be transferred to tokenholders, until burned or otherwise determined through a social recovery mechanism, whereby rights are returned to the artist, or to the appropriate owner, respectively.",
			mutable: false,
		},
		upgrade: {
			title: "upgradability",
			body: "The artist may upgrade the outstanding tokens to enable new features or technical maintenance. These new tokens will be sent directly to each wallet in proportion to the current tokens, rendering the current tokens void and obsolete. The artist must make reasonable efforts to inform tokenholders of the upgrade until a Rightoken tool is available to validate and locate the current version of any current or past Rightoken ERC-20.",
			mutable: false,
		},
		delist: {
			title: "delisting",
			body: "The artist may also delist outstanding Rightoken ERC-20, effectively reversing the process of tokenization, by crediting the addresses of holders with equal value of a reasonably fungible, recognized, and established alternative token.",
			mutable: false,
		}
	}

	const [agreedToTerms, setAgreedToTerms] = useState(false)
	const [joinCrescendao, setJoinCrescendao] = useState(true)
	const [songTitle, setSongTitle] = useState("")
	const [artistName, setArtistName] = useState("")
	const [songIsTokenized, setSongIsTokenized] = useState(false)
	const [songIsListed, setSongIsListed] = useState(false)
	const mintStepPages = [
		{
			title: "Intro",
			body: <>Here you'll convert your sound recording copyright to tokens and get a link to share with fans to invest. <br /><br /> Rights to the master and associated royalties like those from streaming are conferred proportionately to holders of the new tokens. <br /><br /> You'll be walked through what's happening each step of the way. This should take someone new to crypto 10-20 minutes.</>,
		},
		{
			title: "Link wallet",
			body: <>You need a crypto wallet to create, hold, and sell your tokens. <a className="underline" href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet" target="_blank">Learn more about crypto wallets here.</a> <br /><br /> Rightoken is optimized for the Coinbase Wallet app on <a href="https://apps.apple.com/us/app/coinbase-wallet/id1278383455" className="underline" target="_blank">iOS</a> and <a href="https://play.google.com/store/apps/details?id=org.toshi&hl=en_US&gl=US" className="underline" target="_blank">Android</a>. It's different from the standalone Coinbase app. <br /><br /> Download the app, create your wallet, and return to this page in the in-app browser.</>,
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
			body: <>You need Ethereum in your Arbitrum wallet to pay blockchain gas fees for creating your tokens. The fees don't go to Rightoken. <br /><br /> Download the Crypto.com <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank">iOS</a> or <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank">Android</a> app, purchase at least 0.006 ETH, and to avoid extra fees, be sure to withdraw to Arbitrum using your wallet address: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose px-2">{account}</span> <br /><br /> If you have Ethereum not on Arbitrum, you can send it to your new wallet and <a href="https://bridge.arbitrum.io/" className="underline" target="_blank">bridge to Arbitrum</a>, but it'll cost more in gas fees. <br /><br /> {(chainId === 42161 || chainId === 421611) ? <span className={ethBalance > 0.005 ? "text-green-600" : undefined}> You have {ethBalance} ETH in your Arbitrum wallet.</span> : "Connect to the Arbitrum network using the previous page to check your balance here."}</>,
			successCondition: ethBalance > 0.005
		},
		{
			title: "Tokenholder terms",
			body: <>These are the terms of the tokenholder agreement. It outlines what holders of the newly created tokens are entitled to.</>,
			additionalContent: <>
					{Object.keys(legalAgreementLibrary).map(sectionKey => <div key={sectionKey}>
						<p className="font-bold text-sm uppercase tracking-wider text-zinc-700">{legalAgreementLibrary[sectionKey].title}</p>
						<p>{legalAgreementLibrary[sectionKey].body}</p>
						<br />
					</div>)}
					<div className="flex justify-center">
						<div className="inline-flex appearance-none align-baseline space-x-2 px-3 py-1 active:bg-gray-200 rounded-md select-none" onClick={() => setAgreedToTerms(!agreedToTerms)}>
							<input type="radio" name="agree" checked={agreedToTerms} readOnly />
							<label className="text-sm font-medium" htmlFor="agree">I agree</label>
						</div>
					</div>
				</>,
			successCondition: agreedToTerms
		},
		{
			title: "Invitation to Crescendao",
			body: <>Crescendao is a cooperative owned by select Rightoken artists. It manages a pool of resources traditionally offered by labels. Artists can access these for backing while staying truly independent. <br /><br /> These resources include promotion, like getting onto exclusive Spotify playlists, copyright enforcement, production help, and cash loans or advances. <br /><br /> Crescendao also owns Rightoken, with its worker-owners directing and supporting its maintenance and upgrades. <br /><br /> Joining costs nothing to artists. Membership is funded entirely by investor resales, a 4% fee paid by an investor when purchasing rightokens. This resale fee directly funds the communal Crescendao treasury for the benefit of Crescendao artists.</>,
			additionalContent: <>
					<div className="flex justify-center">
						<div className="inline-flex appearance-none align-baseline space-x-2 px-3 py-1 active:bg-gray-200 rounded-md select-none" onClick={() => setJoinCrescendao(!joinCrescendao)}>
							<input type="radio" name="join" checked={joinCrescendao} readOnly />
							<label className="text-sm font-medium" htmlFor="join">Join</label>
						</div>
					</div>
				</>
		},
		{
			title: "Tokenize song",
			body: <>You're finally ready to tokenize your song.</>,
			additionalContent: <>
					{ !songIsTokenized &&
						<div className="border-2 border-zinc-300 rounded-md py-8 space-y-9">
							<div>
								<p className="tracking-widest text-center font-medium text-xl text-zinc-400 uppercase mb-2">• Presenting •</p>
								<input className="flex bg-transparent font-medium text-2xl border-b-2 outline-none placeholder:text-zinc-500 text-zinc-700 text-center mx-auto" spellCheck="false" placeholder="Song Title" value={songTitle} onChange={e => setSongTitle(event.target.value)} />
							</div>
							<div>
								<p className="tracking-wide text-center font-medium text-sm text-zinc-400 uppercase mb-2">by the illustrious ☟</p>
								<input className="flex bg-transparent font-medium text-xl border-b-2 outline-none placeholder:text-zinc-500 text-zinc-700 text-center mx-auto" spellCheck="false" placeholder="Artist Name" value={artistName} onChange={e => setArtistName(event.target.value)} />
							</div>
						</div>
					}
					{ (!songIsTokenized && songTitle !== "" && artistName !== "") && 
						<>
							<br />
							<div className="flex flex-col justify-center space-y-4">
								<button
									className="uppercase text-sm font-bold px-4 py-3 bg-zinc-200 active:bg-zinc-300 rounded-md"
									onClick={() => setSongIsTokenized(true)}>
									Tokenize now
								</button>
							</div>
						</>
					}
					{ songIsTokenized &&
						<p className="font-medium text-green-600">{songTitle} was tokenized successfully.</p>
					}
				</>,
			successCondition: songIsTokenized
		},
		{
			title: "List your tokens",
			body: <>Now you have the option to list your tokens. This is how you'll make your tokens available for fans to invest. Set an asking price as well as the total valuation for 100% of ownership.</>,
			additionalContent: <>
					{ !songIsListed &&
						<>
							<div className={`border-2 rounded-md py-8 space-y-9 ${invalidTokenPriceInfo ? "border-red-300" : "border-zinc-300"}`}>
								<div>
									<p className="tracking-widest text-center font-medium text-xl text-zinc-400 uppercase mb-2">initially offering</p>
									<div className="flex flex-row space-x-2 justify-center">
										<input className="flex bg-transparent font-medium text-3xl border-b-2 outline-none placeholder:text-zinc-500 text-zinc-700 text-center w-24" spellCheck="false" type="number" min="0" max="100" step="0.5" placeholder="20" value={percentListed} onChange={e => setPercentListed(event.target.value)} />
										<p className="font-bold text-xl text-zinc-400">%</p>
									</div>
								</div>
								{ Number(percentListed) !== 0 &&
									<div className="space-y-2">
										<p className="tracking-wide text-center font-medium text-sm text-zinc-400 uppercase">with a <span className="text-xs text-zinc-300">(very reasonable)</span> valuation of</p>
										<div className="flex flex-row space-x-1 justify-center">
											<p className="font-medium text-2xl text-zinc-400">$</p>
											<input className="flex bg-transparent font-medium text-xl border-b-2 outline-none placeholder:text-zinc-500 text-zinc-700 text-center w-28" spellCheck="false" type="number" min="0" max="1000000" step="50" placeholder="80000" value={marketCap} onChange={e => setMarketCap(event.target.value)} />
											<p className="font-bold text-sm text-zinc-400">USD</p>
										</div>
										<p className="text-center font-mono text-xs text-zinc-300">for 100%</p>
									</div>
								}
							</div>
						</>
					}
					{ (!songIsListed && typeof(percentListed) !== 'undefined' && typeof(marketCap) !== 'undefined' && !invalidTokenPriceInfo) && 
						<>
							<br />
							<div className="flex flex-col justify-center space-y-4">
								<button
									className="uppercase text-sm font-bold px-4 py-3 bg-zinc-200 active:bg-zinc-300 rounded-md"
									onClick={() => setSongIsListed(true)}>
									List now
								</button>
							</div>
						</>
					}
					{ songIsListed &&
						<p className="font-medium text-green-600">{songTitle} was listed successfully.</p>
					}
				</>,
			successCondition: (songIsListed || Number(percentListed) === 0)
		},
		{
			title: "Share with fans",
			body: <>
					Your song is tokenized and ready to share!&nbsp;
					{ songIsListed &&
						<>
							Your link is available here: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose px-2">{account}</span>
							<br /><br /> 
							This is how fans will be able to buy into your work and you'll be able to get capital for it. Make sure to save this link.
						</>
					}
				</>,
		},
	]

	return (
		<>
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
					<p className="font-medium text-center mt-1 select-none">~</p>
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