import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'

const Snapshots = () => {
  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <Header title='Snapshots'/>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
        work in progress
      </div>
    </main>
  )
}

export default Snapshots
