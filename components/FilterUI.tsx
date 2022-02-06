import Select, { OptionProps, SingleValueProps, components, Props as SelectProps } from 'react-select'

import styles from './Filter.module.css'
import { CSSProperties, ReactNode, useState } from 'react'
import { ChainId, networks } from '../data/networks'
import sharedStyles from '../shared.module.css'

const { Option: OptionComponent, SingleValue } = components

type Option = { logo: string; label: string; symbol?: string; address: string; chainId?: ChainId }

const CollectionOption = (props: OptionProps<Option>) => {
  return (
    <OptionComponent {...props}>
      <span className={`${sharedStyles.row}`}>
        <span className={`${styles.collectionContainer}`}>
          {props.data.logo && (
            <img
              className={styles.collectionIcon}
              src={props.data.logo}
              height={24}
              width={24}
              alt={props.data.symbol}
            />
          )}
          {props.data.chainId && (
            <img
              height={12}
              width={12}
              style={{
                bottom: '0',
                right: '7.5px'
              }}
              className={styles.chainIdIcon}
              src={networks.find((chainId) => chainId.value === props.data.chainId)?.logo}
            />
          )}
        </span>
        {props.data.label}
      </span>
    </OptionComponent>
  )
}

const CurrentValue = (props: SingleValueProps<Option>) => {
  return (
    <SingleValue {...props}>
      <span className={`${sharedStyles.row}`}>
        <span className={`${styles.collectionContainer}`}>
          {props.data.logo && (
            <img
              className={styles.collectionIcon}
              src={props.data.logo}
              height={24}
              width={24}
              alt={props.data.symbol}
            />
          )}
          {props.data.chainId && (
            <img
              height={12}
              width={12}
              style={{
                bottom: '0',
                right: '7.5px'
              }}
              className={styles.chainIdIcon}
              src={networks.find((chainId) => chainId.value === props.data.chainId)?.logo}
            />
          )}
        </span>
        {props.data.label}
      </span>
    </SingleValue>
  )
}

// const CreatableSelect = ({
//   defaultOptions,
//   ...props
// }: CreatableAdditionalProps<Option, GroupBase<Option>> & { defaultOptions: Option[] }) => {
//   const [isLoading, setLoading] = useState(false)
//   const [value, setValue] = useState<Option>()
//   const [options, setOptions] = useState<Option[]>(defaultOptions)

//   const handleChange = (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => {
//     setValue(newValue)
//   }

//   const handleCreate = (inputValue: string) => {
//     setTimeout(() => {
//       setLoading(false)
//       setOptions([
//         ...options,
//         {
//           logo: '',
//           value: inputValue,
//           label: inputValue
//         }
//       ])
//     }, 100)
//   }
// }

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
        styles={{
          container: (styles) => ({ ...styles, ...containerStyles, width: '100%' }),
          control: (styles) => ({ ...styles, borderRadius: '6px', borderColor: '#eaeaea' }),
          option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isFocused ? '#2684FF' : 'white',
            color: state.isFocused ? 'white' : 'black'
          }),
          menu: (styles) => ({ ...styles, zIndex: 99, borderRadius: '6px' }),
          menuList: (styles) => ({ ...styles, paddingTop: 0, paddingBottom: 0, borderRadius: '6px' }),
          input: (styles) => ({ ...styles, color: 'transparent' })
        }}
        components={{ Option: CollectionOption, SingleValue: CurrentValue }}
        options={options}
        {...props}
      />
      {childrenAfter}
    </div>
  )
}
