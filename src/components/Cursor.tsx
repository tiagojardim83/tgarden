import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import { prefersReducedMotion } from '../lib/reducedMotion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover || prefersReducedMotion()) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      const raw = target?.dataset.cursor ?? null
      setLabel(raw ? raw : null)
      setHovering(target !== null)
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: label ? 88 : hovering ? 40 : pressed ? 12 : 16,
        height: label ? 88 : hovering ? 40 : pressed ? 12 : 16,
        backgroundColor: '#f5f1e6',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-ink text-[11px] font-medium tracking-wide uppercase"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
