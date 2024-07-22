export const isElemScrollable = (elem: HTMLElement) =>
  elem.scrollWidth > elem.clientWidth || elem.scrollHeight > elem.clientHeight
