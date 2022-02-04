export enum ChainId {
  ETH = 1,
  MATIC = 137
}

export const networks = [
  {
    value: ChainId.ETH,
    label: 'ETH',
    logo: '/cryptos/eth.svg'
  },
  {
    value: ChainId.ETH,
    label: 'MATIC',
    logo: '/cryptos/matic.png'
  }
]
