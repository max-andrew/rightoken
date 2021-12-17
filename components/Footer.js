import { useState } from 'react'

export default function Footer(props) {
	const sadverbs = ["with anxiety", "on a deadline", "nervously", "under duress", "poorly", "and rewritten", "through tears"]

	const [sadverb, setSadverb] = useState(sadverbs[Math.floor(Math.random() * sadverbs.length)])

	return (
		<footer className="flex items-center justify-center w-full h-24 border-t">
			<img src="/rightoken-wordmark.svg" alt="Rightoken Wordmark" className="h-5 mr-2" />
			<p className="text-sm">Written {sadverb} in NYC</p>
		</footer>
	)
}