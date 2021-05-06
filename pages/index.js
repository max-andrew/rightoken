import Head from 'next/head'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { TrendingUpIcon, GlobeAltIcon, LightBulbIcon, ScaleIcon } from '@heroicons/react/outline'

const navigation = [
	{ name: 'How it works', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
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
					<Popover className="relative bg-white overflow-hidden">
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
														<a href="#">
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
													<a href="#" className="font-medium text-purple-600 hover:text-purple-500">
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
															<img
																className="h-8 w-auto"
																src="/rightoken-logo.png"
																alt=""
															/>
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
														href="#"
														className="block w-full px-5 py-3 text-center font-medium text-purple-600 bg-gray-50 hover:bg-gray-100"
													>
														Beta test
													</a>
												</div>
											</Popover.Panel>
										</Transition>

										<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
											<div className="sm:text-center lg:text-left">
												<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
													<span className="block xl:inline">The stock market</span>{' '}
													<span className="block text-purple-600 xl:inline">for music</span>
												</h1>
												<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
													Rightoken is a marketplace for legal rights to songs. Copyright and distribution rights are fully transferred to tokenholders who can sell their share on an open market at any time. 
												</p>
												<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
													<div className="rounded-md shadow">
														<a
															href="#"
															className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
														>
															Join beta test waitlist
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

					<div className="py-12 bg-white">
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

				<footer className="flex items-center justify-center w-full h-24 border-t">
					<a
						className="flex items-center justify-center"
						href="/"
						rel="noopener noreferrer"
					>
						<img src="/rightoken-wordmark.svg" alt="Rightoken Wordmark" className="h-6 mr-2" />
						{' '}Composed in NYC
					</a>
				</footer>
			</div>
		</div>
	)
}
