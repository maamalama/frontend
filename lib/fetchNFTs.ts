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

export const fetchNftAnalytics = async (token: string) => {
  let nftHoldingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=nft&limit=25`).then(res => res.json())
  let holdingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=erc20&limit=25`).then(res => res.json())
  let holdersReq = fetch(`${BASE_URL}/nft/holders?token=${token}`).then(res => res.json())

  let [nftHoldings, holdings, holders] =
    await Promise.all([nftHoldingsReq, holdingsReq, holdersReq]) as [NftToErc20Holding[], NftToErc20Holding[], NftHolder[]]
  const balances = holders.map(h => h.total_balance_usd).sort((a, b) => a - b)

  let holdersTotal = holders.length
  let avgNetWorthInUsd =
    balances.reduce((x, y) => x + y, 0)
  let medianPortfolioValueInUsd =
    balances.length % 1
      ? balances[balances.length / 2 | 0]
      : (balances?.[balances.length / 2] + balances?.[balances.length / 2 - 1]) / 2

  return {
    holdings: holdings.slice(0, 20),
    nftHoldings: nftHoldings.slice(0, 20),
    holders: holders.slice(0, 20),
    stats: { holdersTotal, avgNetWorthInUsd, medianPortfolioValueInUsd },
  }
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

export type NftHolder = {
  address: string
  amount: number
  total_balance_usd: number
}
