import { RouterProvider as ReactRouterProvider } from "react-router-dom"

// Utils
import { routerClient } from "@utils/clients"

const RouterProvider = () => <ReactRouterProvider router={routerClient} />

export default RouterProvider
