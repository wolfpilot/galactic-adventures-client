import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom"

// Components
import Root from "@components/layout/Root/Root"

// Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
])

const RouterProvider = () => <ReactRouterProvider router={router} />

export default RouterProvider
