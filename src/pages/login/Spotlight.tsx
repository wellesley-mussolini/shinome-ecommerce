import { motion } from 'motion/react'
import { useId } from 'react'

import { cn } from '@/lib/cn'

type SpotlightProps = {
  className?: string
}

// Adaptado do Spotlight do Aceternity UI. A animação de entrada, que lá é um keyframe CSS,
// aqui é feita pelo motion; a cor vem do token da marca via currentColor.
export function Spotlight({ className }: SpotlightProps) {
  const blurFilterId = useId()

  return (
    <motion.svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      initial={{ opacity: 0, x: '-72%', y: '-62%', scale: 0.5 }}
      animate={{ opacity: 1, x: '-50%', y: '-40%', scale: 1 }}
      transition={{ duration: 2, delay: 0.75, ease: 'easeOut' }}
      className={cn('text-brand pointer-events-none absolute h-5/3 w-7/5 lg:w-5/6', className)}
    >
      <g filter={`url(#${blurFilterId})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="currentColor"
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id={blurFilterId}
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="spotlightBlur" />
        </filter>
      </defs>
    </motion.svg>
  )
}
