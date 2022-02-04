import styles from './Filter.module.css'

export const ActiveSince = () => {
  return (
    <div className={`${styles.row} ${styles.gap}`}>
      active since <input placeholder="DD/MM/YY" className={styles.input} style={{ width: '105px' }} />
    </div>
  )
}
