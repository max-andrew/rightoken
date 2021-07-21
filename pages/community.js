import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import CommunityWidget from '../components/CommunityWidget'
import Footer from '../components/Footer'

export default function Home() {
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
							<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Community</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Companies aren't very punk rock.
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/community-graphic.svg"
									alt=""
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Rightoken is a community-first project built collaboratively by developers, artists, and music investors around the world. Rightoken as an organization exists as the interface between the network and traditional legal and corporate structures.
							</p>
						</div>

						<div className="mt-5 sm:mt-12 sm:flex sm:justify-center lg:justify-center">
							<div className="rounded-md shadow">
								<a
									href="/beta"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
								>
									Try it out
								</a>
							</div>
						</div>

						<div className="mt-16" id="widget">
							<CommunityWidget />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
