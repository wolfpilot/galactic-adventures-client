import { type ReactElement, Children, isValidElement, useState } from "react"

// Types
import { Props } from "./types"
import { Props as TabItemProps } from "../TabItem/types"

// Styles
import styles from "./TabList.module.css"

import { TabItem } from "../index"

const TabList = ({ className = "", children }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!children) return null

  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      isValidElement(child) && child.type === TabItem
  )

  const handleOnClick = (newIndex: number) => {
    setActiveIndex(newIndex)
  }

  return (
    <div
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {tabs.map((tab, index) => (
            <li key={index}>
              <button
                className={`
                  ${styles.navBtn}
                  ${activeIndex === index ? styles.navBtn__isActive : ""}
                `}
                onClick={() => handleOnClick(index)}
              >
                {tab.props.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>{tabs[activeIndex]}</div>
    </div>
  )
}

export default TabList
