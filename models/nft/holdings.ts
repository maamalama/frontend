import { ChainId } from '../../data/networks'
import { createEffect } from 'effector'
import { BASE_URL } from '../../data/constants'
import { createTiedStore } from './createTiedStore'

export type NftHolding = {
  token: {
    network: ChainId
    address: string
    name: string
    symbol: string
    decimals: number
    logo: string
  }
  holders: number
  share: number
}

const fetchNftHoldingsFx = createEffect({
  name: 'fetch NFT holdings',
  async handler({ address }): Promise<NftHolding[]> {
    return await fetch(`${BASE_URL}/nft/holdings?token=${address}&type=nft&limit=25`).then(res => res.json())
  },
})

export const fetchErc20HoldingsFx = createEffect({
  name: 'fetch ERC20 holdings',
  async handler({ address }): Promise<NftHolding[]> {
    return await fetch(`${BASE_URL}/nft/holdings?token=${address}&type=erc20&limit=25`).then(res => res.json())
  },
})

export const $nftHoldings = createTiedStore(fetchNftHoldingsFx)

export const $erc20Holdings = createTiedStore(fetchErc20HoldingsFx)
