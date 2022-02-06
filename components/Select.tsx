import SelectComponent, { Props } from 'react-select'

export const Select = ({ styles, ...props }: Props) => (
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
