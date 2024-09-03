import React from "react"
import { Link, type LinkProps } from "react-router-dom"

const CustomLink = ({ children, className = "", ...rest }: LinkProps) => {
  const { "aria-disabled": ariaDisabled } = rest

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!ariaDisabled) return

    e.preventDefault()
  }

  return (
    <Link className={className} onClick={handleOnClick} {...rest}>
      {children}
    </Link>
  )
}

export default CustomLink
