import { Props as SelectProps } from 'react-select'
import { Select } from './Select'
import styles from './Filter.module.css'
import { CSSProperties, ReactNode, useState } from 'react'
import sharedStyles from '../shared.module.css'
import { SelectOption } from './select/Option'
import { CurrentValue } from './select/CurrentValue'

export const FilterUI = ({
  options,
  children,
  containerStyles,
  childrenAfter = '',
  ...props
}: {
  options: any[]
  children: ReactNode
  containerStyles?: CSSProperties
  childrenAfter?: ReactNode
} & SelectProps<typeof options[0], false>) => {
  return (
    <div className={`${styles.container} ${sharedStyles.row} ${sharedStyles.gap}`}>
      {children}
      <Select
        // menuIsOpen={true}
        // formatCreateLabel={(option) => <span>Create {option}</span>}
        styles={{ container: (styles) => ({ ...styles, ...containerStyles, width: '100%' }) }}
        components={{ Option: SelectOption, SingleValue: CurrentValue }}
        options={options}
        {...props}
      />
      {childrenAfter}
    </div>
  )
}
