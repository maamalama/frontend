import { BASE_URL } from '../data/constants'
import { ChainId } from '../data/networks'

export type Nft = {
  address: string
  name: string
  symbol: string
  logo: string
}

export const fetchNFTs = () => {
  return fetch(`${BASE_URL}/nft/all`)
    .then(res => res.json())
    .then((list: Nft[]) => list.map(it => ({ ...it, label: it.name, chainId: ChainId.ETH })))
}

const staticStats = {
  '0x026224a2940bfe258d0dbe947919b62fe321f042': {
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  },
  '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d': {
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  },
  '0x1A92f7381B9F03921564a437210bB9396471050C': {
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  },
  '0x23581767a106ae21c074b2276D25e5C3e136a68b': {
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  },
  '0x938e5ed128458139a9c3306ace87c60bcba9c067': {
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  },
}

export const fetchNftStats = (token: string) => {
  return Promise.resolve({
    holdersTotal: 2000,
    avgNetWorthInUsd: 1345,
    medianPortfolioValueInUsd: 1000,
  })
}

export type NftToErc20Holding = {
  token: {
    network: ChainId
    address: string
    name: string
    symbol: string
    decimals: number
    logo: string
  }
  holders: number
  share: number
}

export const fetchNftHoldings = (token: string) => {
  return fetch(`${BASE_URL}/nft/holdings?token=${token}`)
    .then(res => res.json())
    .then((list: NftToErc20Holding[]) => list.slice(0, 20))
}

export type NftHolder = {
  address: string
  amount: number
  total_balance_usd: number
}

export const fetchNftHolders = (token: string) => {
  return fetch(`${BASE_URL}/nft/holders?token=${token}`)
    .then(res => res.json())
    .then((list: NftHolder[]) => list.slice(0, 20))
}
