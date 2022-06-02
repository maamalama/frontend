import { $holders } from './holders'

export const $metrics = $holders.map(holders => {
  const balances =
    (holders.data || []).map(h => h.total_balance_usd).sort((a, b) => a - b)
  const avgNetWorthInUsd =
    balances.reduce((x, y) => x + y, 0)
  const medianPortfolioValueInUsd = balances.length % 1
    ? balances[balances.length / 2 | 0]
    : (balances?.[balances.length / 2] + balances?.[balances.length / 2 - 1]) / 2
  return {
    ...holders,
    data: {
      avgNetWorthInUsd,
      medianPortfolioValueInUsd,
    },
  }
})
