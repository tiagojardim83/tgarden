import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { skills, skillsCopy } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

function SkillBar({
  skill,
  index,
  trendingLabel,
}: {
  skill: (typeof skills)[number]
  index: number
  trendingLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const controls = useAnimation()

  const play = () => {
    controls.set({ width: '0%' })
    controls.start({
      width: `${skill.value}%`,
      transition: { duration: 1, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] },
    })
  }

  useEffect(() => {
    if (inView) play()
    else controls.set({ width: '0%' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div ref={ref} onMouseEnter={play} className="cursor-default">
      <span className={`font-display text-sm block mb-2 ${skill.trending ? 'text-red' : ''}`}>{skill.short}</span>
      <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${skill.trending ? 'bg-red' : 'bg-ink'}`}
          initial={{ width: '0%' }}
          animate={controls}
        />
      </div>
      {skill.trending && (
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="label text-red mt-2 block"
        >
          {trendingLabel}
        </motion.span>
      )}
      <span className="sr-only">
        {skill.name} / {skill.value}%
      </span>
    </div>
  )
}

export default function Skills() {
  const { lang } = useLang()
  const t = skillsCopy[lang]
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canHover = useCanHover()
  const headingInView = useInView(headingRef, { margin: '-50% 0px -50% 0px' })
  const headingActive = !canHover && headingInView

  return (
    <section id="skills" className="px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} trendingLabel={t.trending} />
        ))}
      </div>
    </section>
  )
}
