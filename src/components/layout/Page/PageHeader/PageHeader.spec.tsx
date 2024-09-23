import { render, screen } from "@testing-library/react"

// Typs
import type { Props } from "./types"

// Constants
import { breakpoints } from "@constants/layout.constants"
import { ERROR_PAGE_IMG, ERROR_PAGE_VID } from "@constants/assets.constants"

// Components
import PageHeader from "./PageHeader"

describe("PageHeader", () => {
  describe("given video and text props", () => {
    it("should render both correctly", () => {
      const mockProps: Props = {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        media: {
          type: "video",
          video: {
            path: ERROR_PAGE_VID,
            placeholder: {
              imgPath: ERROR_PAGE_IMG,
              alt: `Image of a black hole.`,
              sizes: "100vw",
              imgSet: {
                breakpoints,
                autoScale: false,
                autoCrop: true,
              },
            },
          },
        },
      }

      const { container } = render(<PageHeader {...mockProps} />)

      /**
       * Using alternative selector since <video /> is not considered accessible.
       *
       * @see https://github.com/testing-library/dom-testing-library/issues/1096
       */
      const videoElem = container.querySelector("video")
      expect(videoElem).toBeInTheDocument()

      expect(
        screen.getByRole("heading", { level: 1, name: /Title/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("heading", { level: 2, name: /Subtitle/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("paragraph", {
          name: (_name, element) => element.textContent === "Description",
        })
      ).toBeInTheDocument()
    })
  })

  describe("given image and text props", () => {
    it("should render both correctly", () => {
      const mockProps: Props = {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        media: {
          type: "image",
          image: {
            imgPath: ERROR_PAGE_IMG,
            alt: `Image of a black hole.`,
            sizes: "100vw",
            imgSet: {
              breakpoints,
              autoScale: false,
              autoCrop: true,
            },
          },
        },
      }

      render(<PageHeader {...mockProps} />)

      expect(
        screen.getByRole("heading", { level: 1, name: /Title/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("heading", { level: 2, name: /Subtitle/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("paragraph", {
          name: (_name, element) => element.textContent === "Description",
        })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("img", {
          name: "Image of a black hole.",
        })
      ).toBeInTheDocument()
    })
  })
})
