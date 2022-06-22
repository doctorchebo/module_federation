import React from 'react'
import "./button.css";

export interface props {
  value: string
  className?: string
}

const Button = ({value, className}:props) => {
  return (
    <button className={className}>{value}</button>
  )
}

export default Button