import { attach, createEffect, createEvent, merge, restore, sample } from 'effector'
import { BASE_URL } from '../../data/constants'
import { $isAuthor, $myNft, $myNftAddress } from '../me'
import { initialized } from '../app'
import { capitalize } from '../../lib/capitalize'

export type Snapshot = {
  id: number
  nfts: string[]
  created_at?: Date
  block?: number | null
  holders_count?: number
  holders?: string[]
  title: string
  filters?: string[]
  loading?: boolean
}

export const addSnapshot = createEvent<Snapshot>('add-snapshot')
export const addSnapshotAtBlock = createEvent<{ block: number }>('add-snapshot-at-block')
export const addSnapshotWithFilters = createEvent<{ filters: string[], holders: string[] }>('add-snapshot-with-filters')

export const changeSnapshotTitle = createEvent<{ id: number, title: string }>('change-snapshot-title')

export const newSnapshotFx = createEffect({
  name: 'add-snapshot',
  async handler(s: { title: string, nfts: string[], block?: number | null, holders?: string[], filters?: string[] }): Promise<void> {
    await fetch(`${BASE_URL}/snapshots/new?nftAddress=${s.nfts[0]}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(s),
    })
  }
})

export const fetchSnapshotsFx = createEffect({
  name: 'fetch-snapshots',
  async handler(args: { address: string }): Promise<Snapshot[]> {
    let res = await fetch(`${BASE_URL}/snapshots/list?nftAddress=${args.address}`).then(res => res.json())
    return await Promise.all(res.data.map(async s => ({
      ...s,
      created_at: new Date(s.created_at),
      filters: JSON.parse(s.filters || '[]'),
    })))
  }
})

export const changeSnapshotTitleFx = createEffect({
  name: 'change-snapshot',
  async handler({ id, title }: { id: number, title: string }): Promise<void> {
    await fetch(`${BASE_URL}/snapshots/changeTitle/?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`)
      .then(res => res.json())
  }
})

export const $snapshots = restore<Snapshot[]>(fetchSnapshotsFx.doneData, [])
  .reset($myNftAddress.updates)
  .on(changeSnapshotTitle, (state, payload) =>
    state.map(s => s.id === payload.id ? { ...s, title: payload.title } : s))
  .on(addSnapshot, (state, payload) => [{
    ...payload,
    holders_count: payload.holders?.length ?? 0,
    created_at: payload.created_at ?? new Date(),
    filters: payload.filters ?? [],
    loading: true,
  }, ...state])

sample({
  clock: merge([initialized, $myNftAddress.updates, newSnapshotFx.finally]),
  source: $myNftAddress,
  filter: $isAuthor,
  fn: (address) => ({ address }),
  target: fetchSnapshotsFx,
})

sample({
  source: addSnapshot,
  target: newSnapshotFx,
})

sample({
  clock: addSnapshotAtBlock,
  source: { myNft: $myNft, snapshots: $snapshots },
  fn: ({ myNft, snapshots }, { block }): Snapshot => {
    let lastId = (snapshots[0]?.id ?? 0)

    let id = lastId + 1
    let title = `${capitalize(myNft.name)} ${id}`
    let nfts = [myNft.address]

    return { id, nfts, title, block }
  },
  target: addSnapshot,
})

sample({
  clock: addSnapshotWithFilters,
  source: { myNft: $myNft, snapshots: $snapshots },
  fn: ({ myNft, snapshots }, { filters, holders }): Snapshot => {
    let lastId = (snapshots[0]?.id ?? 0)

    let id = lastId + 1
    let title = `${capitalize(myNft.name)} ${id}`
    let nfts = [myNft.address]

    return { id, title, nfts, filters, holders }
  },
  target: addSnapshot,
})

sample({
  source: changeSnapshotTitle,
  target: changeSnapshotTitleFx,
})

fetchSnapshotsFx.fail.watch(console.error)
newSnapshotFx.fail.watch(console.error)
