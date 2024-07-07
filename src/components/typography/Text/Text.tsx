import React from "react"

// Styles
import styles from "./Text.module.css"

export type TextSizes = "XS" | "S" | "M" | "L" | "XL"

const sizeToClassName = {
  XS: styles.textXS,
  S: styles.textS,
  M: styles.textM,
  L: styles.textL,
  XL: styles.textXL,
}

interface Props {
  // !: Can I overwrite this?
  className?: string
  children: React.ReactNode
  size?: TextSizes
}

const Text = ({ children, size = "S" }: Props) => (
  <p className={sizeToClassName[size]}>{children}</p>
)

export default Text
