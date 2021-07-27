import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Investor() {
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
							<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Investors</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								You knew this song before anyone.
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/investor-graphic.svg"
									alt=""
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Next time get paid for it. And support growing and independent artists while doing it. Rightoken allows independent investors to buy shares of a song recording and take a cut of the revenue from it.
							</p>
							<p className="mt-6 max-w-2xl text-md text-gray-500 lg:mx-auto">
								Any rightokens owned by your account will be visible here after successfully investing in a song.
							</p>
						</div>

						<div className="mt-5 sm:mt-12 sm:flex sm:justify-center lg:justify-center">
							<div className="rounded-md shadow">
								<a
									href="beta"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
								>
									Try it out
								</a>
							</div>
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
