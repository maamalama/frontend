import { EventInfo } from '../data/events'
import { Filter } from '../hooks/useFilters'

export const createHeader = (filters: Filter[], event?: EventInfo): string => {
  let strings: string[] = []

  const nfts = new Set(
    filters
      .filter((f) => f.type === 'nft')
      .map((s) => {
        return s.symbol
      })
  )
  const tokens = new Set(filters.filter((f) => f.type === 'erc20').map((s) => s.symbol))

  if (nfts.size > 0) strings.push(`${Array.from(nfts).join(', ')} holders`)

  if (tokens.size > 0) strings.push(`${Array.from(tokens).join(', ')} owners`)

  return event && event.label !== 'No event - total amount of users'
    ? `Total amount of ${event.label} by ${strings.join(', ')}`
    : strings.join(', ')
}
