import { Filter } from './Filter'
import styles from './Filter.module.css'

const collections: {
  value: string
  label: string
  symbol: string
  type: 'erc721' | 'erc1155'
  logo: string
  network: 'eth' | 'matic'
}[] = [
  {
    value: '0x026224a2940bfe258d0dbe947919b62fe321f042',
    label: 'lobsterdao',
    symbol: 'LOBS',
    type: 'erc721',
    logo: '/nfts/lobs.jpg',
    network: 'eth'
  },
  {
    value: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    label: 'BoredApeYachtClub',
    symbol: 'BAYC',
    type: 'erc721',
    logo: '/nfts/bayc.png',
    network: 'eth'
  },
  {
    value: '0x86935F11C86623deC8a25696E1C19a8659CbF95d',
    label: 'Aavegotchi',
    symbol: 'GOTCHI',
    type: 'erc721',
    logo: 'https://polygonscan.com/token/images/aavegotchighst_32.png',
    network: 'matic'
  },
  {
    value: '0x7227e371540cf7b8e512544ba6871472031f3335',
    label: 'Neon District Season One Item',
    symbol: 'NDITEM1',
    type: 'erc721',
    logo: 'https://polygonscan.com/token/images/neondistrict_32.png',
    network: 'matic'
  },
  {
    value: '0x1a7a1f6f6f310dd8d2b80245f82fdcfa267dfa11',
    label: 'PolygotchiUniverse',
    symbol: 'PCHI',
    type: 'erc721',
    logo: 'https://polygonscan.com/token/images/polygotchiuniverse2_32.png',
    network: 'matic'
  }
]

export const HoldsNFT = () => (
  <Filter options={collections} containerStyles={{ maxWidth: '350px' }} childrenAfter="NFTs and">
    Holds <input defaultValue={0} type="number" style={{ width: '6rem' }} className={styles.input} />
  </Filter>
)
