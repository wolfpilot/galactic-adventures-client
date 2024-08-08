export const isNullish = <T>(
  arg: T | undefined | null
): arg is undefined | null => arg === null || arg === undefined
