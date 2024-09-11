/**
 * Update URL query strings without overwriting the previous ones or re-rendering.
 *
 * @see https://github.com/remix-run/react-router/discussions/9851#discussioncomment-4638373
 */
export const updateQueryString = (key: string, val: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  const prevVal = searchParams.get(key) ?? ""

  if (val === prevVal) return

  if (val) {
    searchParams.set(key, val)
  } else {
    searchParams.delete(key)
  }

  const newUrl = [window.location.pathname, searchParams.toString()]
    .filter((_) => _)
    .join("?")

  window.history.replaceState(null, "", newUrl)
}
