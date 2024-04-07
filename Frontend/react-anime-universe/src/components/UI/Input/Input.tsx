import './input.scss'
import React, { FC } from 'react'

type IInput = {
    type: string,
    className?: string,
    placeholder?: string,
    value?: any,
    setValue?: React.Dispatch<React.SetStateAction<any>>,
}

const Input:FC<IInput> = (props) => {
  return (
    <input
        value={props.value}
        onChange={(e) => props.setValue?.(e.target.value)}
        type={`${props.type}`}
        className={`${props.className} input`}
        placeholder={`${props.placeholder}`}
    />
  )
}

export default Input