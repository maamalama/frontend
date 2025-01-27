import type { OptionProps } from 'react-select'
import { components } from 'react-select'
import { networks } from '../../data/networks'
import styles from './Option.module.css'
import sharedStyles from '../../shared.module.css'
import type { Option } from '../../lib/types'
import addFilterStyles from '../AddFilter.module.css'

const { Option: OptionComponent } = components

export function SelectOption<T extends Option>(props: OptionProps<T>) {
  return (
    <OptionComponent {...props}>
      <span className={`${sharedStyles.row}`}>
        <span className={`${styles.collectionContainer}`}>
          {props.data.logo ? (
            <img
              className={styles.collectionIcon}
              src={props.data.logo}
              height={24}
              width={24}
              alt={props.data.symbol}
              style={props.isDisabled ? { filter: 'grayscale(1)' } : {}}
            />
          ) : <div className={styles.collectionEmptyIcon} /> }
          {props.data.chainId && (
            <img
              height={14}
              width={14}
              style={{
                bottom: '0',
                right: '7.5px',
                filter: props.isDisabled ? 'grayscale(1)' : 'unset'
              }}
              className={styles.chainIdIcon}
              src={networks.find((chainId) => chainId.value === props.data.chainId)?.logo}
            />
          )}
        </span>
        <div>
          {props.data.label}
          {props.data.caption && (
            <div
              className={addFilterStyles.caption}
              style={{ color: props.isDisabled ? 'gray' : props.isFocused ? 'white' : 'gray' }}
            >
              {props.data.caption}
            </div>
          )}
        </div>
      </span>
    </OptionComponent>
  )
}
