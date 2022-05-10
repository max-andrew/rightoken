
export default function SwitchNetworkButton(props) {
	const chainId = props.chainId
	const library = props.library

	return <>
		<div className="flex flex-col justify-center space-y-2">
			{ chainId !== 42161 &&
				<button
					className={`uppercase text-sm font-bold px-4 py-3 mix-blend-multiply ${chainId === 421611 ? "bg-zinc-200" : "bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100"} text-zinc-700 active:text-zinc-500 rounded-md`}
					onClick={
						async () => {
							try {
								await library.provider.request({
									method: "wallet_switchEthereumChain",
									params: [{ chainId: "0xa4b1" }]
								})
							}
							catch (e) {
								console.dir(`error occured ${e}`)
								await library.provider.request({
									method: "wallet_addEthereumChain",
									params: [
										{
											chainId: "0xa4b1", // 42161
											chainName: "Arbitrum One",
											rpcUrls: ["https://arb1.arbitrum.io/rpc"],
											blockExplorerUrls: ["https://arbiscan.io/"]
										}
									]
								})
							}
							finally {
								console.dir(`finally occured`)
								location.reload() // for MetaMask mobile app
							}
						}
					}
				>
					Connect to Arbitrum
				</button>
			}
			{ chainId !== 421611 &&
				<button
					className="uppercase text-xs font-bold px-3 py-2 text-zinc-400 mix-blend-multiply active:bg-zinc-200 rounded-md"
					onClick={
						async () => {
							try {
								await library.provider.request({
									method: "wallet_switchEthereumChain",
									params: [{ chainId: "0x66eeb" }]
								})
							}
							catch (e) {
								await library.provider.request({
									method: "wallet_addEthereumChain",
									params: [
										{
											chainId: "0x66eeb", // 421611
											chainName: "Arbitrum Testnet",
											rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
											blockExplorerUrls: ["https://testnet.arbiscan.io/#/"]
										}
									]
								})
							}
							finally {
								location.reload() // for MetaMask mobile app
							}
						}
					}
				>
					Use in test mode
				</button>
			}
		</div>
		<br />
		{ (chainId === 42161 || chainId === 421611) && 
			<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  Your wallet connected to {chainId === 421611 && "test"} Arbitrum</p></div>
		}
	</>
}