import { Fragment } from 'react'

export default function Header(props) {
	const linkTo = props.linkTo

	// default to linkTo = "invest"
	let buttonText = "Invest in songs"
	if (linkTo === "artist") {
		buttonText = "Mint a song"
	}

	return (
		<div className="flex flex-row justify-between mx-auto max-w-xs md:max-w-lg">
			<a href="/">
				<img
					className="h-10 w-auto mt-4 md:mt-6"
					src="rightoken-logo.png"
					alt="rightoken logo"
				/>
			</a>
			{ linkTo && linkTo !== "support" &&
				<form action={"/"+linkTo}>
					<button className="uppercase font-medium md:text-lg border-r-2 border-b-2 border-l-2 border-gray-700 rounded-b-md px-4 py-2">{buttonText}</button>
				</form>
			}
			{ linkTo === "support" &&
				<p className="text-xs text-zinc-500 font-mono text-right underline mt-6 md:mt-8"><a href="https://discord.gg/QCmetTcbPj" target="_blank">Same-day help</a></p>
				
			}
		</div>
	)
}