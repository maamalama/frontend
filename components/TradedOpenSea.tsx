import { Filter, useFilters } from '../hooks/useFilters'
import styles from './Filter.module.css'
import sharedStyles from '../shared.module.css'

export const TradedOpenSea = ({ filter }: { filter: Filter }) => {
  const removeFilter = useFilters((state) => state.removeFilter)
  return (
    <div className={`${styles.container} ${sharedStyles.row} ${sharedStyles.gap}`}>
      Traded on OpenSea{' '}
      <button className={styles.deleteButton} onClick={() => removeFilter(filter.id)}>
        <img src="/minus.svg" height={24} width={24} alt="close" />
      </button>
    </div>
  )
}
