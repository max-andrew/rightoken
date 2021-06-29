import { useEffect, useState } from 'react'

export default function useBlockNumber(library, chainId) {
	const [blockNumber, setBlockNumber] = useState()

	// set up block listener
	useEffect(() => {
		console.log('Getting block number')
		if (library) {
			let stale = false

			library.getBlockNumber()
			.then(blockNumber => {
				if (!stale) {
					setBlockNumber(blockNumber)
				}
			})
			.catch(() => {
				if (!stale) {
					setBlockNumber(null)
				}
			})

			const updateBlockNumber = blockNumber => {
				setBlockNumber(blockNumber)
			}
			library.on("block", updateBlockNumber)

			return () => {
				library.removeListener("block", updateBlockNumber)
				stale = true
				setBlockNumber(undefined)
			}
		}
	}, [library, chainId])

	return blockNumber
}