import Head from 'next/head'

import { Fragment, useEffect, useState, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedLinkButton from '../components/RoundedLinkButton'
import RoundedButton from '../components/RoundedButton'
import Footer from '../components/Footer'

import { enable, openQR, providerinfo, disconnect } from "../functions/walletConnect.js"

import Web3 from "web3"
import { web3Modal } from "../functions/Web3Modal.js"

export default function Beta(props) {
	const [provider, setProvider] = useState("")
	const [web3, setWeb3] = useState("")

	useEffect(() => {
		if (web3 === "" && provider !== "") {
			setWeb3(new Web3(provider))
		}
	})

	const getAccount = async () => {
		if (web3 === "")
			return ""

		const accounts = await web3.eth.getAccounts()
		return accounts[0]
	}

	const disconnect = async () => {
		if (web3 === "")
			return ""

		provider.disconnect()
		.then(setWeb3(""))
	}

	return (
		<div>
			<div>

				<Head>
					<title>Rightoken</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<Header />

					<div className="py-12 bg-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Join the beta test { }
								</p>
						</div>

						<div className="mt-16 max-w-md md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-x-10 md:gap-x-8 gap-y-6 md:gap-y-16 self-center justify-items-center text-center md:text-left m-auto">
							<p className="text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
								1.
							</p>
							<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
								<p className="text-2xl font-semibold">
									Download a crypto wallet
								</p>
								<p className="text-sm font-mono">
									The MetaMask app is how you store your rightokens independently of the organization. Other wallets might work, but aren't yet fully supported.
								</p>
							</div>
							<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-4">
								<RoundedLinkButton link="https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=930587986804252278" textClassName="text-sm font-bold" text="For iOS" />
								<RoundedLinkButton link="https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=930682544992985021" className="bg-purple-400 hover:bg-purple-500" textClassName="text-sm font-bold" text="For Android" />
							</div>

							<p className="mt-10 text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
								2.
							</p>
							<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
								<p className="text-2xl font-semibold">
									Connect your wallet
								</p>
								<p className="text-sm font-mono">
									Hit Connect and use your phone camera to scan the QR code.
								</p>
							</div>
							<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
								<RoundedButton onClick={() => web3Modal.connect().then(p => setProvider(p)).catch(e => console.log(e))} textClassName="text-sm font-bold" text="Connect wallet" />
								<RoundedButton onClick={() => getAccount().then(x => console.log(x))} textClassName="text-sm font-bold" text="Test" />
								<RoundedButton onClick={() => disconnect()} className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
							</div>

							<p className="mt-10 text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
								3.
							</p>
							<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
								<p className="text-2xl font-semibold">
									Start investing
								</p>
								<p className="text-sm font-mono">
									Support growing artists and build your portfolio. Browse rightokens on the market now at the marketplace.
								</p>
							</div>
							<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
								<RoundedLinkButton link="/marketplace" text="Invest now" textClassName="text-sm font-bold" />
							</div>
						</div>
					</div>

				</main>

				{/*<Footer />*/}
			</div>
		</div>
	)
}
