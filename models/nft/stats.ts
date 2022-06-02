import { ChainId } from '../../data/networks'
import { BASE_URL } from '../../data/constants'
import { createEffect } from 'effector'
import { createTiedStore } from './createTiedStore'

export type Stats = {
  token: {
    network: ChainId
    address: string
    name: string
    symbol: string
    logo: string
  }
  active_1d: number
  active_7d: number
  active_30d: number
  total: number
}

const fetchNftStatsFx = createEffect({
  name: 'fetch nft stats',
  async handler({ address }): Promise<Stats> {
    return await fetch(`${BASE_URL}/nft/stats?token=${address}`).then(res => res.json())
  }
})

export const $stats = createTiedStore(fetchNftStatsFx, {} as any)
