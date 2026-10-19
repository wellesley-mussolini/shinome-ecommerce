import { LOGO_PATH, LOGO_VIEW_BOX } from './logo-path'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEW_BOX}
      role="img"
      aria-label="Shinome"
      className={className}
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  )
}
