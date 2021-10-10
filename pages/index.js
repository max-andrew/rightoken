import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { TrendingUpIcon, GlobeAltIcon, LightBulbIcon, ScaleIcon } from '@heroicons/react/outline'

import CommunityWidget from '../components/CommunityWidget'
import Footer from '../components/Footer'

const navigation = [
	{ name: 'Artists', href: '/artist' },
	{ name: 'Community', href: '/community' },
	{ name: 'Marketplace', href: 'https://zora.co' },
]

const features = [
	{
		name: 'Exchange anywhere',
		description:
			'Rightoken is a place to mint, list, and view tokenized rights to music. But rightokens are fully owned by the tokenholder meaning they can be exchanged on any compatible marketplace as well.',
		icon: GlobeAltIcon,
	},
	{
		name: 'Democratic & transparent',
		description:
			'No constraining contracts with bureaucratic record labels. Own your own work and support artists directly. All Rightoken code is open-source and belongs to the community.',
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
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Popover className="relative overflow-hidden bg-white">
					{({ open }) => (
						<>
							<div className="max-w-7xl mx-auto">
								<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
									<svg
										className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
										fill="currentColor"
										viewBox="0 0 100 100"
										preserveAspectRatio="none"
										aria-hidden="true"
									>
										<polygon points="50,0 100,0 50,100 0,100" />
									</svg>

									<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
										<nav
											className="relative flex items-center justify-between sm:h-10 lg:justify-start"
											aria-label="Global"
										>
											<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
												<div className="flex items-center justify-between w-full md:w-auto">
													<a href="/">
														<span className="sr-only">Workflow</span>
														<img
															className="h-8 w-auto sm:h-10"
															src="/rightoken-logo.png"
														/>
													</a>
													<div className="-mr-2 flex items-center md:hidden">
														<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
															<span className="sr-only">Open main menu</span>
															<MenuIcon className="h-6 w-6" aria-hidden="true" />
														</Popover.Button>
													</div>
												</div>
											</div>
											<div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
												{navigation.map((item) => (
													<a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
														{item.name}
													</a>
												))}
												<a href="beta" className="font-medium text-purple-600 hover:text-purple-500">
													Beta test
												</a>
											</div>
										</nav>
									</div>

									<Transition
										show={open}
										as={Fragment}
										enter="duration-150 ease-out"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="duration-100 ease-in"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95"
									>
										<Popover.Panel
											focus
											static
											className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
										>
											<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
												<div className="px-5 pt-4 flex items-center justify-between">
													<div>
														<a href="/">
															<img
																className="h-8 w-auto"
																src="/rightoken-logo.png"
																alt=""
															/>
														</a>
													</div>
													<div className="-mr-2">
														<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
															<span className="sr-only">Close main menu</span>
															<XIcon className="h-6 w-6" aria-hidden="true" />
														</Popover.Button>
													</div>
												</div>
												<div className="px-2 pt-2 pb-3 space-y-1">
													{navigation.map((item) => (
														<a
															key={item.name}
															href={item.href}
															className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
														>
															{item.name}
														</a>
													))}
												</div>
												<a
													href="beta"
													className="block w-full px-5 py-3 text-center font-medium text-purple-600 bg-gray-50 hover:bg-gray-100"
												>
													Beta test
												</a>
											</div>
										</Popover.Panel>
									</Transition>

									<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
										<div className="sm:text-center lg:text-left">
											<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:max-w-lg">
												<span className="block xl:inline">The stock market</span>{' '}
												<span className="block text-purple-600 xl:inline">for music</span>
											</h1>
											<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
												Rightoken is a marketplace for legal rights to songs powered by the Rightoken community and secured by Ethereum. Sound recording copyrights and royalties are transferred to tokenholders who can sell their shares on any open market. 
											</p>
											<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
												<div className="rounded-md shadow">
													<a
														href="artist"
														className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
													>
														For artists
													</a>
												</div>
												<div className="mt-3 sm:mt-0 sm:ml-3">
													<a
														href="investor"
														className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
													>
														For investors
													</a>
												</div>
											</div>
										</div>
									</main>
								</div>
							</div>
							<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
								<img
									className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
									src="/musician.jpg"
									alt=""
								/>
							</div>
						</>
					)}
				</Popover>

				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Tokenized Rights</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								A key change in music
							</p>
							<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
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
									href="beta"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
								>
									Try it out
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="py-12">
					<CommunityWidget />
				</div>
			</main>

			<Footer />
		</>
	)
}
