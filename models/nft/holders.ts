import { createEffect } from 'effector'
import { BASE_URL } from '../../data/constants'
import { createTiedStore } from './createTiedStore'

export type NftHolder = {
  address: string
  amount: number
  total_balance_usd: number
  first_transfer: number
  logo?: string
  domain?: string | null
  discord?: string | null
  twitter?: string | null
  tokens: string[]
}

const fetchHoldersFx = createEffect({
  name: 'fetch holders',
  async handler({ address }): Promise<NftHolder[]> {
    let [holders, tokenUris, { results: users }] =
      await Promise.all([
        fetch(`${BASE_URL}/nft/holders?token=${address}`).then(res => res.json()),
        fetch(`/token-uris/${address}.json`).then(res => res.json()).catch(() => []),
        fetch(`https://randomuser.me/api/?results=30&seed=${address}&noinfo&inc=username,login`).then(res => res.json()),
      ])

    return holders.map((h, idx) => ({
      ...h, ...{
        discord: h.discord ?? users?.[idx]?.login?.username?.replace(/(\d+)/, '#$1'),
        tokens: [
          tokenUris[(idx * 3) % tokenUris.length],
          tokenUris[(idx * 3 + 1) % tokenUris.length],
          tokenUris[(idx * 3 + 2) % tokenUris.length],
        ].slice(0, Math.min(3, h.amount)),
      },
    }))
  }
})

export const $holders = createTiedStore(fetchHoldersFx)
