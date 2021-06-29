import { useEffect, useState } from 'react'

export default function useActivatingConnector(connector) {
	const [activatingConnector, setActivatingConnector] = useState()

	// handle logic to recognize the connector currently being activated
	useEffect(() => {
		console.log('Identifying connector being activated')
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	return activatingConnector
}