import { Adventure } from "./adventures.types"

export enum ProductType {
  adventure = "adventure",
  merchandise = "merchandise",
  tour = "tour",
}

export type Product = Adventure
