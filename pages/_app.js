import '../styles/globals.css'
import Head from 'next/head'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
	return new Web3Provider(provider)
}

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/rightoken-white-logo.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/rightoken-white-logo-180.png" />
				<link rel="icon" type="image/png" sizes="64x64" href="/rightoken-white-logo-64.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/rightoken-white-logo-32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/rightoken-white-logo-16.png" />
			</Head>

			<Web3ReactProvider getLibrary={getLibrary}>
				<div className="bg-gradient-to-r from-purple-100 to-yellow-50 min-h-screen">
					<Component {...pageProps} />
				</div>
			</Web3ReactProvider>
		</>
	)
}

export default App
