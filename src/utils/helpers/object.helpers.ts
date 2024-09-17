/**
 * Remove keys with falsy values
 */
export const cleanEmpty = <T = unknown>(
  obj: Record<string, T | 0 | false | null | undefined>
): Record<string, T> =>
  Object.entries(obj).reduce<{ [index: string]: T }>(
    (acc, [key, value]) => (value ? ((acc[key] = value), acc) : acc),
    {}
  )

/**
 * Safely parse JSON
 */
export const parseJSON = <T = unknown>(val: string | null): T | null => {
  if (!val) return null

  try {
    return JSON.parse(val)
  } catch (error) {
    console.error(error)

    return null
  }
}
