// Constants
import { ERROR_PAGE_IMG } from "@constants/assets.constants"
import {
  CLOUDINARY_HOST_URL,
  CLOUDINARY_TIMESTAMP_URL,
} from "@constants/assets.constants"

// Utils
import { getCloudinaryTimestamp } from "@utils/helpers/asset.helpers"

// Setup
const { VITE_CLOUDINARY_PROJECT_ID = "", VITE_CLOUDINARY_ASSETS_PATH = "" } =
  import.meta.env

import {
  type GenerateImgSrcProps,
  type GenerateImgSrcSetProps,
  generateImgSrc,
  generateImgSrcSet,
} from "./helpers"

// Setup
const mockBaseProps: GenerateImgSrcProps = {
  imgPath: ERROR_PAGE_IMG,
  isPlaceholderLoaded: false,
  format: "webp",
  quality: 70,
}

describe("generateImgSrc", () => {
  describe("given an image that has not yet loaded", () => {
    it("should return the pixelated source", () => {
      const mockProps: GenerateImgSrcProps = {
        ...mockBaseProps,
      }

      const res = generateImgSrc(mockProps)

      // Build up the URL segment by segment
      const expectedRes =
        encodeURI(CLOUDINARY_HOST_URL) +
        `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
        `/image/upload` +
        `/e_pixelate` +
        `/f_${mockProps.format}` +
        `/q_${mockProps.quality}` +
        `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
        `/${ERROR_PAGE_IMG}` +
        `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}`

      expect(res).toEqual(expectedRes)
    })
  })

  describe("given an image that has loaded", () => {
    it("should return the original source", () => {
      const mockProps: GenerateImgSrcProps = {
        ...mockBaseProps,
        isPlaceholderLoaded: true,
      }

      const res = generateImgSrc(mockProps)

      // Build up the URL segment by segment
      const expectedRes =
        encodeURI(CLOUDINARY_HOST_URL) +
        `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
        `/image/upload` +
        `/f_${mockProps.format}` +
        `/q_${mockProps.quality}` +
        `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
        `/${ERROR_PAGE_IMG}` +
        `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}`

      expect(res).toEqual(expectedRes)
    })
  })

  describe("when passing transform props", () => {
    it("should return the altered source", () => {
      const mockProps = {
        ...mockBaseProps,
        isPlaceholderLoaded: true,
        transforms: {
          scale: {
            width: 640,
            height: 480,
          },
          crop: {
            width: 240,
            height: 240,
          },
        },
      }

      const res = generateImgSrc(mockProps)

      // Build up the URL segment by segment
      const expectedRes =
        encodeURI(CLOUDINARY_HOST_URL) +
        `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
        `/image/upload` +
        `/c_scale,h_${mockProps.transforms.scale.height},w_${mockProps.transforms.scale.width}` +
        `/c_crop,h_${mockProps.transforms.crop.height},w_${mockProps.transforms.crop.width}` +
        `/f_${mockProps.format}` +
        `/q_${mockProps.quality}` +
        `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
        `/${ERROR_PAGE_IMG}` +
        `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}`

      expect(res).toEqual(expectedRes)
    })
  })

  describe("when no img path is passed", () => {
    it("should return an empty string", () => {
      const mockProps = {
        ...mockBaseProps,
        imgPath: "",
      }

      const res = generateImgSrc(mockProps)
      const expectedRes = ""

      expect(res).toEqual(expectedRes)
    })
  })
})

describe("generateImgSrcSet", () => {
  describe("given an auto-scaling set of images", () => {
    it("should return the source set", () => {
      const mockProps: GenerateImgSrcSetProps = {
        ...mockBaseProps,
        isPlaceholderLoaded: true,
        imgSet: {
          breakpoints: [640, 1024],
          autoScale: true,
          autoCrop: false,
        },
      }

      const res = generateImgSrcSet(mockProps)

      const expectedRes = mockProps.imgSet?.breakpoints
        .map(
          (breakpoint) =>
            encodeURI(CLOUDINARY_HOST_URL) +
            `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
            `/image/upload` +
            `/c_scale,w_${breakpoint}` +
            `/f_${mockProps.format}` +
            `/q_${mockProps.quality}` +
            `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
            `/${ERROR_PAGE_IMG}` +
            `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}` +
            ` ${breakpoint}w`
        )
        .join(",")

      expect(res).toEqual(expectedRes)
    })
  })

  describe("given an auto-cropping set of images", () => {
    it("should return the source set", () => {
      const mockProps: GenerateImgSrcSetProps = {
        ...mockBaseProps,
        isPlaceholderLoaded: true,
        imgSet: {
          breakpoints: [640, 1024],
          autoScale: false,
          autoCrop: true,
        },
      }

      const res = generateImgSrcSet(mockProps)

      const expectedRes = mockProps.imgSet?.breakpoints
        .map(
          (breakpoint) =>
            encodeURI(CLOUDINARY_HOST_URL) +
            `/${encodeURI(VITE_CLOUDINARY_PROJECT_ID)}` +
            `/image/upload` +
            `/c_crop,h_ih,w_${breakpoint}` +
            `/f_${mockProps.format}` +
            `/q_${mockProps.quality}` +
            `/${encodeURI(VITE_CLOUDINARY_ASSETS_PATH)}` +
            `/${ERROR_PAGE_IMG}` +
            `${CLOUDINARY_TIMESTAMP_URL}${getCloudinaryTimestamp(res)}` +
            ` ${breakpoint}w`
        )
        .join(",")

      expect(res).toEqual(expectedRes)
    })
  })

  describe("when no img breakpoints are passed", () => {
    it("should return an empty string", () => {
      const mockProps = {
        ...mockBaseProps,
        imgSet: {
          breakpoints: [],
        },
      }

      const res = generateImgSrcSet(mockProps)
      const expectedRes = ""

      expect(res).toEqual(expectedRes)
    })
  })
})
