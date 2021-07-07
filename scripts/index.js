async function main() {
	// Set up an ethers contract, representing our deployed Contract instance
	const address = '0x5d6894d063917aeAD69135C19745C81393dcB9D5';
	const Contract = await ethers.getContractFactory('UnspokenRightoken');
	const contract = await Contract.attach(address);

	// Send a transaction to store() a new value in the Contract
	await contract;
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
