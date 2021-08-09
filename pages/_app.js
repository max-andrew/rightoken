import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
	return new Web3Provider(provider)
}

function App({ Component, pageProps }) {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<div className="bg-gradient-to-r from-purple-100 to-yellow-50">
				<Component {...pageProps} />
			</div>
		</Web3ReactProvider>
	)
}

export default App
