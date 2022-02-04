import create from 'zustand'

export type FilterType = {
  type: 'erc20' | 'nft'
  amount: number
  address: string
  network: 'eth' | 'matic'
  id?: number
  label: string
}

export type State = {
  filters: FilterType[]
  addFilter: (filter: FilterType) => void
  removeFilter: (filter: FilterType) => void
  editFilter: (filter: FilterType) => void
  counter: number
}

const objHash = (x: FilterType) => `${x.type}${x.address}${x.network}${x.amount}`

const replaceBlock = (filters: FilterType[], newFilter: FilterType): FilterType[] => {
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
  removeFilter: (filter) =>
    set((state) => ({
      ...state,
      filters: state.filters.filter((x) => objHash(x) !== objHash(filter))
    })),
  editFilter: (newFilter) =>
    set((state) => {
      return { ...state, filters: replaceBlock(state.filters, newFilter) }
    })
}))
