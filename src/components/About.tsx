import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { about, competencies } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'
import Globe from './Globe'
import Marquee from './Marquee'
import GlitchImage from './GlitchImage'
import tiagoStudio from '../assets/images/tiago_studio_bw.jpg'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    setIsMobile(mql.matches)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export default function About() {
  const { lang } = useLang()
  const t = about[lang]
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canHover = useCanHover()
  const headingInView = useInView(headingRef, { margin: '-50% 0px -50% 0px' })
  const headingActive = !canHover && headingInView
  const isMobile = useIsMobile()

  return (
    <section id="about" className="relative px-6 md:px-10 pt-20 md:pt-28">
      {!isMobile && (
        <Globe className="absolute right-0 top-28 w-48 md:w-80 -translate-x-16 lg:-translate-x-24 z-20 pointer-events-auto" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 md:gap-y-14 md:items-start">
        <p className="label text-ink-soft col-span-1 md:col-span-3">{t.kicker}</p>
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          data-cursor=""
          className={`relative z-10 col-span-1 md:col-span-9 font-display uppercase text-5xl md:text-8xl leading-[0.9] md:leading-none tracking-tightest transition-colors duration-300 hover:text-red ${headingActive ? 'text-red' : ''}`}
        >
          {t.heading}
        </motion.h2>

        <div className="relative col-span-1 md:col-span-12 -mx-6 md:-mx-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[18/25] md:aspect-[21/9] overflow-hidden grayscale contrast-125"
          >
            <GlitchImage src={tiagoStudio} alt="Tiago Jardim" focalX={isMobile ? 0.6 : 0.71} />
          </motion.div>

          {isMobile && (
            <Globe className="absolute z-20 pointer-events-auto right-4 bottom-0 translate-y-1/3 w-56" />
          )}
        </div>

        <ul className="col-span-1 md:col-span-3 flex flex-col gap-2.5">
          {competencies.map((c) => (
            <li key={c} className="label text-ink">
              + {c}
            </li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="col-span-1 md:col-span-9 flex flex-col gap-5"
        >
          {t.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-lg md:text-xl leading-relaxed md:leading-[1.4] text-ink-soft ${i === 0 ? 'font-bold' : 'font-normal'}`}
            >
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
          className="font-display uppercase text-4xl md:text-6xl leading-none tracking-tightest"
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
