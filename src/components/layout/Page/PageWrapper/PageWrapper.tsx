import { Outlet } from "react-router-dom"

// Types
import { Props } from "./types"

const PageWrapper = ({ children }: Props) => (
  /**
   * Workaround for displaying the default layout on the ErrorPage. For more info:
   *
   * @see https://github.com/remix-run/react-router/discussions/9553
   */
  <main>{children ?? <Outlet />}</main>
)

export default PageWrapper
