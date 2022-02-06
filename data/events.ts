import { ChainId } from './networks'

export type EventInfo = {
  logo: string
  caption?: string
  value: string | false
  label: string
  chainId?: ChainId
}

export const events: EventInfo[] = [
  {
    label: 'No event - total amount of users',
    value: '',
    logo: '/user.svg'
  },
  {
    label: 'AAVE v2 deposits',
    logo: 'https://etherscan.io/token/images/aave_32.png',
    caption: 'Deposits on AAVE (Mainnet)',
    chainId: ChainId.ETH,
    value: 'aave_deposit_ethereum'
  },
  {
    label: 'AAVE v2 deposits',
    logo: 'https://etherscan.io/token/images/aave_32.png',
    caption: 'Deposits on AAVE (Polygon)',
    chainId: ChainId.MATIC,
    value: 'aave_deposit_polygon'
  },
  {
    label: 'LooksRare trades',
    logo: 'https://etherscan.io/token/images/looksrare_32.png',
    caption: 'Trades on LooksRare',
    chainId: ChainId.ETH,
    value: 'looksrare_trade_ethereum'
  },
  {
    label: 'OpenSea trades',
    logo: 'https://etherscan.io/token/images/opensea_32.png',
    caption: 'Trades on OpenSea',
    chainId: ChainId.ETH,
    value: false
  }
]
