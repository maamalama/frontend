import { Filter } from './Filter'
import styles from './Filter.module.css'

export const networks = [
  {
    value: 'eth',
    label: 'ETH',
    logo: '/cryptos/eth.svg'
  },
  {
    value: 'matic',
    label: 'MATIC',
    logo: '/cryptos/matic.png'
  }
]

export const OwnsCrypto = () => (
  <Filter options={networks} containerStyles={{ maxWidth: '293px' }}>
    owns at least <input defaultValue={0} type="number" style={{ width: '6rem' }} className={styles.input} />
  </Filter>
)
