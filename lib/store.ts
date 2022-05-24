import { createStore, createEvent, createEffect, combine } from 'effector'
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
