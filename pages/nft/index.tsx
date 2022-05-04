import { useEffect, useState } from 'react'
import { CollectionOfNFT } from '../../components/CollectionOfNFT'
import css from './index.module.css'
import indexStyles from '../index.module.css'
import { fetchNFTs } from '../../lib/fetchNFTs'
import { Collection } from '../../data/collections'
import { useRouter } from 'next/router'

const NftAnalyticsPage = () => {
  const [nftList, setNftList] = useState<Collection[]>([])
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    fetchNFTs().then(setNftList).catch(err => setError(err.message))
  }, [])

  return (
    <main className={`${css.main}`}>
      <h3 className={`${indexStyles.h4} ${css.title}`}>Choose NFT collection</h3>
      <div className={`${indexStyles.list}`}>
        <CollectionOfNFT nfts={nftList} onClick={col => col && router.push(`nft/${col.address}`)}/>
      </div>
    </main>
  )
}

export default NftAnalyticsPage
