import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import CommunityWidget from '../components/CommunityWidget'
import Footer from '../components/Footer'

export default function Home() {
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
									By tokenizing rights, artists fund their work and keep control of the profits. Investors can share in the gains after finding the next hit.
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
			</div>
		</div>
	)
}
