export enum DestinationCategory {
  "planet",
  "satellite",
  "asteroid",
  "comet",
  "ring",
  "station",
}

export interface Destination {
  id: number
  name: string
  code: string
  category: DestinationCategory
  description: string
  price: number
  isDefault: boolean
}
