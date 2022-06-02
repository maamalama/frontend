import { createEffect } from 'effector'
import { BASE_URL } from '../../data/constants'
import { createTiedStore } from './createTiedStore'

export type ProtocolStat = {
  name: string
  logo: string
  url: string
  users_last_month: number
  users_in_total: number
}

const fetchProtocolsUsedByNftHoldersFx = createEffect({
  name: 'fetch protocols used by holders of nft',
  async handler({ address, limit = 20 }): Promise<ProtocolStat[]> {
    return await fetch(`${BASE_URL}/nft/protocols?token=${address}&limit=${limit}`).then(res => res.json())
  },
})

export const $protocols = createTiedStore(fetchProtocolsUsedByNftHoldersFx)
