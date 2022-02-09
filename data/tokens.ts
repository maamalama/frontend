import { ChainId } from './networks'

export type ERC20Token = {
  address: string
  label: string
  symbol: string
  logo: string
  chainId: ChainId
  decimals: number
}

export const tokens: ERC20Token[] = [
  {
    address: '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8',
    chainId: ChainId.ETH,
    symbol: 'FWB',
    label: 'Friends With Benefits Pro',
    logo: 'https://etherscan.io/token/images/friendswithbenefits_32.png',
    decimals: 18
  },
  {
    address: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
    chainId: ChainId.ETH,
    symbol: 'LDO',
    label: 'Lido DAO Token',
    logo: 'https://etherscan.io/token/images/lido-dao_32.png',
    decimals: 18
  },
  {
    address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
    chainId: ChainId.ETH,
    symbol: 'ENS',
    label: 'ENS',
    decimals: 18,
    logo: 'https://etherscan.io/token/images/ens2_32.png'
  },
  {
    address: '0x23b608675a2b2fb1890d3abbd85c5775c51691d5',
    chainId: ChainId.ETH,
    symbol: 'SOCKS',
    label: 'Unisocks',
    logo: 'https://etherscan.io/token/images/unisocks_32.png',
    decimals: 18
  },
  {
    address: '0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f',
    chainId: ChainId.ETH,
    symbol: 'SDT',
    label: 'Stake DAO',
    decimals: 18,
    logo: 'https://etherscan.io/token/images/stakedao_32.png'
  },
  {
    address: '0x31c8eacbffdd875c74b94b077895bd78cf1e64a3',
    chainId: ChainId.ETH,
    symbol: 'RAD',
    label: 'Radicle',
    decimals: 18,
    logo: 'https://etherscan.io/token/images/radicle1_32.png'
  },
  {
    address: '0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198',
    chainId: ChainId.ETH,
    symbol: 'BANK',
    label: 'Bankless DAO',
    decimals: 18,
    logo: 'https://etherscan.io/token/images/banklesstoken_32.png'
  },
  {
    address: '0x383518188C0C6d7730D91b2c03a03C837814a899',
    chainId: ChainId.ETH,
    symbol: 'OHM',
    label: 'OHM V1',
    logo: 'https://etherscan.io/token/images/olympusdao2_32.png',
    decimals: 9
  },
]
