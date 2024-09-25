/**
 * Update search params without triggering a navigation event
 *
 * @see https://rafaelcamargo.com/blog/mocking-search-params-in-tests-for-react-components/
 */
export const mockSearchParams = (params: string) => {
  const { pathname } = window.location
  const url = params ? `${pathname}?${params}` : pathname

  window.history.pushState({}, "", url)
}

/**
 * Update the pre-defined jsdom window object
 *
 * @see https://stackoverflow.com/a/60817030
 */
export const mockWindowSize = ({
  width,
  height,
}: {
  width?: number
  height?: number
}) => {
  const windowPropsConfig = {
    writable: true,
    configurable: true,
  }

  if (typeof width !== "undefined") {
    Object.defineProperty(window, "innerWidth", {
      ...windowPropsConfig,
      value: width,
    })
  }

  if (typeof height !== "undefined") {
    Object.defineProperty(window, "innerHeight", {
      ...windowPropsConfig,
      value: height,
    })
  }

  window.dispatchEvent(new Event("resize"))
}
