import { ChainId } from '../data/networks'

export type Option = {
  logo: string
  label: string
  symbol?: string
  address?: string
  chainId?: ChainId
  caption?: string
  value?: string | false
}

export type ChartData = { value: number; time: string }[]
