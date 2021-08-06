import { useState } from 'react'

export default function Footer(props) {
	const sadverbs = ["with anxiety", "on a deadline", "apprehensively", "under duress", "poorly", "and rewritten"]

	const [sadverb, setSadverb] = useState(sadverbs[Math.floor(Math.random() * sadverbs.length)])

	return (
		<footer className="flex items-center justify-center w-full h-24 border-t">
			<a
				className="flex items-center justify-center"
				href="/"
				rel="noopener noreferrer"
			>
				<img src="/rightoken-wordmark.svg" alt="Rightoken Wordmark" className="h-6 mr-2" />
				{' '}Written {sadverb} in NYC
			</a>
		</footer>
	)
}