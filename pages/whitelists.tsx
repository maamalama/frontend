import shared from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'
import { AdminPanel } from '../components/AdminPanel'

const Whitelists = () => {
  return (
    <AdminPanel>
      <main className={`${shared.column} ${indexStyles.main}`}>
        <Header title="Whitelists"/>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
          work in progress
        </div>
      </main>
    </AdminPanel>
  )
}

export default Whitelists
