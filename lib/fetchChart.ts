import { parseUnits } from '@ethersproject/units'
import { Filter } from '../hooks/useFilters'

const BASE_URL = 'https://awake-api.vercel.app/api'

export const fetchChart = (filters: Filter[]) => {
  const amounts = filters
    .map((x) => (x.type == 'erc20' ? parseUnits(x.amount, x.decimals).toString() : x.amount))
    .join(',')

  const addresses = filters.map((x) => x.address).join(',')
  const networks = filters.map((x) => x.chainId).join(',')

  return fetch(`${BASE_URL}/users?tokens=${addresses}&amounts=${amounts}&days=90&network=${networks}`)
}
