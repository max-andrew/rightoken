import { useState } from 'react'

export default function Footer(props) {
	const sadverbs = ["with anxiety", "on a deadline", "nervously", "under duress", "poorly", "and rewritten", "through tears"]

	const [sadverb, setSadverb] = useState(sadverbs[Math.floor(Math.random() * sadverbs.length)])

	return (
		<footer className="flex flex-col space-y-2 items-center justify-center w-full h-24 border-t">
			<p className="text-xs font-medium text-zinc-600" suppressHydrationWarning>Written {sadverb} in NYC & Lisbon</p>
			<img src="/rightoken-wordmark.svg" alt="Rightoken Wordmark" className="h-5 opacity-80" />
		</footer>
	)
}