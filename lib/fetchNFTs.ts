import { BASE_URL } from '../data/constants'
import { ChainId } from '../data/networks'
import { rng } from './random'
import { ProtocolStat } from '../models/nft/protocols'
import { NetworkStat } from '../models/nft/networks'
import { NftHolding } from '../models/nft/holdings'
import { NftHolder } from '../models/nft/holders'

export const fetchNftAnalytics = async (token: string) => {
  let holdingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=erc20&limit=25`).then(res => res.json())
  let nftHoldingsReq = fetch(`${BASE_URL}/nft/holdings?token=${token}&type=nft&limit=25`).then(res => res.json())
  let holdersReq = fetch(`${BASE_URL}/nft/holders?token=${token}`).then(res => res.json())
  let statsReq = fetch(`${BASE_URL}/nft/stats?token=${token}`).then(res => res.json())
  let protocolsReq = fetch(`${BASE_URL}/nft/protocols?token=${token}&limit=20`).then(res => res.json())
  let networksReq = fetch(`${BASE_URL}/nft/networks?token=${token}&limit=20`).then(res => res.json())

  let [networks, protocols, stats, nftHoldings, holdings, holders] =
    await Promise.all([networksReq, protocolsReq, statsReq, nftHoldingsReq, holdingsReq, holdersReq]) as
      [NetworkStat[], ProtocolStat[], NftStats, NftHolding[], NftHolding[], NftHolder[]]

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
    networks,
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

export function randomify(token: string, data: Awaited<ReturnType<typeof fetchNftAnalytics>>): Awaited<ReturnType<typeof fetchNftAnalytics>> {
  rng.seed(parseInt(token.slice(token.length - 10), 16))
  let protocols = data.protocols.filter(p => p.users_in_total >= data.stats.holdersTotal / 100)
  return {
    ...data,
    holdings: data.holdings,
    nftHoldings: data.nftHoldings,
    holders: data.holders,
    protocols: data.protocols.slice(0, Math.max(protocols.length, data.networks.length)),
    networks: data.networks,
    stats: data.stats,
  }
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
