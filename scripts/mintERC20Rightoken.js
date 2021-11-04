async function main(tokenName, tokenSymbol) {
	// We get the contract to deploy
	const Contact = await ethers.getContractFactory('ERC20Rightoken')
	console.log('Deploying...')
	let contract = await Contact.deploy(tokenName, tokenSymbol)
	await contract.deployed()
	console.log('Deployed to:', contract.address)

	// Set up an ethers contract, representing our deployed Contract instance
	const address = contract.address;
	const Contract = await ethers.getContractFactory('ERC20Rightoken');
	contract = await Contract.attach(address);

	console.log(`Successfully deployed: (${await contract.name()} | ${await contract.symbol()})`)
	typeof(window) !== "undefined" && 
		console.log(`You own: ${await contract.balanceOf(window.ethereum.selectedAddress)}`)
}

export default function mintERC20Rightoken(tokenName, tokenSymbol) {
	main(tokenName, tokenSymbol)
		.then(() => process.exit(0))
		.catch(error => {
			console.error(error)
			process.exit?.(1)
		})
}