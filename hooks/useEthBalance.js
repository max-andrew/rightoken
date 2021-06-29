import { useEffect, useState } from 'react'

export default function useEthBalance(library, account, chainId) {
	const [ethBalance, setEthBalance] = useState()

	// fetch eth balance of the connected account
	useEffect(() => {
		console.log('Getting Eth balance')
		if (library && account) {
			let stale = false

			library
				.getBalance(account)
				.then(balance => {
					if (!stale) {
						setEthBalance(balance)
					}
				})
				.catch(() => {
					if (!stale) {
						setEthBalance(null)
					}
				})

			return () => {
				stale = true
				setEthBalance(undefined)
			}
		}
	}, [library, account, chainId])

	return ethBalance
}