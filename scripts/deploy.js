import { ethers } from 'ethers'

async function main() {
	// We get the contract to deploy
	const Contact = await ethers.getContractFactory('ChildMintableERC721')
	console.log('Deploying...')
	const contract = await Contact.deploy("hello","HFT","0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7")
	await contract.deployed()
	console.log('Deployed to:', contract.address)
}


export default function deployFunction() {
	main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error)
		process.exit?.(1)
	})
}