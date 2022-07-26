export default function SwitchNetworkButton(props) {
	return <>
		<div className="flex flex-col justify-center space-y-2">
			{ chainId !== networkDefaults.mainnet.id &&
				<button
					className={`uppercase font-bold mix-blend-multiply ${chainId === networkDefaults.testnet.id ? "text-xs text-zinc-700 px-3 py-2 text-zinc-400 active:bg-zinc-200" : "text-sm px-4 py-3 bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100"} active:text-zinc-500 rounded-md`}
					onClick={
						async () => {
							try {
								await library.provider.request({
									method: "wallet_switchEthereumChain",
									params: [{ chainId: `0x${networkDefaults.mainnet.id.toString(16)}` }]
								})
							}
							catch (e) {
								await library.provider.request({
									method: "wallet_addEthereumChain",
									params: [
										{
											chainId: `0x${networkDefaults.mainnet.id.toString(16)}`, // 10
											chainName: networkDefaults.mainnet.name,
											rpcUrls: [networkDefaults.mainnet.rpc_url],
											blockExplorerUrls: [networkDefaults.mainnet.block_explorer_url]
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
					Connect to {networkDefaults.mainnet.name}
				</button>
			}
			{ chainId !== networkDefaults.testnet.id &&
				<button
					className="uppercase text-xs font-bold px-3 py-2 text-zinc-400 mix-blend-multiply active:bg-zinc-200 rounded-md"
					onClick={
						async () => {
							try {
								await library.provider.request({
									method: "wallet_switchEthereumChain",
									params: [{ chainId: `0x${networkDefaults.testnet.id.toString(16)}` }]
								})
							}
							catch (e) {
								await library.provider.request({
									method: "wallet_addEthereumChain",
									params: [
										{
											chainId: `0x${networkDefaults.testnet.id.toString(16)}`,
											chainName: networkDefaults.testnet.name,
											rpcUrls: [networkDefaults.testnet.rpc_url],
											blockExplorerUrls: [networkDefaults.testnet.block_explorer_url]
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
		{ (chainId === networkDefaults.mainnet.id || chainId === networkDefaults.testnet.id) && 
			<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  Your wallet connected to {chainId === networkDefaults.testnet.id && "test"} {networkDefaults.mainnet.name} </p></div>
		}
	</>
}