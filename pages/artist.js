import { Fragment, useState } from 'react'

import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

import FunkyButton from '../components/FunkyButton'

export default function Artist() {
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

	return (
		<>
			<Head>
				<title>Support from Fans</title>
			</Head>
			<div className="mx-auto max-w-xs md:max-w-lg">
				<Header linkTo="invest" />
				<main>
					<div className="absolute right-0 top-20 bg-gradient-to-r from-inherit via-red-50 to-purple-100 h-20 w-10/12 md:w-4/12" />
					<div className="py-9 relative z-10">
						<h2 className="font-bold text-3xl md:text-4xl text-gray-900 max-w-xs md:max-w-md">Ready to keep ownership of your work, <span className="text-gray-800">reap the benefits,</span> <span className="text-gray-700">and share them with fans?</span></h2>
						<p className="font-bold text-lg md:text-2xl text-gray-600 max-w-xs md:max-w-md mt-2">Rightoken is building a stock market for songs so you can cover rent and control your work</p>

						<FunkyButton className="mt-4" link="/mint" text="Ready" />

						<br />
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
						</div>

						<br />

						<FunkyButton link="/mint" text="Start" />
					</div>
				</main>
			</div>

			<Footer />
		</>
	)
}
