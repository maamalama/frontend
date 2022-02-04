import React from 'react'
import { ActiveSince } from '../components/ActiveSince'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsCrypto'
import styles from './index.module.css'

const Index = () => {
  return (
    <div>
      <h1 className={styles.heading}>On-chain user analytics</h1>
      <h2 className={styles.subheading}>Some cool slogan</h2>
      <h3>Filter</h3>
      <div className={styles.list}>
        <HoldsNFT />
        <OwnsCrypto />
        <ActiveSince />
      </div>
    </div>
  )
}

export default Index
