import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import SongCard from '../components/SongCard'
import RoundedLinkButton from '../components/RoundedLinkButton'
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
								<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Marketplace</h2>
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Explore and invest in the next chart-toppers.
								</p>
								<div className="mt-8 w-full text-center flex items-center justify-center">
									<img
										className="h-auto w-52"
										src="/artist-graphic.svg"
										alt=""
									/>
								</div>
								<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									Support growing artists by sharing ownership over song recordings. <a className="underline" href="/investor">Learn more about how investors can build a portfolio of songs.</a> <a className="underline" href="/artist">Or how artists can flexibly fund their work and stay independent.</a>
								</p>
							</div>

							<div className="mt-16 md:mt-22 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 lg:gap-x-6 lg:gap-y-14">
								<SongCard song="Crush" artist="Ekaynuh" price=".03" />
								<SongCard song="Space" artist="Ekaynuh" price=".01" />
								<SongCard song="My Baby (Went Over the River)" artist="Sienna Daviau" price=".3" link="mybaby" />
								<SongCard />
								<SongCard song="List your song" artist="You" price="0" link="../artist" img="./tulip.jpg" />
							</div>

						</div>
					</div>

				</main>

				<Footer />
			</div>
		</div>
	)
}
