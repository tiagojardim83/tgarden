import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { featureStrip } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

// Each card scrolls to its matching row inside the Projects list, not just the section start.
const TARGET_IDS = ['presentation-design', 'visual-identity', 'web-design']

function FeatureCard({
  item,
  lang,
  targetId,
  index,
}: {
  item: (typeof featureStrip)[number]
  lang: 'pt' | 'en'
  targetId: string
  index: number
}) {
  const t = item[lang]
  const ref = useRef<HTMLAnchorElement>(null)
  const canHover = useCanHover()
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  const active = !canHover && inView

  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      onClick={(e) => {
        e.preventDefault()
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }}
      data-cursor="VIEW"
      className={`group relative px-6 md:px-10 py-10 md:py-14 min-h-[280px] md:min-h-[380px] flex flex-col justify-between gap-10 border-ink/15 md:border-l first:border-l-0 [border-left-width:0] md:[border-left-width:1px] transition-colors duration-500 ${
        active ? 'bg-ink' : 'bg-paper hover:bg-ink'
      }`}
    >
      <p
        data-admin-id={`text:home:featureStrip${index}:kicker`}
        className={`label transition-colors duration-500 ${
          active ? 'text-paper/55' : 'text-ink-soft group-hover:text-paper/55'
        }`}
      >
        {item.number} / {t.kicker}
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        data-admin-id={`text:home:featureStrip${index}:heading`}
        className={`font-display uppercase text-3xl md:text-5xl tracking-tightest transition-colors duration-500 ${
          active ? 'text-paper' : 'text-ink group-hover:text-paper'
        }`}
      >
        {t.heading}
      </motion.h2>

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
        <FeatureCard key={i} item={item} lang={lang} targetId={TARGET_IDS[i]} index={i} />
      ))}
    </div>
  )
}
