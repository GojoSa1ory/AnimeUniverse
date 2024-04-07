import React from 'react'
import './button.scss'

type IButton = {
    title?: string,
    className?: string,
    onClick?(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
    children?: React.ReactNode
}

function Button(props: IButton ) {
  return (
    <button 
    className={` custom-button ${props.className} `}
    onClick={(e) => props.onClick?.(e)}> {props.title} {props.children} </button>
  )
}

export default Button