import { useState, createContext, useContext } from 'react'

export const AppContext = createContext()

export function AppWrapper({ children }) {
	const [sharedState, setSharedState] = useState({test: "heeelll77looos"})
	const value = {sharedState, setSharedState}

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}

export function setAppContext() {
	setSharedState("hello")
}

/* export function setAppContext() {
	<AppContext.Consumer>
		{({web3Context, setWeb3Context}) => (
			<button 
				onClick={() => setWeb3Context("HELLLO")} 
				style={{backgroundColor: themes.light.background}}
			>
				Switch Language (Current: {web3Context})
			</button>
		)}
	</AppContext.Consumer>
} */