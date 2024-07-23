export interface BaseProps {
  children: React.ReactNode
  className?: string | undefined
}

export type Props = BaseProps &
  (
    | ({ as: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "anchor" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  )
