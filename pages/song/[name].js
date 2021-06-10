import Head from 'next/head'

import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../../components/Header'
import SongCard from '../../components/SongCard'
import RoundedLinkButton from '../../components/RoundedLinkButton'
import Footer from '../../components/Footer'

export default function Song(props) {
	const router = useRouter()
	const { name } = router.query

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
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Invest in { name }
								</p>
							</div>
						</div>
						<div className="min-w-xl mt-12 flex flex-row justify-center space-x-12">
							<SongCard />
							<RoundedLinkButton link="/beta" text="Connect your wallet" className="place-self-center" />
						</div>
					</div>

				</main>

				<Footer />
			</div>
		</div>
	)
}
