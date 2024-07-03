export type ApiBaseResponse<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      message: string
    }
