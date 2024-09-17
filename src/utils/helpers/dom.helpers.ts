// Constants
import { DISABLE_SCROLL_CLASSNAME } from "@constants/dom"

export const isElemScrollable = (elem: HTMLElement) =>
  elem.scrollWidth > elem.clientWidth || elem.scrollHeight > elem.clientHeight

/**
 * Why not set the overflow style directly?
 *
 * Well, if there are existing default, such as "overflow-x: hidden"
 * they would be overriden by a generic "auto"
 */
export const disableScroll = (elem: HTMLElement, value: boolean) => {
  value
    ? elem.classList.add(DISABLE_SCROLL_CLASSNAME)
    : elem.classList.remove(DISABLE_SCROLL_CLASSNAME)
}

export const getCssVar = (
  property: string,
  elem: HTMLElement = document.documentElement
) => getComputedStyle(elem).getPropertyValue(property)
