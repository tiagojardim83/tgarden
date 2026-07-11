import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { skills, skillsCopy } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

function SkillBar({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
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
    <div ref={ref} onMouseEnter={play} className="flex items-center gap-4 py-3 cursor-default">
      <span className="font-display text-sm w-8 shrink-0">{skill.short}</span>
      <div className="flex-1 h-2 rounded-full bg-ink/10 overflow-hidden">
        <motion.div className="h-full rounded-full bg-ink" initial={{ width: '0%' }} animate={controls} />
      </div>
      <span className="sr-only">
        {skill.name} / {skill.value}%
      </span>
    </div>
  )
}

export default function Skills() {
  const { lang } = useLang()
  const t = skillsCopy[lang]
  const half = Math.ceil(skills.length / 2)
  const columns = [skills.slice(0, half), skills.slice(half)]
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

      <div className="grid md:grid-cols-2 gap-x-16">
        {columns.map((col, ci) => (
          <div key={ci}>
            {col.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={ci === 0 ? i : i + half} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
