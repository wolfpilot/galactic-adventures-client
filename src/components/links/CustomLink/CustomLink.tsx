import React from "react"

const CustomLink = ({
  children,
  className = "",
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { "aria-disabled": ariaDisabled } = rest

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!ariaDisabled) return

    e.preventDefault()
  }

  return (
    <a className={className} onClick={handleOnClick} {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
