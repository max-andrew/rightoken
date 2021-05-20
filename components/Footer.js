import React from "react"

export default function Footer(props) {
	return (
		<footer className="flex items-center justify-center w-full h-24 border-t">
			<a
				className="flex items-center justify-center"
				href="/"
				rel="noopener noreferrer"
			>
				<img src="/rightoken-wordmark.svg" alt="Rightoken Wordmark" className="h-6 mr-2" />
				{' '}Written in NYC
			</a>
		</footer>
	)
}