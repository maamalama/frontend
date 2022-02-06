import { CSSProperties } from 'react'
import SelectComponent, { Props } from 'react-select'
import { Option } from '../lib/types'

export function Select<T extends Option>({
  styles,
  controlStyles = {},
  ...props
}: Props<T, false> & { controlStyles?: CSSProperties }) {
  return (
    <SelectComponent
      styles={{
        container: styles?.container,
        control: (s, state) => ({
          ...s,
          borderRadius: '6px',
          borderColor: state.isFocused ? 'var(--blue)' : '#eaeaea',
          boxShadow: state.isFocused ? '0 0 0 1px var(--blue)' : 'none',
          fontSize: '14px',
          '&:hover': {
            borderColor: 'var(--blue)'
          },
          ...controlStyles
        }),
        option: (s, state) => ({
          ...s,
          backgroundColor: state.isFocused ? 'var(--blue)' : 'white',
          color: state.isDisabled ? 'gray' : state.isFocused ? 'white' : 'black',
          fontSize: '14px',
          cursor: state.isDisabled ? 'not-allowed' : 'pointer'
        }),
        menu: (s) => ({ ...s, zIndex: 99, borderRadius: '6px' }),
        menuList: (s) => ({ ...s, paddingTop: 0, paddingBottom: 0, borderRadius: '6px' }),
        input: (s) => ({ ...s, color: 'transparent' }),
        ...styles
      }}
      {...props}
    />
  )
}
