import { merge, sample, createEffect, restore, createEvent } from 'effector'
import { BASE_URL } from '../../data/constants'
import { $isAuthor, $myNftAddress } from '../me'
import { initialized } from '../app'
import { sha256 } from '../../lib/sha256'

export type Snapshot = {
  id: number
  nfts: string[]
  created_at: Date
  block: number
  holders_count: number
  title: string
  filters: string[]
  externalId?: string
}

export const addSnapshot = createEvent<Snapshot>('add-snapshot')

export const fetchSnapshotsFx = createEffect({
  name: 'fetch-snapshots',
  async handler(args: { address: string }): Promise<Snapshot[]> {
    let res = await fetch(`${BASE_URL}/snapshots/list?nftAddress=${args.address}`).then(res => res.json())
    console.dir(res, { depth: null })
    return await Promise.all(res.data.map(async s => ({
      ...s,
      created_at: new Date(s.created_at),
      filters: JSON.parse(s.filters || '[]'),
      externalId: s.externalId ?? await sha256(s.nfts.join() + s.id.toString())
    })))
  }
})

export const $snapshots = restore<Snapshot[]>(fetchSnapshotsFx.doneData, [])
  .reset($myNftAddress.updates)
  .on(addSnapshot, (state, payload) => [payload, ...state])

sample({
  clock: merge([initialized, $myNftAddress.updates]),
  source: $myNftAddress,
  filter: $isAuthor,
  fn: (address) => ({ address }),
  target: fetchSnapshotsFx,
})

fetchSnapshotsFx.fail.watch(console.log)
