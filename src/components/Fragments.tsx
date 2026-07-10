import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { fragments, fragmentsCopy } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

const CELLS = [
  'md:col-start-1 md:row-start-1 md:row-span-2 aspect-[4/5] md:aspect-auto',
  'md:col-start-2 md:row-start-1 aspect-[4/5] md:aspect-square',
  'md:col-start-3 md:row-start-1 aspect-[4/5] md:aspect-square',
  'md:col-start-2 md:row-start-2 aspect-[4/5] md:aspect-square',
  'md:col-start-3 md:row-start-2 aspect-[4/5] md:aspect-square',
  'md:col-span-3 md:row-start-3 aspect-[4/5] md:aspect-[3/1]',
]

function FragmentCell({ src, i }: { src: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const canHover = useCanHover()
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  const active = !canHover && inView

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
      className={`overflow-hidden bg-ink/5 ${CELLS[i] ?? ''} ${i === 5 ? 'md:col-span-3' : ''}`}
    >
      <div ref={ref} className="group relative w-full h-full overflow-hidden">
        <img
          src={src}
          alt=""
          data-cursor="+"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            active ? 'scale-105 grayscale-0' : 'grayscale group-hover:scale-105 group-hover:grayscale-0'
          }`}
        />
      </div>
    </motion.div>
  )
}

export default function Fragments() {
  const { lang } = useLang()
  const t = fragmentsCopy[lang]
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canHover = useCanHover()
  const headingInView = useInView(headingRef, { margin: '-50% 0px -50% 0px' })
  const headingActive = !canHover && headingInView

  return (
    <section id="fragments" className="px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mb-14">
        <p className="label text-ink-soft md:col-span-3">{t.kicker}</p>
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          data-cursor=""
          className={`md:col-span-9 font-display uppercase text-5xl md:text-8xl leading-[0.9] md:leading-none tracking-tightest transition-colors duration-300 hover:text-red ${headingActive ? 'text-red' : ''}`}
        >
          {t.heading}
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-[repeat(2,1fr)_auto] gap-3 md:gap-4">
        {fragments.map((src, i) => (
          <FragmentCell key={i} src={src} i={i} />
        ))}
      </div>
    </section>
  )
}
