import styles from './Filter.module.css'
import sharedStyles from '../shared.module.css'

export const ActiveSince = () => {
  return (
    <div className={`${sharedStyles.row} ${styles.gap}`}>
      active since <input placeholder="DD/MM/YY" className={styles.input} style={{ width: '105px' }} />
    </div>
  )
}
