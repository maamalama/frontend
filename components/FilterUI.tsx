import { Props as SelectProps } from 'react-select'
import { Select } from './Select'
import styles from './Filter.module.css'
import { CSSProperties, ReactNode, useState } from 'react'
import sharedStyles from '../shared.module.css'
import { SelectOption } from './select/Option'
import { CurrentValue } from './select/CurrentValue'
import { useFilters } from '../hooks/useFilters'

export const FilterUI = ({
  options,
  children,
  containerStyles,
  childrenAfter = '',
  filterId,
  actionText,
  ...props
}: {
  options: any[]
  children?: ReactNode
  containerStyles?: CSSProperties
  childrenAfter?: ReactNode
  actionText: string
} & SelectProps<typeof options[0], false> & { filterId?: number }) => {
  const removeFilter = useFilters((state) => state.removeFilter)

  const filters = useFilters((state) => state.filters)

  const isFirstFilter = filters.findIndex(f => f.id === filterId) === 0

  return (
    <div className={`${styles.container} ${sharedStyles.row} ${sharedStyles.gap}`}>
      <span style={{ width: '28px', textAlign: 'right' }}>
        {isFirstFilter ? `${actionText[0].toUpperCase()}${actionText.slice(1)}` : 'and'}
      </span>{' '}
      {children}
      <Select
        id='filter-ui'
        instanceId='filter-ui'
        // menuIsOpen={true}
        // formatCreateLabel={(option) => <span>Create {option}</span>}
        styles={{ container: (styles) => ({ ...styles, ...containerStyles, width: '100%' }) }}
        components={{ Option: SelectOption, SingleValue: CurrentValue }}
        options={options}
        {...props}
      />
      {childrenAfter}
      {filters.length > 1 && (
        <button className={styles.deleteButton} onClick={() => removeFilter(filterId)}>
          <img src="/minus.svg" height={24} width={24} alt="close" />
        </button>
      )}
    </div>
  )
}
