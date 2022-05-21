import React, { useState } from 'react'
import css from './TagLabel.module.css'

export const TagLabel = ({ children, initialIsActive = false }) => {
  let [isActive, setIsActive] = useState(initialIsActive)
  return (
    <span className={`${css.tag_label} ${isActive ? css.tag_label__active : ''}`} onClick={() => setIsActive(!isActive)}>{children}</span>
  )
}
