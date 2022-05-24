import React, { useState } from 'react'
import css from './TagLabel.module.css'

export const TagLabel = ({ children, isActive, onClick }) => {
  return (
    <span
      className={`${css.tag_label} ${isActive ? css.tag_label__active : ''}`}
      onClick={() => onClick(!isActive)}
    >
      {children}
    </span>
  )
}
