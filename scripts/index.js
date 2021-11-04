async function main() {
	// Set up an ethers contract, representing our deployed Contract instance
	const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
	const Contract = await ethers.getContractFactory('ERC20Rightoken');
	const contract = await Contract.attach(address);

	// Send a transaction to store() a new value in the Contract
	await contract;
	console.log(await contract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"))
	console.log(await contract.decimals())
	console.log(await contract.symbol())
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
