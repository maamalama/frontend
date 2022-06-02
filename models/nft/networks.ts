import { createEffect } from 'effector'
import { BASE_URL } from '../../data/constants'
import { createTiedStore } from './createTiedStore'

export type NetworkStat = {
  name: string
  logo: string
  url: string
  users_last_month: number
  users_in_total: number
}

const fetchNetworksUsedByNftHoldersFx = createEffect({
  name: 'fetch networks used by holders of nft',
  async handler({ address, limit = 20 }): Promise<NetworkStat[]> {
    return await fetch(`${BASE_URL}/nft/networks?token=${address}&limit=${limit}`).then(res => res.json())
  },
})

export const $networks = createTiedStore(fetchNetworksUsedByNftHoldersFx)
