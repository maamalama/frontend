import SelectComponent, { Props } from 'react-select'
import { Option } from '../lib/types'

export function Select<T extends Option>({ styles, ...props }: Props<T, false>) {
  return (
    <SelectComponent
      styles={{
        container: styles?.container,
        control: (s) => ({ ...s, borderRadius: '6px', borderColor: '#eaeaea', fontSize: '14px' }),
        option: (s, state) => ({
          ...s,
          backgroundColor: state.isFocused ? '#2684FF' : 'white',
          color: state.isFocused ? 'white' : 'black',
          fontSize: '14px'
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
