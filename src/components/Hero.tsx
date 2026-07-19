import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { hero } from '../data/content'
import { useLang } from '../lib/lang'
import Marquee from './Marquee'

// Deferred to its own chunk: pulls in three.js/@react-three plus a 1.6MB HDR
// environment map, which would otherwise block the initial page load for a
// purely decorative hero flourish.
const GlassLogo3D = lazy(() => import('./GlassLogo3D'))

const dot = <span className="block w-3 h-3 md:w-4 md:h-4 bg-red" />

export default function Hero() {
  const { lang } = useLang()
  const t = hero[lang]

  return (
    <section id="hero" className="relative min-h-screen flex flex-col pt-4 md:pt-6">
      <div className="flex items-start justify-between gap-6 px-6 md:px-10 py-4 md:py-5 border-b border-ink/15 text-[10px] leading-[15px] tracking-[0.18em] uppercase">
        <div>
          <p className="font-light" data-admin-id="text:home:hero:name">{t.name}</p>
          <p className="font-bold text-ink-soft mt-0.5" data-admin-id="text:home:hero:location">{t.location}</p>
        </div>
        <div className="text-right">
          <p className="font-light" data-admin-id="text:home:hero:roleLine1">{t.roleLine1}</p>
          <p className="font-bold" data-admin-id="text:home:hero:roleLine2">{t.roleLine2}</p>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center">
        <h1 className="font-display leading-[0.78]">
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
                className="text-red text-[24vw] tracking-tightest"
                adminId="text:home:hero:nameTop"
              />
            </motion.div>
          </span>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="hidden md:flex flex-col items-start absolute right-10 top-1/2 -translate-y-1/2 z-10 max-w-[260px]"
            >
              <p
                className="font-sans text-[11px] md:text-sm font-medium leading-snug normal-case tracking-normal text-ink mb-4"
                data-admin-id="text:home:hero:sub"
              >
                {t.sub}
              </p>
              <div className="w-10 h-px bg-ink mb-3" />
              <p className="font-sans label text-ink" data-admin-id="text:home:hero:tag">
                {t.tag}
              </p>
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
                  className="text-red text-[24vw] tracking-tightest"
                  adminId="text:home:hero:nameBottom"
                />
              </motion.div>
            </span>
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <Suspense fallback={null}>
            <GlassLogo3D className="w-[390vw] h-[390vw] md:w-[94vw] md:h-[94vw] max-w-[1560px] max-h-[1560px]" />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="md:hidden absolute right-6 bottom-10 z-10 flex flex-col items-start max-w-[75%]"
        >
          <p className="text-[11px] font-medium leading-snug normal-case tracking-normal text-ink mb-4">
            {t.sub}
          </p>
          <div className="w-10 h-px bg-ink mb-3" />
          <p className="label text-ink">{t.tag}</p>
        </motion.div>
      </div>
    </section>
  )
}
