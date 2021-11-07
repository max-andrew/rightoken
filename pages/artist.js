import Head from 'next/head'

import { Fragment, useEffect, useState, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedButton from '../components/RoundedButton'
import CommunityWidget from '../components/CommunityWidget'
import Footer from '../components/Footer'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { 
	injected,
	walletconnect
} from '../functions/connectors'
import {
	useActivatingConnector,
	useEagerConnect,
	useInactiveListener,
	useBlockNumber,
	useEthBalance
} from '../hooks/web3Hooks'
import { connectWallet, disconnectWallet, getConnectedWalletApp } from '../functions/setWalletConnection'
import { getWeb3ErrorMessage } from '../functions/getWeb3ErrorMessage'

import { ChainId, Token } from '@uniswap/sdk'
import IUniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'

import { ethers } from "ethers"

import Confetti from 'react-confetti'

export default function Artist() {
	const legalAgreementLibrary = {
		metadata: {
			title: "Metadata",
			body: "The sound recording title and associated cover art may be distributed by the tokenholder, but copyright is not conferred for these works.",
			mutable: false,
		},
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
			body: "You agree that perpetual, irrevocable, and exclusive license to use the song will be transferred to tokenholders, until burned or otherwise determined through a social recovery mechanism, whereby rights are returned to the artist, or to the appropriate owner, respectively.",
			mutable: false,
		}
	}

	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error
	} = useWeb3React()

	// check window for connector type (coinbase, injected...)
	const [walletAppSelected, setWalletAppSelected] = useState(getConnectedWalletApp())
	const [activatingConnector, setActivatingConnector] = useActivatingConnector(connector)

	// link wallet if it is already connected (but page has refreshed)
	useEffect(async () => {
		if ((!account && getConnectedWalletApp() === walletAppSelected) && await !!window?.ethereum?.selectedAddress)
			connectWallet(error, walletAppSelected, setActivatingConnector, activate, connector, deactivate)
	})

	const [songTitle, setSongTitle] = useState("")
	const [artistName, setArtistName] = useState("")
	const [legalName, setLegalName] = useState("")

	const [askingPrice, setAskingPrice] = useState("")
	const [saleAmount, setSaleAmount] = useState("")

	const audioInputFile = useRef(null)
	const [audioFileName, setAudioFileName] = useState("")
	const [files, setFiles] = useState([])

	const [contractAddress, setContractAddress] = useState("")
	const [minting, setMinting] = useState(false)

	useEffect(async () => {
		if (await audioInputFile.current !== null) {
			audioInputFile.current.addEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			return () => {
				audioInputFile.current.removeEventListener("change", () => {setAudioFileName(audioInputFile.current.files[0].name)})
			}
		}
	})

	const [songTitleError, setSongTitleError] = useState(false)
	const [artistNameError, setArtistNameError] = useState(false)
	const [legalNameError, setLegalNameError] = useState(false)
	const [audioFileError, setAudioFileError] = useState(false)

	const [enableSocialRecoverySelection, setEnableSocialRecoverySelection] = useState(true)

	const [mintSuccessful, setMintSuccessful] = useState(false)
	const [runConfetti, setRunConfetti] = useState(false)
	const topOfPage = useRef(null)

	const resetFormValues = () => {
		setSongTitle("")
		setArtistName("")
		setLegalName("")
		setAudioFileName("")
		setFiles([])
		audioInputFile.current.value = ""
	}

	const resetErrors = async () => {
		setSongTitleError(false)
		setArtistNameError(false)
		setLegalNameError(false)
		setAudioFileError(false)
	}

	const setErrors = async () => {
		if (songTitle === "")
			setSongTitleError(true)
		if (artistName === "")
			setArtistNameError(true)
		if (legalName === "")
			setLegalNameError(true)
		if (audioFileName === "")
			setAudioFileError(true)
	}

	const isFormValid = () => {
		return (songTitle !== "" && artistName !== "" && legalName !== "" /*&& audioFileName !== ""*/)
	}

	// const storeNFTMetadata = async () => {
	// 	const legalAgreement = getRightokenLegalAgreement()

	// 	const nftStorageAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyNmViRWFFMUUyQmUxNDFCREM0QjIxRjBGYTlBNzdiMDU3OGZlNjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODQ1MjAxMDQ4MiwibmFtZSI6IlJpZ2h0b2tlbiJ9.D8o845sX8yBmgwDc6DkNSTFJ4-auXFjRGHLyC7MOSIQ"
	// 	const client = new NFTStorage({ token: nftStorageAPIKey })

	// 	const metadata = await client.store({
	// 		name: 'Rightoken',
	// 		description: 'Test Rightoken v0',
	// 		image: new File(['./rightokenNFT.png'], 'rightokenNFT.png', { type: 'image/png' }),
	// 		properties: {
	// 			// audio: new File([/* data */], [files[0]], { type: 'audio/wav' }),
	// 			songTitle,
	// 			// artistName,
	// 			// legalAgreement,
	// 			// legalName,
	// 		}
	// 	})
	// 	return metadata.ipnft
	// }

	const scrollTo = (ref) => ref.current && ref.current.scrollIntoView({behavior: 'smooth'})

	const getLegalAgreementSectionJSX = sectionKey => {
		const section = legalAgreementLibrary[sectionKey]
		const title = section.title
		const isSocialRecoverySection = sectionKey === "socialRecovery"

		const termCustomization = section.mutable ? <div><p className="text-center text-sm font-mono mt-6"><input type="checkbox" defaultChecked={isSocialRecoverySection ? true : false} onClick={() => setEnableSocialRecoverySelection(!enableSocialRecoverySelection)} />&nbsp;&nbsp;Enable {title}</p></div> : ""

		return (
			<div key={section} className="my-6 space-y-2">
				<p className="text-sm font-semibold uppercase">{title}</p>
				<br />
				<p className="space-y-2">{section.body}</p>
				{termCustomization}
			</div>
		)
	}

	// agreement object based on user input
	const getRightokenLegalAgreement = () => {
		let sectionsIncluded = JSON.parse(JSON.stringify(legalAgreementLibrary))

		for (const section in sectionsIncluded) {
			if (sectionsIncluded[section].mutable && section === "socialRecovery" && !enableSocialRecoverySelection)
				delete sectionsIncluded[section]
		}

		return sectionsIncluded
	}

	const mintRightoken = async () => {
		const signer = library.getSigner(account)

		setMinting(true)
		
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
		const factory = new ethers.ContractFactory(erc20RightokenABI, '0x60806040523480156200001157600080fd5b5060405162001a0438038062001a04833981810160405281019062000037919062000335565b818181600390805190602001906200005192919062000213565b5080600490805190602001906200006a92919062000213565b505050620000883368056bc75e2d631000006200009060201b60201c565b50506200065f565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000103576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000fa90620003e0565b60405180910390fd5b62000117600083836200020960201b60201c565b80600260008282546200012b91906200048f565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200018291906200048f565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001e9919062000402565b60405180910390a362000205600083836200020e60201b60201c565b5050565b505050565b505050565b82805462000221906200052c565b90600052602060002090601f01602090048101928262000245576000855562000291565b82601f106200026057805160ff191683800117855562000291565b8280016001018555821562000291579182015b828111156200029057825182559160200191906001019062000273565b5b509050620002a09190620002a4565b5090565b5b80821115620002bf576000816000905550600101620002a5565b5090565b6000620002da620002d48462000448565b6200041f565b905082815260208101848484011115620002f357600080fd5b62000300848285620004f6565b509392505050565b600082601f8301126200031a57600080fd5b81516200032c848260208601620002c3565b91505092915050565b600080604083850312156200034957600080fd5b600083015167ffffffffffffffff8111156200036457600080fd5b620003728582860162000308565b925050602083015167ffffffffffffffff8111156200039057600080fd5b6200039e8582860162000308565b9150509250929050565b6000620003b7601f836200047e565b9150620003c48262000636565b602082019050919050565b620003da81620004ec565b82525050565b60006020820190508181036000830152620003fb81620003a8565b9050919050565b6000602082019050620004196000830184620003cf565b92915050565b60006200042b6200043e565b905062000439828262000562565b919050565b6000604051905090565b600067ffffffffffffffff821115620004665762000465620005f6565b5b620004718262000625565b9050602081019050919050565b600082825260208201905092915050565b60006200049c82620004ec565b9150620004a983620004ec565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004e157620004e062000598565b5b828201905092915050565b6000819050919050565b60005b8381101562000516578082015181840152602081019050620004f9565b8381111562000526576000848401525b50505050565b600060028204905060018216806200054557607f821691505b602082108114156200055c576200055b620005c7565b5b50919050565b6200056d8262000625565b810181811067ffffffffffffffff821117156200058f576200058e620005f6565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b611395806200066f6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610e35565b60405180910390f35b6100e660048036038101906100e19190610c83565b610308565b6040516100f39190610e1a565b60405180910390f35b610104610326565b6040516101119190610f37565b60405180910390f35b610134600480360381019061012f9190610c34565b610330565b6040516101419190610e1a565b60405180910390f35b610152610428565b60405161015f9190610f52565b60405180910390f35b610182600480360381019061017d9190610c83565b610431565b60405161018f9190610e1a565b60405180910390f35b6101b260048036038101906101ad9190610bcf565b6104dd565b6040516101bf9190610f37565b60405180910390f35b6101d0610525565b6040516101dd9190610e35565b60405180910390f35b61020060048036038101906101fb9190610c83565b6105b7565b60405161020d9190610e1a565b60405180910390f35b610230600480360381019061022b9190610c83565b6106a2565b60405161023d9190610e1a565b60405180910390f35b610260600480360381019061025b9190610bf8565b6106c0565b60405161026d9190610f37565b60405180910390f35b60606003805461028590611067565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190611067565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b600061031c610315610747565b848461074f565b6001905092915050565b6000600254905090565b600061033d84848461091a565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610388610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90610eb7565b60405180910390fd5b61041c85610414610747565b85840361074f565b60019150509392505050565b60006012905090565b60006104d361043e610747565b84846001600061044c610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104ce9190610f89565b61074f565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461053490611067565b80601f016020809104026020016040519081016040528092919081815260200182805461056090611067565b80156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b5050505050905090565b600080600160006105c6610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610683576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067a90610f17565b60405180910390fd5b61069761068e610747565b8585840361074f565b600191505092915050565b60006106b66106af610747565b848461091a565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b690610ef7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561082f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082690610e77565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161090d9190610f37565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561098a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098190610ed7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f190610e57565b60405180910390fd5b610a05838383610b9b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8290610e97565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b1e9190610f89565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b829190610f37565b60405180910390a3610b95848484610ba0565b50505050565b505050565b505050565b600081359050610bb481611331565b92915050565b600081359050610bc981611348565b92915050565b600060208284031215610be157600080fd5b6000610bef84828501610ba5565b91505092915050565b60008060408385031215610c0b57600080fd5b6000610c1985828601610ba5565b9250506020610c2a85828601610ba5565b9150509250929050565b600080600060608486031215610c4957600080fd5b6000610c5786828701610ba5565b9350506020610c6886828701610ba5565b9250506040610c7986828701610bba565b9150509250925092565b60008060408385031215610c9657600080fd5b6000610ca485828601610ba5565b9250506020610cb585828601610bba565b9150509250929050565b610cc881610ff1565b82525050565b6000610cd982610f6d565b610ce38185610f78565b9350610cf3818560208601611034565b610cfc816110f7565b840191505092915050565b6000610d14602383610f78565b9150610d1f82611108565b604082019050919050565b6000610d37602283610f78565b9150610d4282611157565b604082019050919050565b6000610d5a602683610f78565b9150610d65826111a6565b604082019050919050565b6000610d7d602883610f78565b9150610d88826111f5565b604082019050919050565b6000610da0602583610f78565b9150610dab82611244565b604082019050919050565b6000610dc3602483610f78565b9150610dce82611293565b604082019050919050565b6000610de6602583610f78565b9150610df1826112e2565b604082019050919050565b610e058161101d565b82525050565b610e1481611027565b82525050565b6000602082019050610e2f6000830184610cbf565b92915050565b60006020820190508181036000830152610e4f8184610cce565b905092915050565b60006020820190508181036000830152610e7081610d07565b9050919050565b60006020820190508181036000830152610e9081610d2a565b9050919050565b60006020820190508181036000830152610eb081610d4d565b9050919050565b60006020820190508181036000830152610ed081610d70565b9050919050565b60006020820190508181036000830152610ef081610d93565b9050919050565b60006020820190508181036000830152610f1081610db6565b9050919050565b60006020820190508181036000830152610f3081610dd9565b9050919050565b6000602082019050610f4c6000830184610dfc565b92915050565b6000602082019050610f676000830184610e0b565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f948261101d565b9150610f9f8361101d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610fd457610fd3611099565b5b828201905092915050565b6000610fea82610ffd565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611052578082015181840152602081019050611037565b83811115611061576000848401525b50505050565b6000600282049050600182168061107f57607f821691505b60208210811415611093576110926110c8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61133a81610fdf565b811461134557600080fd5b50565b6113518161101d565b811461135c57600080fd5b5056fea264697066735822122075f8969728719f64be18ca84a97ea598878b3624dedfdf90c0cebd3972e2276464736f6c63430008040033', signer)
		const customERC20RightokenContract = await factory.deploy(songTitle+" : "+artistName+" : Rightoken","RTKN")
		const customERC20RightokenAddress = customERC20RightokenContract.address
		await customERC20RightokenContract.deployed()
		console.log('Deployed to:', customERC20RightokenAddress)

		// wait for contract creation transaction to be mined
		await customERC20RightokenContract.deployTransaction.wait()
	
		let approveAllowanceABI = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
		let approveAllowanceContract = new ethers.Contract(customERC20RightokenAddress, approveAllowanceABI, signer)
		let approvedContract = await approveAllowanceContract.approve("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", (100 * 10 ** 18).toString(), {from: account, gasPrice: ethers.utils.parseUnits('5', 'gwei'), gasLimit: 85000})
		
		// wait for approval transaction to be mined
		await approvedContract.wait()

		// create a Uniswap LP
		const uniswapRouterContract = new ethers.Contract("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", IUniswapV2Router02.abi, signer)
		const liquidity = await uniswapRouterContract.addLiquidityETH(customERC20RightokenAddress, (saleAmount * 10 ** 18).toString(), (.25 * 10 ** 18).toString(), (.01 * 10 ** 18).toString(), account, (Date.now() + 1000 * 60 * 10).toString(), {from: account, gasPrice: ethers.utils.parseUnits('5', 'gwei'), gasLimit: 3400000, value: ((askingPrice*(saleAmount/100)) * 10 ** 18).toString()})
		const liquidityReceipt = await liquidity.wait()
		console.log(liquidityReceipt)

		const customUniswapSwapLink = `https://app.uniswap.org/#/swap?exactField=output&exactAmount=.05&inputCurrency=ETH&outputCurrency=${customERC20RightokenAddress}`
		
		setMinting(false)
		setMintSuccessful(true)
		scrollTo(topOfPage)
		setRunConfetti(true)
		setTimeout(() => setMintSuccessful(false), 12000)
		alert("Welcome to the new world of music! 🎉🎺🤘\n\nHere's your link to share with investors: \n" + customUniswapSwapLink)

		/*
		if (formIsValid && library)
			mintZNFT()
		*/
	}

	return (
		<>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main ref={topOfPage}>
				<Header />
				{ (typeof window !== "undefined" && runConfetti) &&
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
				<div className="py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className={"text-base text-purple-600 font-semibold tracking-wide uppercase" + " " + (mintSuccessful && "animate-bounce")}>{ !mintSuccessful ? "Artists" : "Congrats"}</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{ !mintSuccessful ? "Your work. Your terms." : "Welcome to the bleeding edge of music 🎉"}
							</p>
							<div className="mt-8 w-full text-center flex items-center justify-center">
								<img
									className="h-auto w-52"
									src="/artist-graphic.svg"
									alt="music note graphic"
								/>
							</div>
							<p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">
								Rightoken empowers artists by letting them control monetization and ownership. Artists are given the tools to write their own terms for the investment agreement and have the option to upgrade or undo tokenization.
							</p>
						</div>

						<br />
						<br />

						<div className="border-2 border-indigo-100 border-opacity-80 bg-gradient-to-r from-green-50 to-blue-50 rounded-md px-16 py-10 max-w-xl flex flex-col place-items-center place-self-center m-auto">
							<p className="text-center text-xs font-extrabold uppercase mb-2">Tokenize your song</p>
							<br />
							<p className="text-xs font-mono my-2">
								By signing up below you acknowledge you are the sole owner of the sound recording rights associated with the uploaded file. You agree that all rights will be transferred to tokenholders. 
								<br />
								<br />
								This process is reverted if the token is burned. After approval, 100% of tokenized rights for the song provided will be transferred to the wallet address provided for the artist to disburse, sell, or swap with any other user on the blockchain.
							</p>
							<p className="text-xs font-mono text-center">❦</p>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full py-4" />
							<br />
							<br />
							<div>
								<div>
									<p className="tracking-widest text-center font-extrabold text-2xl mb-6 text-indigo-600 uppercase py-6">• Presenting •</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none max-w-md py-2 text-3xl font-mono text-gray-700 font-center" spellCheck="false" placeholder="Song Title" value={songTitle} onChange={e => setSongTitle(event.target.value)} />
								</div>
								<br />
								<br />
								<div className="flex flex-col">
									<p className="tracking-wider text-center italic font-bold text-lg mb-4 text-gray-800">☟ by the illustrious ☟</p>
									<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none py-2 text-2xl font-mono text-gray-700 place-self-center" spellCheck="false" placeholder="Artist Name" value={artistName} onChange={e => setArtistName(event.target.value)} />
								</div>
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full py-4" />
							<br />
							<br />
							<div className="flex flex-col">
								<p className="tracking-wider text-center italic font-bold text-lg mb-4 text-gray-800 py-4">initially offering</p>
								<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none py-2 text-2xl font-mono text-gray-700 place-self-center" spellCheck="false" placeholder="10%" type="number" min="0.5" max="100" step="0.5" value={saleAmount} onChange={e => setSaleAmount(event.target.value)} />
							</div>
							<br />
							<br />
							<div className="flex flex-col">
								<p className="tracking-wider text-center italic font-bold text-lg mb-4 text-gray-800 py-4">for the low price of</p>
								<input className="bg-transparent font-semibold border-indigo-100 border-b-2 outline-none py-2 text-2xl font-mono text-gray-700 place-self-center" spellCheck="false" placeholder="(X Eth / 100%)" type="number" min="0.1" step="0.1" value={askingPrice} onChange={e => setAskingPrice(event.target.value)} />
							</div>

							<br />
							<br />
							
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full py-6" />
							<br />
							<br />
							<p className="my-2 text-md text-center font-semibold italic">The Rightoken holder shall agree to the following and be granted the rights included</p>
							<p className="text-md text-center font-semibold font-mono">~</p>
							<br />
							<div className="space-y-12">
								{Object.keys(legalAgreementLibrary).map(sectionKey => getLegalAgreementSectionJSX(sectionKey))}
							</div>
							<br />
							<br />
							<div className="border-b-2 border-indigo-100 border-dotted border-opacity-80 min-w-full py-4" />
							<br />
							<br />
							<div className="flex flex-row text-sm word-wrap py-4">
								<p>I,&nbsp;<input className="bg-transparent outline-none border-b-2 border-indigo-100" placeholder="Full Legal Name" value={legalName} onChange={e => setLegalName(event.target.value)}  />,&nbsp;affirm I am the rightful owner of sound recording and agree to the terms constructed above.</p>
							</div>
							<br />
							<br />
							<RoundedButton onClick={() => mintRightoken()} customBG className={"max-w-md m-auto uppercase bg-green-400 hover:bg-green-500" + " " + (minting && "animate-pulse")} textClassName="text-xs font-bold" text={minting ? "Minting..." : "Mint"} />
						</div>
					</div>
				</div>

			</main>

			<Footer />
		</>
	)
}
