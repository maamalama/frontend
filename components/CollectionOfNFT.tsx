import { useState } from 'react'
import { Collection } from '../data/collections'
import { Select } from './Select'
import { SelectOption } from './select/Option'
import { CurrentValue } from './select/CurrentValue'
import indexStyles from '../pages/index.module.css'
import sharedStyles from '../shared.module.css'

type Props = {
  nfts: Collection[],
  onClick: (c: Collection) => unknown,
}

export const CollectionOfNFT = ({ nfts, onClick }: Props) => {
  const [collection, setCollection] = useState<Collection>(nfts[0])

  return (
    <div className={`${sharedStyles.row} ${sharedStyles.gap}`}>
    <Select
      id='collection-of-nfts'
      instanceId='collection-of-nfts'
      styles={{ container: (styles) => ({ ...styles, maxWidth: '400px', width: '100%' }) }}
      components={{ Option: SelectOption, SingleValue: CurrentValue }}
      options={nfts}
      onChange={v => setCollection(v as Collection)}
    />
      <button
        className={indexStyles.queryButton}
        onClick={() => onClick(collection)}
      >
        Query
      </button>
    </div>
  )
}
