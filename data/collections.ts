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
    address: '0xca21d4228cdcc68d4e23807e5e370c07577dd152',
    label: 'Zorbs',
    symbol: 'ZORB',
    logo: 'https://lh3.googleusercontent.com/O2J_GV66yHfYeHIl-ASFknUqJ1qPB-W1D6xB2Xk-Po9GVE5Te9hkBSPsjCVTTHzq1QYgLppo4LcDtHiV3pxeSfB1b9_fP5pGbiRuUg=s0',
    chainId: ChainId.ETH
  },
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
  {
    address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    label: 'MutantApeYachtClub',
    symbol: 'MAYC',
    logo: 'https://etherscan.io/token/images/mutantapeyacht_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
    label: 'Meebits',
    symbol: '⚇',
    chainId: ChainId.ETH,
    logo: 'https://etherscan.io/token/images/meebits_32.png'
  },
  {
    address: '0xa5f1ea7df861952863df2e8d1312f7305dabf215',
    label: 'ZED Run',
    symbol: 'ZED',
    chainId: ChainId.MATIC,
    logo: 'https://etherscan.io/token/images/zedrun_128b.png'
  },
  {
    address: '0x7c885c4bfd179fb59f1056fbea319d579a278075',
    label: 'Royal LDAs',
    symbol: '',
    chainId: ChainId.MATIC,
    logo: 'https://lh3.googleusercontent.com/UB1LDoe50XlszRwIUb3KS226G8Xzx_wSyPI26dWhD5LUEITInjw63JGt39Y4SoE0gqQiZuMaieUUCmQS2jAHn1TwVgX_qkEPpws4=s130'
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
    address: '0x74ee68a33f6c9f113e22b3b77418b75f85d07d22',
    label: 'Zerion Genesis Collection',
    symbol: 'ZGC',
    logo: 'https://play-lh.googleusercontent.com/Fcuy0i4qe55Y7N7JRZbVyH4fnnoPGuiJ3gHp3apbgLFm_2cDOaTAGHoS727U_wF6CMY',
    chainId: ChainId.ETH
  },
  {
    address: '0xfaff15c6cdaca61a4f87d329689293e07c98f578',
    label: 'Zapper NFT Season 1',
    symbol: 'ZPR_NFT',
    logo: 'https://etherscan.io/token/images/zapperfioff_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xf1f3ca6268f330fda08418db12171c3173ee39c9',
    label: 'Zapper NFT Season 2',
    symbol: 'ZPR NFT',
    logo: 'https://etherscan.io/token/images/zapperfioff_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
    label: 'SuperRare',
    symbol: 'SUPR',
    logo: 'https://etherscan.io/token/images/superare_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe',
    label: 'Unstoppable Domains (.crypto)',
    symbol: 'UD',
    logo: 'https://etherscan.io/token/images/UnstoppableDomains_32.png',
    chainId: ChainId.ETH
  },
  {
    address: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
    label: 'Uniswap V3: Positions NFT',
    symbol: 'UNI-V3-POS',
    logo: 'https://etherscan.io/token/images/uniswapv3_32.png',
    chainId: ChainId.ETH
  }
]
