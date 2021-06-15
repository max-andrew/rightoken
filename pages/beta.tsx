import Head from 'next/head'

import { Fragment, useEffect, useState, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import Header from '../components/Header'
import RoundedLinkButton from '../components/RoundedLinkButton'
import RoundedButton from '../components/RoundedButton'
import Footer from '../components/Footer'

import { enable, openQR, providerinfo, disconnect } from "../functions/walletConnect.js"

import Web3 from "web3"
import { web3Modal } from "../functions/Web3Modal.js"

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core"
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector"
import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector"
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector"

import { Web3Provider } from "@ethersproject/providers"
import { formatEther } from "@ethersproject/units"

import {
	injected,
	walletconnect,
} from "../functions/connectors"
import { useEagerConnect, useInactiveListener } from "../hooks/web3Hooks"

const connectorsByName = {
	Injected: injected,
	WalletConnect: walletconnect
}

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile."
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account."
  } else {
    console.error(error)
    return "An unknown error occurred. Check the console for more details."
  }
}

import { AppContext, useAppContext, setAppContext } from '../context/AppContext'

export default function Beta(props) {
	const context = useWeb3React()
	const {
	connector,
	library,
	chainId,
	account,
	activate,
	deactivate,
	active,
	error
	} = context

	// handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    console.log('running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  // set up block listener
  const [blockNumber, setBlockNumber] = useState()
  useEffect(() => {
    console.log('running')
    if (library) {
      let stale = false

      console.log('fetching block number!!')
      library
        .getBlockNumber()
        .then(blockNumber => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = blockNumber => {
        setBlockNumber(blockNumber)
      }
      library.on("block", updateBlockNumber)

      return () => {
        library.removeListener("block", updateBlockNumber)
        stale = true
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId])

  // fetch eth balance of the connected account
  const [ethBalance, setEthBalance] = useState()
  useEffect(() => {
    console.log('running')
    if (library && account) {
      let stale = false

      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setEthBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null)
          }
        })

      return () => {
        stale = true
        setEthBalance(undefined)
      }
    }
  }, [library, account, chainId])

  // log the walletconnect URI
  useEffect(() => {
    console.log('running')
    const logURI = uri => {
      console.log("WalletConnect URI", uri)
    }
    walletconnect.on(URI_AVAILABLE, logURI)

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI)
    }
  }, [])

	const [provider, setProvider] = useState("")
	const [web3, setWeb3] = useState("")

	useEffect(() => {
		if (web3 === "" && provider !== "") {
			setWeb3(new Web3(provider))
		}
	})

	// log the walletconnect URI
	useEffect(() => {
	console.log('running')
	const logURI = uri => {
	console.log("WalletConnect URI", uri)
	}
	walletconnect.on(URI_AVAILABLE, logURI)

	return () => {
	walletconnect.off(URI_AVAILABLE, logURI)
	}
	}, [])

	//useAppContext().setSharedState({test:"hellooooooofdsf"})

	const getAccount = async () => {
		if (web3 === "")
			return ""

		const accounts = await web3.eth.getAccounts()
		return accounts[0]
	}

	const disconnect = async () => {
		if (web3 === "")
			return ""

		provider.disconnect()
		.then(setWeb3(""))
	}

	const connectWallet = () => {
		if (web3 !== "")
			return ""

		web3Modal.connect()
		.then(p => setProvider(p))
		.catch(e => console.log(e))

		// AppContext.useContext()
	}

	const testfunct = async () => {
		console.log("fodfoadaf")
	}

	return (
		<div>
			<Head>
				<title>Rightoken</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />

				<div className="py-12 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Join the beta test { /*useAppContext().sharedState.test */ }
							</p>
					</div>

					<div className="mt-16 max-w-md md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-x-10 md:gap-x-8 gap-y-6 md:gap-y-16 self-center justify-items-center text-center md:text-left m-auto">
						<p className="text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
							1.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Download a crypto wallet
							</p>
							<p className="text-sm font-mono">
								The MetaMask app is how you store your rightokens independently of the organization. Other wallets might work, but aren't yet fully supported.
							</p>
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-4">
							<RoundedLinkButton link="https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=930587986804252278" textClassName="text-sm font-bold" text="For iOS" />
							<RoundedLinkButton link="https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=930682544992985021" className="bg-purple-400 hover:bg-purple-500" textClassName="text-sm font-bold" text="For Android" />
						</div>

						<p className="mt-10 text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
							2.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold line-through">
								Connect your wallet
							</p>
							<p className="text-sm font-mono">
								Hit Connect and use your phone camera to scan the QR code.
							</p>
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
							<RoundedButton onClick={() => connectWallet()} textClassName="text-sm font-bold" text="Connect wallet" />
							<RoundedButton onClick={() => getAccount().then(x => console.log(x))} textClassName="text-sm font-bold" text="Test" />
							{ connector && (
								<RoundedButton onClick={() => connector.close()} className="bg-red-200 hover:bg-red-300" textClassName="text-sm font-bold" text="Disconnect" />
							)}
						</div>

						<p className="mt-10 text-4xl font-mono font-semibold self-center md:place-self-center md:justify-self-end">
							3.
						</p>
						<div className="w-full lg:max-w-xs self-center sm:place-self-center space-y-3">
							<p className="text-2xl font-semibold">
								Start investing
							</p>
							<p className="text-sm font-mono">
								Support growing artists and build your portfolio. Browse rightokens on the market now at the marketplace.
							</p>
						</div>
						<div className="flex flex-col self-center text-center w-1/2 md:justify-self-start space-y-3">
							<RoundedLinkButton link="/marketplace" text="Invest now" textClassName="text-sm font-bold" />
						</div>
					</div>
				</div>

			</main>

			      <div
        style={{
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "20rem",
          margin: "auto"
        }}
      >
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled =
            !triedEager || !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                borderColor: activating
                  ? "orange"
                  : connected
                  ? "green"
                  : "unset",
                cursor: disabled ? "unset" : "pointer",
                position: "relative"
              }}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  margin: "0 0 0 1rem"
                }}
              >
                {activating && (
                  /*<Spinner
                    color={"black"}
                    style={{ height: "25%", marginLeft: "-1rem" }}
                  />*/
                  <p>Activating</p>
                )}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
      </div>

      <div style={{ padding: "1rem" }}>
      <h1 style={{ margin: "0", textAlign: "right" }}>
        {active ? "🟢" : error ? "🔴" : "🟠"}
      </h1>
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
      </div>

			{/*<Footer />*/}
		</div>
	)
}
