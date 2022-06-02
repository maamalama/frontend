import { ChainId } from '../../data/networks'
import { createEffect, restore, sample } from 'effector'
import { BASE_URL } from '../../data/constants'
import { persist } from 'effector-storage/local'
import { initialized } from '../app'

export type Nft = {
  address: string
  name: string
  symbol: string
  logo: string
  label: string
  chainId: ChainId
}

export const fetchAuthorNFTsFx = createEffect({
  name: 'fetch nft collections',
  async handler({}) {
    let url = `${BASE_URL}/nft/all`
    let req = await fetch(url)
    let list: Nft[] = await req.json()
    return list.map(it => ({ ...it, label: it.name, chainId: ChainId.ETH })) as Nft[]
  },
})

export const $nfts = restore(fetchAuthorNFTsFx.doneData, [])

persist({ store: $nfts, key: 'myNfts' })

sample({
  clock: initialized,
  fn: () => ({}),
  target: fetchAuthorNFTsFx,
})
