import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { TrendingUpIcon, GlobeAltIcon, LightBulbIcon, ScaleIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import Footer from '../components/Footer'

const navigation = [
	{ name: 'Artists', href: '#' },
	{ name: 'Investors', href: '#' },
	{ name: 'Community', href: '#' },
	{ name: 'Marketplace', href: '#' },
]

const features = [
	{
		name: 'Exchange anywhere',
		description:
			'Rightoken is a place to mint, buy, and sell tokenized rights to music. But rightokens are fully owned by the tokenholder meaning they can be exchanged on any compatible marketplace as well.',
		icon: GlobeAltIcon,
	},
	{
		name: 'Democratic & transparent',
		description:
			'No constraining contracts with bureaucratic record labels. Own your own work and support artists directly. Master tracks are safely stored and accessible through the Rightoken cloud or blockchain.',
		icon: ScaleIcon,
	},
	{
		name: 'Comprehensible contracts',
		description:
			'The contracts that confer legal rights are written in plain English, so no legal team required. All legal backend is managed by Rightoken in-cloud or on-chain.',
		icon: LightBulbIcon,
	},
	{
		name: 'Build a portfolio',
		description:
			'Easily invest in a range of works with previously unprecedented access to an expanded and diversified portfolio.',
		icon: TrendingUpIcon,
	},
]

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
										src="/artists-hero.svg"
										alt=""
									/>
								</div>
								<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									By tokenizing rights, artists fund their work and keep control of the profits. Investors can share in the gains after finding the next hit.
								</p>
							</div>

							<div className="mt-10">
								<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
									{features.map((feature) => (
										<div key={feature.name} className="relative">
											<dt>
												<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
													<feature.icon className="h-6 w-6" aria-hidden="true" />
												</div>
												<p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
											</dt>
											<dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
										</div>
									))}
								</dl>
							</div>
							<div className="mt-5 sm:mt-12 sm:flex sm:justify-center lg:justify-center">
								<div className="rounded-md shadow">
									<a
										href="#"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
									>
										See how it works
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="py-12 bg-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="lg:text-center">
								<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Supporting Ensemble</h2>
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Don't miss a beat
								</p>
								<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									Connect with the Rightoken community and core team to stay up-to-date on progress, troubleshoot problems, and riff around.
								</p>
							</div>

							<div className="flex flex-col justify-center items-center space-x-0 space-y-4 mt-10 sm:space-x-2 sm:space-y-0 sm:flex-row sm:space-x-8">
								<div>
									<a 
										className="flex flex-col p-2 h-32 w-72 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-black overflow-hidden sm:h-48 sm:w-48 sm:p-4"
										href="https://reddit.com/r/rightoken"
										rel="_blank"
									>
										<p className="h-6 pt-2 pl-2 text-xl sm:pt-1 sm:pl-0 sm:text-2xl">Join the community</p>
										<img
											className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
											src="/reddit-logo.svg"
										/>
									</a>
								</div>
								<div>
									<a 
										className="flex flex-col p-2 h-36 w-72 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-black overflow-hidden sm:h-48 sm:w-48 sm:p-4"
										href="https://twitter.com/rightoken"
										rel="_blank"
									>
										<p className="h-6 pt-2 pl-2 text-xl sm:pt-1 sm:pl-0 sm:text-2xl">Get updates</p>
										<img
											className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
											src="/twitter-logo.svg"
										/>
									</a>
								</div>
								<div>
									<a 
										className="flex flex-col p-2 h-36 w-72 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-black overflow-hidden sm:h-48 sm:w-48 sm:p-4"
										href="https://discord.gg/AZcKByZZ7j"
										rel="_blank"
									>
										<p className="h-6 pt-2 pl-2 text-xl sm:pt-1 sm:pl-0 sm:text-2xl">Talk directly</p>
										<img
											className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
											src="/discord-logo.svg"
										/>
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
