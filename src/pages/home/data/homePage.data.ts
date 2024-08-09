// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

export const metadata: MetadataProps = {
  title: "Homepage",
  description: "Your next adventure awaits!",
}

export const headerData: PageHeaderProps = {
  title: "Welcome",
  description: "Your next adventure awaits!",
}

export const newsBannerData = [
  "👾👾👾 Galaxy in turmoil: Zaphod Beeblebrox still on the run! 👾👾👾",
  "Heart of Gold has been recovered! In what has been dubbed The Most Improbable Event of All or Mostly Known Time, the ship has decided to return itself to its first inauguration place.",
  "Temperatures on Kelt-9b have cooled down to a pleasant 427°C, journeys to restart soon.",
  "Congratulations to our very own ☍⟒⌰⌇⟒⊬ [ˈKelsi] for giving birth to a litter of 34 tiny, adorable ⌇⋏⍜⍀☍⌰⟒⏁⌇ [snörklets]! We wish her all the best.",
  "The Big Bang proven to be a lie. Controversial new findings most definitively show that the 'Xolians are indeed the Fathers of The Universe (see disclaimer pamphlet 5537AC for totally, completely, unrelated sponsorship deal).",
]

export const homePageData = {
  metadata,
  headerData,
  newsBannerData,
}
