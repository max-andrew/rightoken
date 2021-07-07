import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import CommunityWidget from '../components/CommunityWidget'
import Footer from '../components/Footer'

export default function Home() {
	const iframe = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdRaG36o70M0bEqztSYGLLcInFwI2Iy7uWTUjMdyZ8o5ycl1A/viewform?embedded=true" width="640" height="1080" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>'

	function Iframe(props) {
		return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
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
										alt=""
									/>
								</div>
								<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									Rightoken is a tool to let artists keep control of their work and profits. 
									Artists can decide what amount of their rights they are willing to sell, have the option to buy their rights back, and are given the tools to write their own terms for the investment agreement. Rightoken empowers artists by letting them control monetization and ownership.
								</p>
								<p className="mt-6 max-w-2xl text-md text-gray-500 lg:mx-auto">
									By signing up below you agree you are the sole owner of the sound recording rights associated with the uploaded file. You agree that all rights will be transferred to tokenholders in proportion to outstanding tokens. This process can only be reverted if 100% of tokens are held by the publishing artist and are subsequently burned. After approval, 100% of tokenized rights for the song provided will be transferred to the wallet address provided for the artist to disburse, sell, or swap with any other user on the blockchain.
								</p>
							</div>

							<br />
							<br />

							<div className="flex justify-center">
								<Iframe iframe={iframe} />		
							</div>
						</div>
					</div>

				</main>

				<Footer />
			</div>
		</div>
	)
}
