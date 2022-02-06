import create from 'zustand'
import { ChainId } from '../data/networks'

export type FilterType = 'erc20' | 'nft'

export type Filter = {
  type: FilterType
  amount?: string
  address?: string
  chainId?: ChainId
  decimals?: number
  id?: number
  label: string
}

export type State = {
  filters: Filter[]
  addFilter: (filter: Filter) => void
  removeFilter: (filterId: number) => void
  editFilter: (filter: Filter) => void
  counter: number
}

export const useFilters = create<State>((set) => ({
  filters: [
    {
      address: '0x026224a2940bfe258d0dbe947919b62fe321f042',
      label: 'lobsterdao',
      symbol: 'LOBS',
      logo: 'https://etherscan.io/token/images/lobsterdao_32.png',
      chainId: 1,
      amount: '1',
      type: 'nft',
      id: 1
    }
  ],
  counter: 1,
  addFilter: (filter) =>
    set(({ filters, counter }) => {
      const id = counter + 1

      return {
        counter: id,
        filters: [
          ...filters,
          {
            ...filter,
            id
          }
        ]
      }
    }),
  removeFilter: (filterId) =>
    set(({ filters, counter }) => {
      return {
        counter,
        filters: filters.length > 1 ? filters.filter((x) => x.id !== filterId) : filters
      }
    }),
  editFilter: (newFilter) =>
    set(({ filters, counter }) => {
      return {
        counter,
        filters: filters.map((filter) => {
          if (newFilter.id === filter.id) {
            return newFilter
          }
          return filter
        })
      }
    })
}))
