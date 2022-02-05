import create from 'zustand'
import { ChainId } from '../data/networks'

export type FilterType = 'erc20' | 'nft' | 'opensea'

export type Filter = {
  type: FilterType
  amount?: string
  address?: string
  chainId?: ChainId
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

const replaceBlock = (filters: Filter[], newFilter: Filter): Filter[] => {
  const oldBlockIdx = filters.findIndex((item) => item.id === newFilter.id)

  if (oldBlockIdx !== -1) {
    const newBlocks = filters

    newBlocks[oldBlockIdx] = newFilter

    return newBlocks
  } else {
    return filters
  }
}

export const useFilters = create<State>((set) => ({
  filters: [],
  counter: 0,
  addFilter: (filter) =>
    set(({ filters, counter }) => {
      const id = counter + 1

      return {
        counter: id,
        filters: [...filters, { ...filter, id }]
      }
    }),
  removeFilter: (filterId) =>
    set(({ filters, counter }) => ({
      counter,
      filters: filters.filter((x) => x.id !== filterId)
    })),
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
