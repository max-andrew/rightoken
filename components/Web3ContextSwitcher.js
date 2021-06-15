import React, { useContext } from "react"

import {themes, Web3Context} from "./Web3Context"

const Web3ContextSwitcher = () => {
	const { web3Context, setWeb3Context } = useContext(Web3Context)

	return (
		<Web3Context.Consumer>
			{({web3Context, setWeb3Context}) => (
				<button 
					onClick={setWeb3Context({web3Context:"HELLLO"})} 
					style={{backgroundColor: themes.light.background}}
				>
					Switch Language (Current: {web3Context})
				</button>
			)}
		</Web3Context.Consumer>
	)
}

export default Web3ContextSwitcher