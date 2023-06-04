import { InjectedConnector } from '@web3-react/injected-connector'
// import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'

// import { AuthereumConnector } from '@web3-react/authereum-connector'
// import { FortmaticConnector } from '@web3-react/fortmatic-connector'
// import Portis from '@portis/web3'
import Web3 from 'web3'
const POLLING_INTERVAL = 12000

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
  4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 137, 56, 97, 250, 80001, 4002],
})

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1] },
//   defaultChainId: 1,
// })

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [1],
  pollingInterval: POLLING_INTERVAL,
})

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[1],
//   appName: 'web3-react example',
// })

// export const authereum = new AuthereumConnector({ chainId: 42 })

// export const fortmatic = new FortmaticConnector({
//   apiKey: process.env.FORTMATIC_API_KEY,
//   chainId: 4,
// })

// export const portis = new Portis(
//   '38191a58-5891-405a-b6f9-c2053efffddf',
//   'mainnet'
// )
// export const web3 = new Web3(portis.provider)
