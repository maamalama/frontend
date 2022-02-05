import { Filter, useFilters } from '../hooks/useFilters'
import styles from './Filter.module.css'

export const TradedOpenSea = ({ filter }: { filter: Filter }) => {
  const removeFilter = useFilters((state) => state.removeFilter)
  return (
    <div className={`${styles.container} ${styles.row} ${styles.gap}`}>
      Traded on OpenSea{' '}
      <button className={styles.deleteButton} onClick={() => removeFilter(filter.id)}>
        ✖
      </button>
    </div>
  )
}
