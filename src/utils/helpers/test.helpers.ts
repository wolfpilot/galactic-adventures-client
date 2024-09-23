/**
 * Update the pre-defined jsdom window object
 *
 * For more info, see:
 * https://stackoverflow.com/a/60817030
 */
export const updateWindowSize = ({
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
