import { combine, createEvent, restore } from 'effector'
import { persist } from 'effector-storage/local'
import { $nfts } from './myNfts'

export const setMyNftAddress = createEvent<string>('setMyNftAddress')

export const $myNftAddress = restore(setMyNftAddress, '0x026224a2940bfe258d0dbe947919b62fe321f042')

persist({ store: $myNftAddress, key: 'myNftAddress' })

export const $myNft = combine(
  $nfts, $myNftAddress,
  (nfts, address) => nfts.find(n => n.address === address)
)
