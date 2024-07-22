/**
 * Remove keys with falsy values
 */
export const cleanEmpty = <T>(
  obj: Record<string, T | 0 | false | null | undefined>
): Record<string, T> =>
  Object.entries(obj).reduce<{ [index: string]: T }>(
    (acc, [key, value]) => (value ? ((acc[key] = value), acc) : acc),
    {}
  )
