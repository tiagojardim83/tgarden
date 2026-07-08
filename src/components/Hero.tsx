import { motion } from 'motion/react'
import { hero } from '../data/content'
import { useLang } from '../lib/lang'
import Marquee from './Marquee'

const dot = <span className="block w-3 h-3 md:w-4 md:h-4 bg-red" />

export default function Hero() {
  const { lang } = useLang()
  const t = hero[lang]

  return (
    <section id="hero" className="relative pt-4 md:pt-6 overflow-hidden">
      <div className="flex items-start justify-between gap-6 px-6 md:px-10 py-4 md:py-5 border-y border-ink/15 text-xs md:text-sm">
        <div>
          <p className="font-medium uppercase tracking-tight">{t.name}</p>
          <p className="text-ink-soft mt-0.5">· {t.location}</p>
        </div>
        <div className="text-right font-medium uppercase leading-snug">
          <p>{t.roleLine1}</p>
          <p>{t.roleLine2}</p>
        </div>
      </div>

      <div className="relative px-6 md:px-10">
        <h1 className="font-display leading-[0.85]">
          <span className="block overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Marquee
                text={t.nameTop}
                direction="left"
                duration={14}
                separator={dot}
                className="text-red text-[24vw] md:text-[19vw]"
              />
            </motion.div>
          </span>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="hidden md:flex flex-col items-start absolute right-10 top-1/2 -translate-y-1/2 z-10 max-w-[260px]"
            >
              <p className="inline-block bg-ink text-paper font-sans text-[11px] md:text-sm font-medium leading-snug normal-case tracking-normal mb-4 px-3 py-2">
                {t.sub}
              </p>
              <div className="w-10 h-px bg-ink mb-3" />
              <p className="inline-block bg-ink text-paper font-sans label px-3 py-1.5">{t.tag}</p>
            </motion.div>

            <span className="block overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Marquee
                  text={t.nameBottom}
                  direction="right"
                  duration={16}
                  separator={dot}
                  className="text-red text-[24vw] md:text-[19vw]"
                />
              </motion.div>
            </span>
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="md:hidden flex flex-col items-start py-6"
        >
          <p className="inline-block bg-ink text-paper text-[11px] md:text-sm font-medium leading-snug normal-case tracking-normal mb-4 px-3 py-2">
            {t.sub}
          </p>
          <div className="w-10 h-px bg-ink mb-3" />
          <p className="inline-block bg-ink text-paper label px-3 py-1.5">{t.tag}</p>
        </motion.div>
      </div>
    </section>
  )
}
