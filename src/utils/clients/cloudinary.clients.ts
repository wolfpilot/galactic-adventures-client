import { Cloudinary } from "@cloudinary/url-gen"

// Setup
const { VITE_CLOUDINARY_PROJECT_ID = "" } = import.meta.env

export const cloudinaryClient = new Cloudinary({
  cloud: {
    cloudName: VITE_CLOUDINARY_PROJECT_ID,
  },
  url: {
    secure: true,
  },
})
