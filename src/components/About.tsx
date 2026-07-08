import { motion } from 'motion/react'
import { about, competencies } from '../data/content'
import { useLang } from '../lib/lang'
import Globe from './Globe'
import Marquee from './Marquee'

export default function About() {
  const { lang } = useLang()
  const t = about[lang]

  return (
    <section id="about" className="relative px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
      <Globe className="absolute right-0 top-0 w-56 md:w-80 z-0 pointer-events-auto" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 md:gap-y-14">
        <div className="hidden md:block md:col-span-3" />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 col-span-1 md:col-span-9 font-display uppercase text-4xl md:text-6xl leading-[1.05]"
        >
          {t.heading}
        </motion.h2>

        <div className="col-span-1 md:col-span-3">
          <p className="text-xs label text-ink-soft mb-6">{t.kicker}</p>
          <ul className="flex flex-col gap-2.5">
            {competencies.map((c) => (
              <li key={c} className="text-[10px] label text-ink">
                + {c}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="col-span-1 md:col-span-9 flex flex-col gap-5"
        >
          {t.paragraphs.map((p, i) => (
            <p key={i} className="text-sm md:text-base leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 md:mt-20 -mx-6 md:-mx-10 border-y border-ink/15 py-6 md:py-8">
        <Marquee
          direction="left"
          duration={22}
          gapClassName="pr-10 md:pr-14"
          className="font-display uppercase text-4xl md:text-6xl leading-none"
        >
          {competencies.map((c) => (
            <span key={c} className="inline-flex items-center gap-8 md:gap-12 mr-10 md:mr-14">
              {c}
              <span className="text-red text-2xl md:text-3xl">★</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
