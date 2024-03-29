import { Fragment, useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { injected } from '../functions/connectors'

import { ethers, BigNumber, BigNumberish } from 'ethers'
import { formatEther } from '@ethersproject/units'
import bn from 'bignumber.js'

import { optimismNetworkBundle } from '../data/networkData'

import INonfungiblePositionManager from '@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json'

import Head from 'next/head'

import Confetti from 'react-confetti'

import Header from '../components/Header'
import Footer from '../components/Footer'

import LinkWalletButton from '../components/LinkWalletButton'

export default function Mint() {
	const { 
		library,
		account,
		activate,
		chainId,
	} = useWeb3React()

	const networkDefaults = optimismNetworkBundle

	const [currentStep, setCurrentStep] = useState(0)

	// scroll to top on step change
	useEffect(() => {
		window?.scrollTo(0, 0)
	}, [currentStep])

	// return user to switch network page after page refresh (for MetaMask mobile app)
	useEffect(() => {
		try {
			if (currentStep === 0 && window?.sessionStorage.getItem("hasLinkedWallet")) {
				if (!window?.sessionStorage.getItem("reloadAttempted")) {
					window?.sessionStorage.setItem("reloadAttempted", true)
					location.reload()
				}

				window?.sessionStorage.setItem("reloadAttempted", false)

				activate(injected)
				setCurrentStep(2)
			}
		}
		catch (e) {
			console.error(e)
		}
	}, [])

	const [ethBalance, setEthBalance] = useState(0.0)
	useEffect(() => {
		updateEthBalance()
	}, [chainId])

	const [percentListed, setPercentListed] = useState()
	const [marketCap, setMarketCap] = useState()
	const [invalidTokenPriceInfo, setInvalidTokenPriceInfo] = useState(false)
	// validate forms
	useEffect(() => {
		// percentListed exists and is within range, and marketCap exists and is within range
		if (((percentListed !== "" && typeof(percentListed) !== 'undefined') && (percentListed < 0 || percentListed > 100)) || ((marketCap !== "" && typeof(marketCap) !== 'undefined') && (marketCap < 100 || marketCap > 1000000))) {
			setInvalidTokenPriceInfo(true)
		}
		else if ((percentListed === "" && marketCap === "") && (typeof(percentListed) === 'undefined' && typeof(marketCap) === 'undefined')) {
			setInvalidTokenPriceInfo(false)
		}
		else {
			setInvalidTokenPriceInfo(false)
		}
	}, [percentListed, marketCap])


	function updateEthBalance() {
		if (library && account) {
			console.log('Getting Eth balance...')
			library.getBalance(account)
			.then(balance => {
				console.log('Balance:', parseFloat(formatEther(balance)).toPrecision(4))
				setEthBalance(parseFloat(formatEther(balance)).toPrecision(4))
			})
		}
	}

	const [songIsTokenizing, setSongIsTokenizing] = useState(false)
	const [rightokenERC20Address, setRightokenERC20Address] = useState("")
	async function mintRightokenERC20() {
		setSongIsTokenizing(true)

		const signer = library.getSigner(account)
		
		// deploy custom ERC20 contract
		const erc20RightokenABI = [
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "name_",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol_",
						"type": "string"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
		]
		try {
			if (chainId !== networkDefaults.mainnet.id && chainId !== networkDefaults.testnet.id) {
				throw `Please connect to an ${networkDefaults.mainnet.name} network`
			}

			const factory = new ethers.ContractFactory(erc20RightokenABI, '0x60806040523480156200001157600080fd5b5060405162001a0438038062001a04833981810160405281019062000037919062000335565b818181600390805190602001906200005192919062000213565b5080600490805190602001906200006a92919062000213565b505050620000883368056bc75e2d631000006200009060201b60201c565b50506200065f565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000103576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000fa90620003e0565b60405180910390fd5b62000117600083836200020960201b60201c565b80600260008282546200012b91906200048f565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200018291906200048f565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001e9919062000402565b60405180910390a362000205600083836200020e60201b60201c565b5050565b505050565b505050565b82805462000221906200052c565b90600052602060002090601f01602090048101928262000245576000855562000291565b82601f106200026057805160ff191683800117855562000291565b8280016001018555821562000291579182015b828111156200029057825182559160200191906001019062000273565b5b509050620002a09190620002a4565b5090565b5b80821115620002bf576000816000905550600101620002a5565b5090565b6000620002da620002d48462000448565b6200041f565b905082815260208101848484011115620002f357600080fd5b62000300848285620004f6565b509392505050565b600082601f8301126200031a57600080fd5b81516200032c848260208601620002c3565b91505092915050565b600080604083850312156200034957600080fd5b600083015167ffffffffffffffff8111156200036457600080fd5b620003728582860162000308565b925050602083015167ffffffffffffffff8111156200039057600080fd5b6200039e8582860162000308565b9150509250929050565b6000620003b7601f836200047e565b9150620003c48262000636565b602082019050919050565b620003da81620004ec565b82525050565b60006020820190508181036000830152620003fb81620003a8565b9050919050565b6000602082019050620004196000830184620003cf565b92915050565b60006200042b6200043e565b905062000439828262000562565b919050565b6000604051905090565b600067ffffffffffffffff821115620004665762000465620005f6565b5b620004718262000625565b9050602081019050919050565b600082825260208201905092915050565b60006200049c82620004ec565b9150620004a983620004ec565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004e157620004e062000598565b5b828201905092915050565b6000819050919050565b60005b8381101562000516578082015181840152602081019050620004f9565b8381111562000526576000848401525b50505050565b600060028204905060018216806200054557607f821691505b602082108114156200055c576200055b620005c7565b5b50919050565b6200056d8262000625565b810181811067ffffffffffffffff821117156200058f576200058e620005f6565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b611395806200066f6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610e35565b60405180910390f35b6100e660048036038101906100e19190610c83565b610308565b6040516100f39190610e1a565b60405180910390f35b610104610326565b6040516101119190610f37565b60405180910390f35b610134600480360381019061012f9190610c34565b610330565b6040516101419190610e1a565b60405180910390f35b610152610428565b60405161015f9190610f52565b60405180910390f35b610182600480360381019061017d9190610c83565b610431565b60405161018f9190610e1a565b60405180910390f35b6101b260048036038101906101ad9190610bcf565b6104dd565b6040516101bf9190610f37565b60405180910390f35b6101d0610525565b6040516101dd9190610e35565b60405180910390f35b61020060048036038101906101fb9190610c83565b6105b7565b60405161020d9190610e1a565b60405180910390f35b610230600480360381019061022b9190610c83565b6106a2565b60405161023d9190610e1a565b60405180910390f35b610260600480360381019061025b9190610bf8565b6106c0565b60405161026d9190610f37565b60405180910390f35b60606003805461028590611067565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190611067565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b600061031c610315610747565b848461074f565b6001905092915050565b6000600254905090565b600061033d84848461091a565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610388610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90610eb7565b60405180910390fd5b61041c85610414610747565b85840361074f565b60019150509392505050565b60006012905090565b60006104d361043e610747565b84846001600061044c610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104ce9190610f89565b61074f565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461053490611067565b80601f016020809104026020016040519081016040528092919081815260200182805461056090611067565b80156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b5050505050905090565b600080600160006105c6610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610683576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067a90610f17565b60405180910390fd5b61069761068e610747565b8585840361074f565b600191505092915050565b60006106b66106af610747565b848461091a565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b690610ef7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561082f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082690610e77565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161090d9190610f37565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561098a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098190610ed7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f190610e57565b60405180910390fd5b610a05838383610b9b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8290610e97565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b1e9190610f89565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b829190610f37565b60405180910390a3610b95848484610ba0565b50505050565b505050565b505050565b600081359050610bb481611331565b92915050565b600081359050610bc981611348565b92915050565b600060208284031215610be157600080fd5b6000610bef84828501610ba5565b91505092915050565b60008060408385031215610c0b57600080fd5b6000610c1985828601610ba5565b9250506020610c2a85828601610ba5565b9150509250929050565b600080600060608486031215610c4957600080fd5b6000610c5786828701610ba5565b9350506020610c6886828701610ba5565b9250506040610c7986828701610bba565b9150509250925092565b60008060408385031215610c9657600080fd5b6000610ca485828601610ba5565b9250506020610cb585828601610bba565b9150509250929050565b610cc881610ff1565b82525050565b6000610cd982610f6d565b610ce38185610f78565b9350610cf3818560208601611034565b610cfc816110f7565b840191505092915050565b6000610d14602383610f78565b9150610d1f82611108565b604082019050919050565b6000610d37602283610f78565b9150610d4282611157565b604082019050919050565b6000610d5a602683610f78565b9150610d65826111a6565b604082019050919050565b6000610d7d602883610f78565b9150610d88826111f5565b604082019050919050565b6000610da0602583610f78565b9150610dab82611244565b604082019050919050565b6000610dc3602483610f78565b9150610dce82611293565b604082019050919050565b6000610de6602583610f78565b9150610df1826112e2565b604082019050919050565b610e058161101d565b82525050565b610e1481611027565b82525050565b6000602082019050610e2f6000830184610cbf565b92915050565b60006020820190508181036000830152610e4f8184610cce565b905092915050565b60006020820190508181036000830152610e7081610d07565b9050919050565b60006020820190508181036000830152610e9081610d2a565b9050919050565b60006020820190508181036000830152610eb081610d4d565b9050919050565b60006020820190508181036000830152610ed081610d70565b9050919050565b60006020820190508181036000830152610ef081610d93565b9050919050565b60006020820190508181036000830152610f1081610db6565b9050919050565b60006020820190508181036000830152610f3081610dd9565b9050919050565b6000602082019050610f4c6000830184610dfc565b92915050565b6000602082019050610f676000830184610e0b565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f948261101d565b9150610f9f8361101d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610fd457610fd3611099565b5b828201905092915050565b6000610fea82610ffd565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611052578082015181840152602081019050611037565b83811115611061576000848401525b50505050565b6000600282049050600182168061107f57607f821691505b60208210811415611093576110926110c8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61133a81610fdf565b811461134557600080fd5b50565b6113518161101d565b811461135c57600080fd5b5056fea264697066735822122075f8969728719f64be18ca84a97ea598878b3624dedfdf90c0cebd3972e2276464736f6c63430008040033', signer)
			const customERC20RightokenContract = await factory.deploy(`${songTitle} : ${artistName} : Rightoken${joinCrescendao ? " : <" : ""}`,"RTKN")
			const customERC20RightokenAddress = customERC20RightokenContract.address
			await customERC20RightokenContract.deployed()
			console.log("Token address:", customERC20RightokenAddress)

			setRightokenERC20Address(customERC20RightokenAddress)

			// wait for contract creation transaction to be mined
			await customERC20RightokenContract.deployTransaction.wait()

			setSongIsTokenizing(false)
			setSongIsTokenized(true)
		}
		catch {
			setSongIsTokenizing(false)
		}
	}

	const [songIsListing, setSongIsListing] = useState(false)
	const [customUniswapPoolLink, setCustomUniswapPoolLink] = useState("")
	const [customFanInvestLink, setCustomFanInvestLink] = useState("")
	async function listRightokenERC20() {
		setSongIsListing(true)

		const signer = library.getSigner(account)

		const rightokenAddress = rightokenERC20Address
		let stablecoinAddress = networkDefaults.mainnet.stablecoin_address

		if (chainId === networkDefaults.testnet.id) {
			stablecoinAddress = networkDefaults.testnet.stablecoin_address
		}
		else if (chainId !== networkDefaults.mainnet.id && chainId !== networkDefaults.testnet.id) {
			throw `Please connect to an ${networkDefaults.mainnet.name} network`
		}

		try {
			// create a Uniswap LP
			// order token0 and token1 to Uniswap standard
			let token0Address
			let token1Address
			if (parseInt(stablecoinAddress, 16) < parseInt(rightokenAddress,16)) {
				token0Address = stablecoinAddress
				token1Address = rightokenAddress
			}
			else {
				token0Address = rightokenAddress
				token1Address = stablecoinAddress
			}

			const pricePerRightoken = marketCap/100

			bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })
			// returns the sqrt price as a 64x96
			function encodePriceSqrt(reserve1, reserve0) {
				return BigNumber.from(
					new bn(reserve1.toString())
					.div(reserve0.toString())
					.sqrt()
					.multipliedBy(new bn(2).pow(96))
					.integerValue(3)
					.toString()
				)
			}

			// (y, x)
			let sqrtPriceX96
			if (token0Address === stablecoinAddress) {
				sqrtPriceX96 = encodePriceSqrt(pricePerRightoken, 1)
			}
			else {
				sqrtPriceX96 = encodePriceSqrt(1, pricePerRightoken)
			}
			
			const poolFee = 500


			// APPROVE TOKENS TO BE USED BY UNISWAP
			const NonfungiblePositionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
			
			const approveAllowanceABI = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
			let approveAllowanceContract = new ethers.Contract(token0Address, approveAllowanceABI, signer)
			let approvedContract = await approveAllowanceContract.approve(NonfungiblePositionManagerAddress, (100 * 10 ** 18).toString())
			await approvedContract.wait()

			approveAllowanceContract = new ethers.Contract(token1Address, approveAllowanceABI, signer)
			approvedContract = await approveAllowanceContract.approve(NonfungiblePositionManagerAddress, (100 * 10 ** 18).toString())
			await approvedContract.wait()


			// CREATE AND INITIALIZE A NEW POOL
			const positionContract = new ethers.Contract(NonfungiblePositionManagerAddress, INonfungiblePositionManager.abi, signer)
			const initializedPool = await positionContract.createAndInitializePoolIfNecessary(token0Address, token1Address, poolFee, sqrtPriceX96, {gasLimit: 9900000})
			await initializedPool.wait()

			const poolURL = `app.uniswap.org/#/swap?exactField=input&exactAmount=250&inputCurrency=${stablecoinAddress}&outputCurrency=${rightokenAddress}`
			setCustomUniswapPoolLink(poolURL)
			console.log(poolURL)

			const fanInvestURL = `rightoken.org/invest?tokenAddress=${rightokenAddress}`
			setCustomFanInvestLink(fanInvestURL)
			console.log(fanInvestURL)


			// MINT THE POSITION
			const block = await library.getBlock()
			const deadline = block.timestamp + 200

			const tickSpacing = 10

			const getMinTick = (tickSpacing) => Math.ceil(-887272 / tickSpacing) * tickSpacing
			const getMaxTick = (tickSpacing) => Math.floor(887272 / tickSpacing) * tickSpacing

			const getBaseLog = (x, y) => Math.log(y) / Math.log(x)

			let tickLower
			let tickUpper
			if (token0Address === stablecoinAddress) {
				tickLower = getMinTick(tickSpacing)
				tickUpper = Math.floor(getBaseLog(1.0001, 1/pricePerRightoken) / tickSpacing) * tickSpacing
			}
			else {
				tickLower = (Math.floor(getBaseLog(1.0001, 1/pricePerRightoken) / tickSpacing) * tickSpacing)*-1
				tickUpper = getMaxTick(tickSpacing)
			}

			let amount0Desired
			let amount1Desired
			if (token0Address === stablecoinAddress) {
				amount0Desired = ethers.utils.parseUnits('0', 'gwei')
				amount1Desired = ethers.utils.parseUnits(percentListed, 18)
			}
			else {
				amount0Desired = ethers.utils.parseUnits(percentListed, 18)
				amount1Desired = ethers.utils.parseUnits('0', 'gwei')
			}
			
			const mintParams = {
				token0: token0Address,
				token1: token1Address,
				fee: poolFee,
				tickLower: tickLower,
				tickUpper: tickUpper,
				recipient: account,
				amount0Desired: amount0Desired,
				amount1Desired: amount1Desired,
				amount0Min: ethers.utils.parseUnits('0', 'gwei'),
				amount1Min: ethers.utils.parseUnits('0', 'gwei'),
				deadline: deadline,
			}

			const positionInterface = new ethers.utils.Interface(INonfungiblePositionManager.abi)
			const calldata = positionInterface.encodeFunctionData("mint", [ mintParams ])

			const transaction = {
				data: calldata,
				to: NonfungiblePositionManagerAddress,
				from: account,
			}
			const mintPosition = await signer.sendTransaction(transaction, {gasLimit: 9900000})
			await mintPosition.wait()

			console.log("Rightoken listed successfully")

			setSongIsListed(true)
		}
		catch (e) {
			console.error(e)
		}

		setSongIsListing(false)
	}

	const [runConfetti, setRunConfetti] = useState(false)
	function finishMintingRightoken() {
		let postCelebrationLink = "/"

		if (songIsListed) {
			postCelebrationLink = customUniswapPoolLink
		}

		const runCelebration = new Promise((resolve, reject) => {
			window?.scrollTo(0, 0)
			setRunConfetti(true)

			const audio = new Audio("/celebration.mp3")
			audio.play()

			setTimeout(() => {
				resolve("Celebration complete")
			}, 5000)
		})

		runCelebration
		.then(() => { window?.location.replace("https://"+postCelebrationLink) })
	}


	function SwitchNetworkButton(props) {
		let chainId = props.chainId

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


	const legalAgreementLibrary = {
		credit: {
			title: "Credit",
			body: "The tokenholder shall acknowledge the original authorship of the composition appropriately and reasonably in all media and performance formats in writing where possible and vocally otherwise.",
			mutable: false,
		},
		definingRights: {
			title: "Defining Rights",
			body: "Scope of exclusive rights in sound recordings shall be understood under the terms of 17 U.S. Code § 114.",
			mutable: false,
		},
		governingLaw: {
			title: "Governing Law",
			body: "This agreement is governed by and shall be construed under the law of the State of New York, United States of America, without regard to the conflicts of laws principles thereof.",
			mutable: false,
		},
		rightTransfer: {
			title: "Copyright Transfer",
			body: "Global, perpetual, and exclusive license to use the sound recording will be transferred to tokenholders, until delisted or legally determined to have been wrongfully transferred as the result of a hack or software bug, whereby rights are returned to the appropriate owner(s).",
			mutable: false,
		},
		metadata: {
			title: "Metadata",
			body: "The song title and associated cover art may be distributed by the tokenholder in relation to the work, but copyright is not conferred for these works.",
			mutable: false,
		},
		crescendao: {
			title: "Crescendao",
			body: "Crescendao artists may list rightokens that include a resale royalty, paid by investors, and currently set at 4%. This rate is used to support Crescendao, an artist-owned cooperative that maintains Rightoken.",
			mutable: false,
		},
		upgrade: {
			title: "Upgradability",
			body: "A simple majority of tokenholders may vote to upgrade outstanding tokens to enable new features or technical maintenance. New tokens are either sent directly to the wallets of, or made available to claim by, existing owners in proportion to the current token distribution, rendering the existing tokens void and obsolete. The artist must make reasonable efforts to inform tokenholders of the upgrade.",
			mutable: false,
		},
		delist: {
			title: "Delisting",
			body: "The artist or original rightsholders may delist outstanding Rightoken ERC-20, effectively reversing the process of tokenization. This is done by crediting the addresses of holders with equal value of a reasonably fungible, recognized, and established alternative token.",
			mutable: false,
		}
	}

	const [agreedToTerms, setAgreedToTerms] = useState(false)
	const [joinCrescendao, setJoinCrescendao] = useState(true)
	const [songTitle, setSongTitle] = useState("")
	const [artistName, setArtistName] = useState("")
	const [songIsTokenized, setSongIsTokenized] = useState(false)
	const [songIsListed, setSongIsListed] = useState(false)
	const mintStepPages = [
		{
			title: "Intro",
			body: <><span className="font-medium">Rightoken converts sound recording copyright to tokens and gives you a link to share with fans to invest.</span> <br /><br /> We'll explain what's happening at each step. This takes someone new to crypto ~15 minutes. <br /><br /> Please do not refresh the page.</>,
		},
		{
			title: "Link wallet",
			body: <>You need a crypto wallet to create, hold, and sell your tokens. Rightoken is optimized for the MetaMask app on <a href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202" className="underline" target="_blank" rel="noreferrer">iOS</a> and <a href="https://play.google.com/store/apps/details?id=io.metamask" className="underline" target="_blank" rel="noreferrer">Android</a>. <br /><br /> <span className="font-medium">Download the app, create your wallet, find the browser in the wallet app, and return to this page there.</span></>,
			additionalContent: <LinkWalletButton account={account} activate={activate} injected={injected} />,
			successCondition: typeof(account) !== 'undefined',
		},
		{
			title: "Configure wallet",
			body: <><span className="font-medium">Rightoken is built on {networkDefaults.mainnet.name}, a network that makes Ethereum much cheaper to use.</span></>,
			additionalContent: <SwitchNetworkButton chainId={chainId} />,
			successCondition: (chainId === networkDefaults.mainnet.id || chainId === networkDefaults.testnet.id),
		},
		{
			title: "Fund wallet",
			body: <><span className="font-medium">You need Ethereum in your {networkDefaults.mainnet.name} wallet to pay blockchain gas fees.</span> The fees don't go to Rightoken. <br /><br /> Download the Crypto.com <a href="https://apps.apple.com/us/app/crypto-com-buy-btc-eth-shib/id1262148500" className="underline" target="_blank" rel="noreferrer">iOS</a> or <a href="https://play.google.com/store/apps/details?id=co.mona.android&hl=en&gl=US" className="underline" target="_blank" rel="noreferrer">Android</a> app, purchase at least 0.006 ETH, and withdraw to {networkDefaults.mainnet.name} using your wallet address: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">{account}</span> <br /><br /> If you have Ethereum not on {networkDefaults.mainnet.name}, you can send it to your wallet and <a href="https://app.hop.exchange/" className="underline" target="_blank" rel="noreferrer">bridge to {networkDefaults.mainnet.name}</a>, but it'll cost more in gas fees.</>,
			additionalContent: <>
					<div className="flex flex-col">
						<button
							className="uppercase text-xs font-bold px-3 py-2 text-zinc-400 mix-blend-multiply active:bg-zinc-200 rounded-md"
							onClick={() => updateEthBalance()}
						>
							Get Current Balance
						</button>
					</div>
					<br />
					{((chainId === networkDefaults.mainnet.id || chainId === networkDefaults.testnet.id) && ethBalance > 0.005) ? 
						<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  You have {ethBalance} ETH</p></div>
						: <div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-zinc-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-zinc-600 animate-ping" />  You have {ethBalance} ETH</p></div>
					}
				</>,
			successCondition: ((chainId === networkDefaults.mainnet.id && ethBalance > 0.005) || chainId === networkDefaults.testnet.id)
		},
		{
			title: "Tokenholder terms",
			body: <><span className="font-medium">This tokenholder agreement outlines what holders of the newly created rightokens are entitled to.</span></>,
			additionalContent: <>
					{Object.keys(legalAgreementLibrary).map(sectionKey => <div key={sectionKey}>
						<p className="font-black text-sm uppercase tracking-wider text-zinc-700">{legalAgreementLibrary[sectionKey].title}</p>
						<p className="text-zinc-600">{legalAgreementLibrary[sectionKey].body}</p>
						<br />
					</div>)}
					<div className="flex justify-center">
						<div className="inline-flex appearance-none align-baseline space-x-2 px-3 py-1 active:bg-gray-200 rounded-md select-none" onClick={() => setAgreedToTerms(!agreedToTerms)}>
							<input type="radio" name="agree" checked={agreedToTerms} readOnly />
							<label className="text-sm font-medium" htmlFor="agree">I agree</label>
						</div>
					</div>
				</>,
			successCondition: agreedToTerms
		},
		{
			title: "Invitation to Crescendao",
			body: <><span className="font-medium">Crescendao is a cooperative owned by select Rightoken artists. It manages a pool of resources artists can benefit from while staying independent.</span> <br /><br /> These include promotion, like getting on exclusive Spotify playlists, copyright enforcement, production help, and cash loans or advances. <br /><br /> Crescendao also supports and oversees development of Rightoken for the benefit of all artists. <br /><br /> Membership is funded entirely by investor resales, a 4% fee paid by investors purchasing rightokens. This means joining is free for artists.</>,
			additionalContent: <>
					<div className="flex justify-center">
						<div className="inline-flex appearance-none align-baseline space-x-2 px-3 py-1 active:bg-gray-200 rounded-md select-none" onClick={() => setJoinCrescendao(!joinCrescendao)}>
							<input type="radio" name="join" checked={joinCrescendao} readOnly />
							<label className="text-sm font-medium" htmlFor="join">Join</label>
						</div>
					</div>
				</>
		},
		{
			title: "Tokenize song",
			body: <><span className="font-medium">You're ready to tokenize your song.</span></>,
			additionalContent: <>
					{ !songIsTokenized &&
						<div className={`border-2 border-zinc-300 rounded-md py-8 space-y-9 ${songIsTokenizing && "animate-pulse"}`}>
							<div>
								<p className="tracking-widest text-center font-medium text-xl text-zinc-400 uppercase mb-2">• Presenting •</p>
								<input className="flex bg-transparent font-medium text-2xl border-b-2 outline-none placeholder:text-zinc-300 text-zinc-700 text-center mx-auto" spellCheck="false" placeholder="Song Title" value={songTitle} onChange={e => setSongTitle(event.target.value)} />
							</div>
							<div>
								<p className="tracking-wide text-center font-medium text-sm text-zinc-400 uppercase mb-2">by the illustrious ☟</p>
								<input className="flex bg-transparent font-medium text-xl border-b-2 outline-none placeholder:text-zinc-300 text-zinc-700 text-center mx-auto" spellCheck="false" placeholder="Artist Name" value={artistName} onChange={e => setArtistName(event.target.value)} />
							</div>
						</div>
					}
					{ (!songIsTokenized && !songIsTokenizing && songTitle !== "" && artistName !== "") && 
						<>
							<br />
							<div className="flex flex-col justify-center space-y-4">
								<button
									className="uppercase text-sm font-bold px-4 py-3 mix-blend-multiply bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100 text-zinc-700 active:text-zinc-500 rounded-md"
									onClick={() => mintRightokenERC20()}>
									Tokenize now
								</button>
							</div>
						</>
					}
					{ songIsTokenized &&
						<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  {songTitle} was tokenized</p></div>
					}
				</>,
			successCondition: songIsTokenized
		},
		{
			title: "List your tokens",
			body: <>You can now list some of your rightokens. <span className="font-medium">This is how they'll be available for fans to invest.</span> <br /><br /> Set an asking price of what you think the song is currently worth in total (even if you aren't listing 100%). The value of all tokens rise automatically as people invest.</>,
			additionalContent: <>
					{ !songIsListed &&
						<>
							<div className={`border-2 rounded-md py-8 space-y-9 ${invalidTokenPriceInfo ? "border-red-300" : "border-zinc-300"} ${songIsListing && "animate-pulse"}`}>
								<div>
									<p className="tracking-widest text-center font-medium text-xl text-zinc-400 uppercase mb-2">initially offering</p>
									<div className="flex flex-row space-x-2 justify-center">
										<input className="flex bg-transparent font-medium text-3xl border-b-2 outline-none placeholder:text-zinc-300 text-zinc-700 text-center w-20 rounded-none" spellCheck="false" type="number" inputMode="decimal" min="0" max="100" step="5" placeholder="20" value={percentListed} onChange={e => setPercentListed(event.target.value)} />
										<p className="font-bold text-xl text-zinc-400">%</p>
									</div>
								</div>
								{ Number(percentListed) !== 0 &&
									<div className="space-y-2">
										<p className="tracking-wide text-center font-medium text-sm text-zinc-400 uppercase">valued <span className="text-xs text-zinc-300">(very reasonably)</span> at</p>
										<div className="flex flex-row space-x-1 justify-center">
											<p className="font-medium text-2xl text-zinc-400">$</p>
											<input className="flex bg-transparent font-medium text-xl border-b-2 outline-none placeholder:text-zinc-300 text-zinc-700 text-center w-28 rounded-none" spellCheck="false" type="number" inputMode="decimal" min="0" max="1000000" step="5000" placeholder="80000" value={marketCap} onChange={e => setMarketCap(event.target.value)} />
											<p className="font-bold text-sm text-zinc-400">USD</p>
										</div>
										<p className="text-center font-mono text-xs text-zinc-300">for 100%</p>
									</div>
								}
							</div>
						</>
					}
					{ (!songIsListed && !songIsListing && typeof(percentListed) !== 'undefined' && Number(percentListed) > 0 && typeof(marketCap) !== 'undefined' && Number(marketCap) >= 100 && !invalidTokenPriceInfo) && 
						<>
							<br />
							<div className="flex flex-col justify-center space-y-4">
								<button
									className="uppercase text-sm font-bold px-4 py-3 mix-blend-multiply bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 active:from-emerald-50 active:via-green-50 active:to-emerald-100 text-zinc-700 active:text-zinc-500 rounded-md"
									onClick={() => listRightokenERC20()}>
										List now
								</button>
							</div>
						</>
					}
					{ songIsListed &&
						<div className="rounded-sm bg-zinc-50 mix-blend-multiply py-2 text-center"><p className="text-green-600 font-mono text-xs"><span className="align-middle inline-block w-1 h-1 rounded-full bg-green-600 animate-ping" />  {songTitle} was listed</p></div>
					}
				</>,
			successCondition: (songIsListed || Number(percentListed) === 0)
		},
		{
			title: "Share with fans",
			body: <>
					<span className="block tracking-tight text-center font-bold text-lg text-purple-400 uppercase mb-4">{songTitle ? songTitle : "Your song"} is ready ♨</span>
					{ songIsListed &&
						<>
							Here's the link to share with fans: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">{customFanInvestLink}</span>
							<br /><br />
							This is how fans can get instructions on how to invest in your work.
							<br /><br />
							Here's your link to the market: <span className="inline-block text-xs font-mono bg-zinc-200 rounded-sm leading-loose break-all select-all px-2 py-1">{customUniswapPoolLink}</span>
							<br /><br />
							This is also how you will receive payment. Money is sent from this page in the form of <span className="font-bold">DAI stablecoin</span> to your wallet. The stablecoins in your wallet can be withdrawn to your Crypto.com account and redeemed for $1/DAI.
							<br /><br />
							Screenshot this page.
						</>
					}
				</>,
		},
	]

	return (
		<>
			{ (typeof(window) !== "undefined" && runConfetti) &&
				<Confetti
					className="m-auto"
					opacity={0.95}
					width={window.width}
					height={window.height}
					run={runConfetti}
					recycle={false}
					onConfettiComplete={() => setRunConfetti(false)}
				/>
			}

			<div className="mx-auto max-w-xs md:max-w-lg">
				<Header linkTo="support" />
				<main>
					<div className="py-9">
						<p className="text-xs font-bold text-center uppercase mb-3">{ mintStepPages[currentStep].title }</p>
						<p className="text-zinc-600 break-words max-w-xs md:max-w-sm mx-auto py-1 px-5 border-x-8 border-double border-stone-400/20 mix-blend-multiply rounded-sm">{ mintStepPages[currentStep].body }</p>
						<div className="md:max-w-sm mx-auto">
							{ mintStepPages[currentStep].additionalContent && 
								<>
									<br />
									<>{ mintStepPages[currentStep].additionalContent }</>
								</>
							}
						</div>
						<p className="text-xl font-medium text-center select-none mt-1 text-stone-600/30">~</p>
						<div className="flex flex-row space-x-2 justify-center mt-6">
							{ currentStep > 0 &&
								<button className="text-sm font-medium px-3 py-1 active:bg-gray-200 rounded-md text-zinc-400" onClick={() => setCurrentStep(currentStep-1)}>Back</button>
							}
							{ currentStep < mintStepPages.length-1 && (typeof(mintStepPages[currentStep].successCondition) === 'undefined' ? true : mintStepPages[currentStep].successCondition) &&
								<>
									{ currentStep > 0 && <div className="border-l border-zinc-200" /> }
									<button className="text-sm font-medium px-3 py-1 active:bg-gray-200 rounded-md text-zinc-800 animate-pulse" onClick={() => setCurrentStep(currentStep+1)}>Next</button>
								</>
							}
							{ currentStep === mintStepPages.length-1 &&
								<>
									{ currentStep > 0 && <div className="border-l border-zinc-200" /> }
									<button className="text-sm font-medium px-3 py-1 active:bg-green-300 rounded-md text-zinc-800" onClick={() => finishMintingRightoken()}>Finish</button>
								</>
							}
						</div>
						<p className="text-sm text-zinc-300 font-medium text-center mt-3">{Math.round(currentStep/(mintStepPages.length-1) * 100)}%</p>
					</div>
				</main>
			</div>

			<Footer />
		</>
	)
}