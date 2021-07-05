import { formatEther } from '@ethersproject/units'
import RoundedButton from './RoundedButton'

export default function Web3DebugPanel(props) {
	const chainId = props.chainId
	const blockNumber = props.blockNumber
	const account = props.account
	const ethBalance = props.ethBalance
	const library = props.library

	return (
		<div className="my-10 mx-auto p-4 shadow max-w-3xl">
			<h3
				style={{
					display: "grid",
					gridGap: "1rem",
					gridTemplateColumns: "1fr min-content 1fr",
					maxWidth: "20rem",
					lineHeight: "2rem",
					margin: "auto"
				}}
			>
				<span>Chain Id</span>
				<span role="img" aria-label="chain">
					⛓
				</span>
				<span>{chainId === undefined ? "..." : chainId}</span>

				<span>Block Number</span>
				<span role="img" aria-label="numbers">
					🔢
				</span>
				<span>
					{blockNumber === undefined
						? "..."
						: blockNumber === null
						? "Error"
						: blockNumber.toLocaleString()}
				</span>

				<span>Account</span>
				<span role="img" aria-label="robot">
					🤖
				</span>
				<span>
					{account === undefined
						? "..."
						: account === null
						? "None"
						: `${account.substring(0, 6)}...${account.substring(
								account.length - 4
							)}`}
				</span>

				<span>Balance</span>
				<span role="img" aria-label="gold">
					💰
				</span>
				<span>
					{ethBalance === undefined
						? "..."
						: ethBalance === null
						? "Error"
						: `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
				</span>
			</h3>
			<br />
			{!!(library && account) && (
				<RoundedButton 
					onClick={() => {
						library
						.getSigner(account)
						.signMessage("👋")
						.then(signature => {
							window.alert(`Success!\n\n${signature}`)
						})
						.catch(error => {
							window.alert(
								"Failure!" +
									(error && error.message ? `\n\n${error.message}` : "")
							)
						})
					}}
					textClassName="text-sm font-bold" 
					text="Sign Message"
					className="w-1/4 m-auto"
				/>
			)}
		</div>
	)
}