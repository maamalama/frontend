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

    logo: 'https://etherscan.io/token/images/lobsterdao_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    label: 'BoredApeYachtClub',
    symbol: 'BAYC',

    logo: 'https://etherscan.io/token/images/boredapeyc_32.png',
    chainId: ChainId.ETH
  },
  // {
  //   address: '0x86935F11C86623deC8a25696E1C19a8659CbF95d',
  //   label: 'Aavegotchi',
  //   symbol: 'GOTCHI',

  //   logo: 'https://polygonscan.com/token/images/aavegotchighst_32.png',
  //   chainId: ChainId.MATIC
  // },
  {
    address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    label: 'CloneX',
    symbol: 'CloneX',
    logo: 'https://etherscan.io/token/images/clonexrtfkt_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0x5180db8f5c931aae63c74266b211f580155ecac8',
    label: 'Crypto Coven',
    symbol: 'WITCH',
    logo: 'https://storage.googleapis.com/nftimagebucket/tokensinfo/6586d76e26bd53e50fa9f64cd600c8a2.png',
    chainId: ChainId.ETH
  },
  {
    address: '0x1A92f7381B9F03921564a437210bB9396471050C',
    label: 'Cool Cats',
    symbol: 'COOL',
    logo: 'https://etherscan.io/token/images/coolcatsnft_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xa5f1ea7df861952863df2e8d1312f7305dabf215',
    label: 'ZED Horse',
    symbol: 'ZED',
    chainId: ChainId.MATIC,
    logo: 'https://etherscan.io/token/images/zedrun_128b.png'
  }
]
