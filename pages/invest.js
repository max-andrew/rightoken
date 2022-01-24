import Head from 'next/head'

import { Fragment } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Invest() {
	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header linkTo="artist" />

				<div className="py-12 mx-auto max-w-xs md:max-w-md">
				
				</div>
			</main>

			<Footer />
		</>
	)
}