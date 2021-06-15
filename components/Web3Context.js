import React from "react"

export const themes = {
	light: {
		foreground: '#000000',
		background: '#eeeeee',
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222',
	},
};

export const Web3Context = React.createContext({
	web3Context: "hi608708736",
	setWeb3Context: () => {}
})

export default Web3Context