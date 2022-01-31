import Head from 'next/head'

import { Fragment, useState } from 'react'

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
			answer: "Sound recording copyright is the right to a song's master recording. A master is a recording of the underlying composition. After tokenizing, an artist maintains rights to the composition and may re-record or allow covers of the song.", 
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
			answer: "After tokenizing your song, you are given 100 tokens representing 100% of ownership. Each token has 18 decimal places, though, so a fan can invest in a tiny sliver of a song.", 
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
			answer: "Crypto is incidentally the best solution. Crypto gives artists total ownership by removing the need for a trusted third-party organization and will continue working even without active maintenance of Rightoken.", 
			flag: showWhyCrypto, 
			flagSetter: setShowWhyCrypto
		},
		{
			question: "Can I get a crypto crash course?", 
			answer: <a className="underline" href="/learn" target="_blank">Try this.</a>, 
			flag: showCrashCourse, 
			flagSetter: setShowCrashCourse
		},
		{
			question: "What does this cost?", 
			answer: <>Listing a song isn't free. It costs gas to create new tokens and list them on an exchange for fans to buy into. Gas fees do not go to Rightoken, but instead are the cost of using Ethereum. At off-peak hours the total cost per song should be under $20. <a className="underline" href="/learn" target="_blank">Learn more about crypto here.</a></>, 
			flag: showUseCost, 
			flagSetter: setShowUseCost
		},
		{
			question: "How does Rightoken make money?", 
			answer: "Rightoken is supported by Crescendao, an opt-in record label cooperative owned and managed by Rightoken artists.", 
			flag: showMeTheMoney, 
			flagSetter: setShowMeTheMoney
		},
	]

	return (
		<>
			<main>
				<Header /*linkTo="invest"*/ />

				<div className="py-12 mx-auto max-w-xs md:max-w-lg">
					<h2 className="font-bold text-3xl md:text-7xl text-gray-900">Ready to keep ownership of your work, <span className="text-gray-800">reap the benefits,</span> <span className="text-gray-700">and share them with fans?</span></h2>
					<p className="italic text-lg font-bold md:text-3xl text-gray-600 mt-2">Rightoken is building a market for music so you can cover rent and control your work</p>

					<FunkyButton className="mt-4" link="/mint" text="Ready" />

					<br />
					<br />

					<div id="faq">
						<p className="text-lg md:text-4xl">Here's answers to some things you might be wondering.</p>

						<br />

						<fieldset className="border-2 rounded border-gray-700 p-8">
							<legend className="font-mono md:text-lg">FAQs</legend>
							<div className="md:text-lg">
								{
									faqs.map((question, i) =>
										<>
											<p className="underline font-medium inline cursor-pointer" onClick={() => question.flagSetter(!question.flag)}>{question.question}</p>
											{ question.flag &&
												<p className="inline-block">{question.answer}</p>
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

			<Footer />
		</>
	)
}
