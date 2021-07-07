async function main() {
	// We get the contract to deploy
	const Contact = await ethers.getContractFactory('TestVendor');
	console.log('Deploying...');
	const contract = await Contact.deploy();
	await contract.deployed();
	console.log('Deployed to:', contract.address);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});