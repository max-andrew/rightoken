import Head from 'next/head'

import { Fragment } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Learn() {
	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header linkTo="artist" />

				<div className="py-12 mx-auto max-w-xs md:max-w-md">
					<h3>Crypto crash course</h3>
					{
						/*
							[using #ANCHORS]
							
							ethereum
							wallet
							keys
							gas
								timing (off peak hours)
							tokens
							optimism
								roll ups
						*/
					}
				</div>
			</main>

			<Footer />
		</>
	)
}