export default function LinkWalletButton(props) {
	const account = props.account
	const activate = props.activate
	const injected = props.injected
	const walletconnect = props.walletconnect

	console.dir(walletconnect)

	if (typeof(window?.ethereum) === "undefined") {
		return <div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-red-500 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-red-500 animate-ping" />  Return to this page in your wallet</p></div>
	}
	else if (typeof(account) === "undefined") {
		return <div className="flex flex-col justify-center space-y-3">
			<button 
				className="uppercase text-sm font-bold px-4 py-3 mix-blend-multiply bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100 text-zinc-700 active:text-zinc-500 rounded-md"
				onClick={() => {
					window?.sessionStorage.setItem("hasLinkedWallet", true)
					activate(injected)
				}}
			>
				Connect
			</button>
			<p className="text-xs text-zinc-500 font-mono text-center">Your wallet isn't linked</p>
		</div>
	}
	else if (typeof(account) !== "undefined") {
		return <div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  Your wallet ending in {account.substring(account.length - 4)} is linked</p></div>
	}
}