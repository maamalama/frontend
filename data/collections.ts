import { ChainId } from './networks'

export type Collection = {
  address: string
  label: string
  symbol: string
  logo: string
  chainId: ChainId
}

export const collections: Collection[] = [
  {
    address: '0x026224a2940bfe258d0dbe947919b62fe321f042',
    label: 'lobsterdao',
    symbol: 'LOBS',

    logo: '/nfts/lobs.jpg',
    chainId: ChainId.ETH
  },
  {
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    label: 'BoredApeYachtClub',
    symbol: 'BAYC',

    logo: '/nfts/bayc.png',
    chainId: ChainId.ETH
  },
  {
    address: '0x86935F11C86623deC8a25696E1C19a8659CbF95d',
    label: 'Aavegotchi',
    symbol: 'GOTCHI',

    logo: 'https://polygonscan.com/token/images/aavegotchighst_32.png',
    chainId: ChainId.MATIC
  },
  {
    address: '0x7227e371540cf7b8e512544ba6871472031f3335',
    label: 'Neon District Season One Item',
    symbol: 'NDITEM1',

    logo: 'https://polygonscan.com/token/images/neondistrict_32.png',
    chainId: ChainId.MATIC
  },
  {
    address: '0x1a7a1f6f6f310dd8d2b80245f82fdcfa267dfa11',
    label: 'PolygotchiUniverse',
    symbol: 'PCHI',

    logo: 'https://polygonscan.com/token/images/polygotchiuniverse2_32.png',
    chainId: ChainId.MATIC
  }
]
