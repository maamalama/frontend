import { useEffect, useState } from 'react'
import { CollectionOfNFT } from '../../components/CollectionOfNFT'
import css from './index.module.css'
import indexStyles from '../index.module.css'
import { useRouter } from 'next/router'
import { $nfts } from '../../models/me/myNfts'
import { useStore } from 'effector-react'
import { setMyNftAddress } from '../../models/me/myNft'

const NftAnalyticsPage = () => {
  const nftList = useStore($nfts)
  const router = useRouter()

  const onClick = (nft) => {
    setMyNftAddress(nft.address)
    router.push('/')
  }

  return (
    <main className={`${css.main}`}>
      <h3 className={`${indexStyles.h4} ${css.title}`}>Choose NFT collection</h3>
      <div className={`${indexStyles.list}`}>
        <CollectionOfNFT nfts={nftList} onClick={onClick}/>
      </div>
    </main>
  )
}

export default NftAnalyticsPage
