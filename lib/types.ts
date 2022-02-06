import { ChainId } from '../data/networks'

export type Option = { logo: string; label: string; symbol?: string; address?: string; chainId?: ChainId }

export type ChartData = { value: number; time: string }[]