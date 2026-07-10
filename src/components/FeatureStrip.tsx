import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { featureStrip } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

function FeatureCard({ item, lang }: { item: (typeof featureStrip)[number]; lang: 'pt' | 'en' }) {
  const t = item[lang]
  const ref = useRef<HTMLAnchorElement>(null)
  const canHover = useCanHover()
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  const active = !canHover && inView

  return (
    <a
      ref={ref}
      href="#projects"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }}
      data-cursor="VIEW"
      className={`group relative px-6 md:px-10 py-10 md:py-14 min-h-[280px] md:min-h-[380px] flex flex-col justify-between gap-10 border-ink/15 md:border-l first:border-l-0 [border-left-width:0] md:[border-left-width:1px] transition-colors duration-500 ${
        active ? 'bg-ink' : 'bg-paper hover:bg-ink'
      }`}
    >
      <p
        className={`label transition-colors duration-500 ${
          active ? 'text-paper/50' : 'text-ink-soft group-hover:text-paper/50'
        }`}
      >
        {item.number} / {t.kicker}
      </p>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`font-display uppercase text-3xl md:text-5xl tracking-tightest transition-colors duration-500 ${
          active ? 'text-paper' : 'text-ink group-hover:text-paper'
        }`}
      >
        {t.heading}
      </motion.h3>

      <span
        className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors duration-500 ${
          active ? 'border-paper text-paper' : 'border-ink text-ink group-hover:border-paper group-hover:text-paper'
        }`}
      >
        <span
          className={`text-lg transition-transform duration-500 ${active ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}`}
        >
          →
        </span>
      </span>
    </a>
  )
}

export default function FeatureStrip() {
  const { lang } = useLang()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-ink/15">
      {featureStrip.map((item, i) => (
        <FeatureCard key={i} item={item} lang={lang} />
      ))}
    </div>
  )
}
