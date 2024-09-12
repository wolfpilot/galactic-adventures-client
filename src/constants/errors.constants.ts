export enum CustomErrorNames {
  Default = "Default",
  Unhandled = "Unhandled",
}

export interface CustomError {
  title: string
  description: string
}

export type Errors = Record<keyof typeof CustomErrorNames, CustomError>

export const errors: Errors = {
  Default: {
    title: "Oops!",
    description: "Something went wrong...",
  },
  Unhandled: {
    title: "Oops!",
    description: "An unexpected error occured, please try again later.",
  },
}
