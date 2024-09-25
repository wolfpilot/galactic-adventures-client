// Constants
import { ERROR_PAGE_VID } from "@constants/assets.constants"
import {
  CLOUDINARY_HOST_URL,
  CLOUDINARY_TIMESTAMP_URL,
} from "@constants/assets.constants"

// Utils
import { getCloudinaryTimestamp } from "@utils/helpers/asset.helpers"

// Setup
const { VITE_CLOUDINARY_PROJECT_ID = "", VITE_CLOUDINARY_ASSETS_PATH = "" } =
  import.meta.env

import { type GenerateVidSrcProps, generateVidSrc } from "./helpers"

// Setup
const mockBaseProps: GenerateVidSrcProps = {
  path: ERROR_PAGE_VID,
  format: "mp4",
  quality: 70,
}

describe("generateVidSrc", () => {
  describe("given the required parameters", () => {
    it("should return the remote source", () => {
      const mockProps: GenerateVidSrcProps = {
        ...mockBaseProps,
      }

      const res = generateVidSrc(mockProps)

      // Build up the URL segment by segment
      const expectedRes =
        encodeURI(CLOUDINARY_HOST_URL) +
        `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
        `/video/upload` +
        `/f_${mockProps.format}` +
        `/q_${mockProps.quality}` +
        `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
        `/${ERROR_PAGE_VID}` +
        `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}`

      expect(res).toEqual(expectedRes)
    })
  })

  describe("when no video path is passed", () => {
    it("should return an empty string", () => {
      const mockProps = {
        ...mockBaseProps,
        path: "",
      }

      const res = generateVidSrc(mockProps)
      const expectedRes = ""

      expect(res).toEqual(expectedRes)
    })
  })
})
