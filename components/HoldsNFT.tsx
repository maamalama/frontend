import { collections } from '../data/collections'
import { Filter } from './Filter'
import styles from './Filter.module.css'

export const HoldsNFT = () => (
  <Filter
    defaultValue={collections[0]}
    options={collections}
    containerStyles={{ maxWidth: '350px' }}
    childrenAfter="NFTs and"
  >
    Holds <input defaultValue={0} type="number" style={{ width: '6rem' }} className={styles.input} />
  </Filter>
)
