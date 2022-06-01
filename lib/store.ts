import { createStore, createEvent, createEffect, combine, restore, sample } from 'effector'
import { BASE_URL } from '../data/constants'
import { ChainId } from '../data/networks'
import connectLocalStorage from 'effector-localstorage'

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


const $nftsLocalStorage = connectLocalStorage('nfts')

export const $nfts = createStore<Nft[]>($nftsLocalStorage.init([]))
  .on(fetchAuthorNFTsFx.doneData, (_, payload) => payload)

$nfts.watch($nftsLocalStorage) // update localStorage on every store change


export const setCurrentNftAddress = createEvent<string>('setCurrentNftAddress')

const $currentNftAddressStorage = connectLocalStorage('currentNftAdress')

export const $currentNftAddress =
  createStore<string>($currentNftAddressStorage.init('0x026224a2940bfe258d0dbe947919b62fe321f042'))
    .on(setCurrentNftAddress, (_, payload) => payload)

$currentNftAddress.watch($currentNftAddressStorage) // update localStorage on every store change


export const $currentNft = combine(
  $nfts, $currentNftAddress,
  (nfts, address) => nfts.find(n => n.address === address)
)


export type NftHolder = {
  address: string
  amount: number
  total_balance_usd: number
  first_transfer: number
  logo?: string
  domain?: string | null
  discord?: string | null
  twitter?: string | null
  isFav?: boolean
  tokens: string[]
}

export const fetchHoldersFx = createEffect({
  name: 'fetch holders',
  async handler({ nftAddress }): Promise<NftHolder[]> {
    let [holders, tokenUris, { results: users }] =
      await Promise.all([
        fetch(`${BASE_URL}/nft/holders?token=${nftAddress}`).then(res => res.json()),
        fetch(`/token-uris/${nftAddress}.json`).then(res => res.json()).catch(() => []),
        fetch(`https://randomuser.me/api/?results=30&seed=${nftAddress}&noinfo&inc=picture,username,login`).then(res => res.json()),
      ])

    return holders.map((h, idx) => ({
      ...h, ...{
        logo: h.logo ?? users?.[idx]?.picture?.thumbnail,
        discord: h.discord ?? users?.[idx]?.login?.username?.replace(/(\d+)/, '#$1'),
        tokens: [
          tokenUris[(idx * 3) % tokenUris.length],
          tokenUris[(idx * 3 + 1) % tokenUris.length],
          tokenUris[(idx * 3 + 2) % tokenUris.length],
        ].slice(0, Math.min(3, h.amount)),
        isFav: Math.random() < 0.2,
      },
    }))
  }
})

export const openHoldersPage = createEvent('open holders page')

sample({
  source: $currentNftAddress,
  clock: openHoldersPage,
  filter: Boolean,
  fn: nftAddress => ({ nftAddress }),
  target: fetchHoldersFx,
})

export const $holders = restore(fetchHoldersFx, null)
  .reset($currentNftAddress.updates)

fetchHoldersFx.watch(console.log)
