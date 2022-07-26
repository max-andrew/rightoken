import { Fragment } from 'react'

export default function Header(props) {
	const linkTo = props.linkTo

	// default to linkTo = "invest"
	let buttonText = "Invest in songs"
	if (linkTo === "artist") {
		buttonText = "Mint your song"
	}

	return (
		<>
			<div className="flex flex-row justify-between mx-auto z-40">
				<a className="mt-4" href="/">
					<img
						className="h-8 w-auto opacity-80"
						src="rightoken-logo.png"
						alt="rightoken logo"
					/>
				</a>
				{ linkTo && linkTo !== "support" &&
					<form action={"/"+linkTo}>
						<button className="uppercase text-xs md:text-sm text-zinc-400 font-bold border-r-2 border-b-2 border-l-2 border-zinc-400 rounded-b-md px-4 py-2 active:text-zinc-300 active:border-zinc-300">{buttonText}</button>
					</form>
				}
				{ linkTo === "support" &&
					<p className="text-xs text-zinc-500 font-mono text-right underline mt-0.5"><a href="https://discord.gg/QCmetTcbPj" target="_blank" rel="noreferrer">Same-day help</a></p>
					
				}
			</div>
		</>
	)
}