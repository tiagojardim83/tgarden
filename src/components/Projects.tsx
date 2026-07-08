import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { projects, projectsCopy } from '../data/content'
import { useLang } from '../lib/lang'

export default function Projects() {
  const { lang } = useLang()
  const t = projectsCopy[lang]
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <section id="projects" className="px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <p className="text-xs label text-ink-soft mb-4">{t.kicker}</p>
          <h2 className="font-display uppercase text-4xl md:text-6xl leading-[1.05] max-w-2xl">{t.heading}</h2>
        </div>
      </div>

      <div ref={containerRef} onMouseMove={onMouseMove} className="relative">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={`#${project.id}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className={`group relative z-10 flex items-center gap-4 md:gap-8 px-4 md:px-6 -mx-4 md:-mx-6 py-5 md:py-6 border-t border-ink/15 last:border-b transition-colors duration-300 ${
              hovered === i ? 'bg-ink text-paper' : 'hover:text-red'
            }`}
          >
            <span className={`text-xs w-6 shrink-0 ${hovered === i ? 'text-paper/60' : 'text-ink-soft'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-lg md:text-2xl uppercase flex-1">{project.category}</span>
            <span
              className={`hidden sm:block text-xs md:text-sm label transition-colors ${
                hovered === i ? 'text-paper/60' : 'text-ink-soft group-hover:text-red'
              }`}
            >
              {lang === 'pt' ? project.tag : project.tagEn}
            </span>
            <span
              className={`hidden md:block text-xs label w-16 text-right transition-colors ${
                hovered === i ? 'text-paper/60' : 'text-ink-soft group-hover:text-red'
              }`}
            >
              {project.year}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        ))}

        <motion.div
          className="pointer-events-none absolute z-20 w-44 h-32 md:w-56 md:h-40 overflow-hidden hidden md:block"
          style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}
          initial={false}
          animate={{ opacity: hovered !== null ? 1 : 0, scale: hovered !== null ? 1 : 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {hovered !== null && (
            <img src={projects[hovered].image} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      </div>

      <div className="flex justify-end mt-6">
        <a href="#fragments" data-cursor="GO" className="text-xs label hover:text-red transition-colors">
          {t.cta} →
        </a>
      </div>
    </section>
  )
}
