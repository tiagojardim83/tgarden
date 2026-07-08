import { motion } from 'motion/react'
import { fragments, fragmentsCopy } from '../data/content'
import { useLang } from '../lib/lang'

const CELLS = [
  'md:col-start-1 md:row-start-1 md:row-span-2 aspect-[4/5] md:aspect-auto',
  'md:col-start-2 md:row-start-1 aspect-[4/5] md:aspect-square',
  'md:col-start-3 md:row-start-1 aspect-[4/5] md:aspect-square',
  'md:col-start-2 md:row-start-2 aspect-[4/5] md:aspect-square',
  'md:col-start-3 md:row-start-2 aspect-[4/5] md:aspect-square',
  'md:col-span-3 md:row-start-3 aspect-[4/5] md:aspect-[3/1]',
]

export default function Fragments() {
  const { lang } = useLang()
  const t = fragmentsCopy[lang]

  return (
    <section id="fragments" className="px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
      <p className="label text-ink-soft mb-4">{t.kicker}</p>
      <h2 className="font-display uppercase text-4xl md:text-6xl leading-[1.05] max-w-2xl mb-14">{t.heading}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-[repeat(2,1fr)_auto] gap-3 md:gap-4">
        {fragments.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
            className={`overflow-hidden bg-ink/5 ${CELLS[i] ?? ''} ${i === 5 ? 'col-span-2 md:col-span-3' : ''}`}
          >
            <div className="group relative w-full h-full overflow-hidden">
              <img
                src={src}
                alt=""
                data-cursor="+"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
