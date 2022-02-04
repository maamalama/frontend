import Select, { OptionProps, SingleValueProps, components, Props as SelectProps } from 'react-select'

import styles from './Filter.module.css'
import { CSSProperties, ReactNode, useState } from 'react'
import { networks } from '../data/networks'

const { Option: OptionComponent, SingleValue } = components

type Option = { logo: string; label: string; symbol?: string; address: string; network?: string }

const CollectionOption = (props: OptionProps<Option>) => {
  return (
    <OptionComponent {...props}>
      <span className={`${styles.row}`}>
        <span className={`${styles.row} ${styles.collectionContainer}`}>
          {props.data.logo && (
            <img
              className={styles.collectionIcon}
              src={props.data.logo}
              height={24}
              width={24}
              alt={props.data.symbol}
            />
          )}
          {props.data.network && (
            <img
              height={12}
              width={12}
              style={{
                bottom: '-2.5px',
                right: '7.5px'
              }}
              className={styles.networkIcon}
              src={networks.find((network) => network.value === props.data.network).logo}
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
      <span className={`${styles.row}`}>
        <span className={`${styles.row} ${styles.collectionContainer}`}>
          {props.data.logo && (
            <img
              className={styles.collectionIcon}
              src={props.data.logo}
              height={24}
              width={24}
              alt={props.data.symbol}
            />
          )}
          {props.data.network && (
            <img
              height={12}
              width={12}
              style={{
                bottom: '0px',
                right: '7.5px'
              }}
              className={styles.networkIcon}
              src={networks.find((network) => network.value === props.data.network).logo}
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

export const Filter = ({
  options,
  children,
  containerStyles,
  childrenAfter = 'and',
  ...props
}: {
  options: any[]
  children: ReactNode
  containerStyles?: CSSProperties
  childrenAfter?: ReactNode
} & SelectProps<typeof options[0], false>) => {
  return (
    <div className={`${styles.row} ${styles.gap}`}>
      {children}
      <Select
        // formatCreateLabel={(option) => <span>Create {option}</span>}
        styles={{ container: (styles) => ({ ...styles, ...containerStyles, width: '100%' }) }}
        components={{ Option: CollectionOption, SingleValue: CurrentValue }}
        options={options}
        {...props}
      />
      <div>{childrenAfter}</div>
    </div>
  )
}
