import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export default function Marquee({
  text,
  children,
  direction = 'left',
  duration = 22,
  className = '',
  gapClassName = 'pr-10 md:pr-16',
  separator,
}: {
  text?: string
  children?: ReactNode
  direction?: 'left' | 'right'
  duration?: number
  className?: string
  gapClassName?: string
  separator?: ReactNode
}) {
  const animate = direction === 'left' ? { x: ['0%', '-50%'] } : { x: ['-50%', '0%'] }
  const content = children ?? text

  const item = (hidden: boolean) => (
    <span className="flex items-center whitespace-nowrap" aria-hidden={hidden || undefined}>
      <span className={className}>{content}</span>
      {separator ? (
        <span className="shrink-0 mx-6 md:mx-10">{separator}</span>
      ) : (
        <span className={gapClassName} />
      )}
    </span>
  )

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={animate}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {item(false)}
        {item(true)}
      </motion.div>
    </div>
  )
}
