// Types
import type { AxiosError, AxiosResponse } from "axios"

export type ApiSuccess<T> = {
  ok: true
  data: T
}

export type ApiFailed = {
  ok: false
  message: string
}

export type ApiResponse<T> = AxiosResponse<ApiSuccess<T>>
export type ApiError = AxiosError<ApiFailed>
