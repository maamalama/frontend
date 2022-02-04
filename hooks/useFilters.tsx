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
    set((state) => {
      const id = state.counter + 1

      return {
        ...state,
        counter: id,
        filters: [...state.filters, { ...filter, id }]
      }
    }),
  removeFilter: (filterId) =>
    set((state) => ({
      ...state,
      filters: state.filters.filter((x) => x.id !== filterId)
    })),
  editFilter: (newFilter) =>
    set((state) => {
      return { ...state, filters: replaceBlock(state.filters, newFilter) }
    })
}))
