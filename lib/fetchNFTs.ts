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
  let statsReq = fetch(`${BASE_URL}/nft/stats?token=${token}`).then(res => res.json())
  let nftHoldingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=nft&limit=25`).then(res => res.json())
  let holdingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=erc20&limit=25`).then(res => res.json())
  let holdersReq = fetch(`${BASE_URL}/nft/holders?token=${token}`).then(res => res.json())
  // let protocolsReq = fetch(`${BASE_URL}/nft/protocols?token=${token}`).then(res => res.json())

  let protocolsReq = Promise.resolve([
    { name: 'Uniswap V2', usersLastMonth: 120, usersInTotal: 304 },
    { name: 'Uniswap V3', usersLastMonth: 451, usersInTotal: 958 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
    { name: 'SushiSwap', usersLastMonth: 75, usersInTotal: 231 },
  ])

  let [protocols, stats, nftHoldings, holdings, holders] =
    await Promise.all([protocolsReq, statsReq, nftHoldingsReq, holdingsReq, holdersReq]) as
      [ProtocolStat[], NftStats, NftToErc20Holding[], NftToErc20Holding[], NftHolder[]]

  const balances = holders.map(h => h.total_balance_usd).sort((a, b) => a - b)

  let holdersTotal = stats.total

  let avgNetWorthInUsd =
    balances.reduce((x, y) => x + y, 0)

  let medianPortfolioValueInUsd =
    balances.length % 1
      ? balances[balances.length / 2 | 0]
      : (balances?.[balances.length / 2] + balances?.[balances.length / 2 - 1]) / 2

  return {
    token: stats.token,
    holdings: holdings.slice(0, 20),
    nftHoldings: nftHoldings.slice(0, 20),
    holders: holders.slice(0, 10),
    protocols,
    stats: {
      activity: {
        day: stats.active_1d,
        week: stats.active_7d,
        month: stats.active_30d,
      },
      holdersTotal,
      avgNetWorthInUsd,
      medianPortfolioValueInUsd,
    },
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

export type NftStats = {
  token: {
    network: ChainId
    address: string
    name: string
    symbol: string
    logo: string
  }
  active_1d: number
  active_7d: number
  active_30d: number
  total: number
}

export type ProtocolStat = {
  name: string
  usersLastMonth: number
  usersInTotal: number
}
