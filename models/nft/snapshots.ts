import { merge, sample, createEffect, restore } from 'effector'
import { BASE_URL } from '../../data/constants'
import { $isAuthor, $myNftAddress } from '../me'
import { initialized } from '../app'

export type Snapshot = {
  id: number
  nfts: string[]
  created_at: Date
  block: number
  holders_count: number
  title: string
  filters: string
}

export const fetchSnapshotsFx = createEffect({
  name: 'fetch-snapshots',
  async handler(args: { address: string }): Promise<Snapshot[]> {
    let res = await fetch(`${BASE_URL}/snapshots/list?nftAddress=${args.address}`).then(res => res.json())
    return res.data.map(s => ({ ...s, created_at: new Date(s.created_at), filters: JSON.parse(s.filters || '{}') }))
  }
})

export const $snapshots = restore<Snapshot[]>(fetchSnapshotsFx.doneData, [])
  .reset($myNftAddress.updates)

sample({
  clock: merge([initialized, $myNftAddress.updates]),
  source: $myNftAddress,
  filter: $isAuthor,
  fn: (address) => ({ address }),
  target: fetchSnapshotsFx,
})

fetchSnapshotsFx.fail.watch(console.log)
