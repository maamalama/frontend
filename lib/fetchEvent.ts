import { parseUnits } from '@ethersproject/units'
import { BASE_URL } from '../data/constants'
import { EventInfo } from '../data/events'
import { Filter } from '../hooks/useFilters'

export const fetchEvent = (filters: Filter[], event: EventInfo) => {
  const amounts = filters
    .map((x) => (x.type == 'erc20' ? parseUnits(x.amount, x.decimals).toString() : x.amount))
    .join(',')

  const addresses = filters.map((x) => x.address).join(',')
  const networks = filters.map((x) => x.chainId).join(',')

  return fetch(
    `${BASE_URL}/event?tokens=${addresses}&amounts=${amounts}&days=90&networks=${networks}&event=${event.value}`
  )
}
