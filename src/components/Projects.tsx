import { useRef, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'motion/react'
import { projects, projectsCopy, type ProjectSummary, type Lang } from '../data/content'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'

function ProjectRow({
  project,
  index,
  lang,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onNavigate,
}: {
  project: ProjectSummary
  index: number
  lang: Lang
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onNavigate: (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  const rowRef = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 0.9', 'start 0.35'] })
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const imageScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-14, 6])

  const canHover = useCanHover()
  const inView = useInView(rowRef, { amount: 0.5 })
  const active = isHovered || (!canHover && inView)

  return (
    <motion.a
      ref={rowRef}
      href={project.slug ? `/tgarden/projetos/${project.slug}` : `#${project.id}`}
      onClick={onNavigate}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className={`group relative z-10 grid grid-cols-12 items-center gap-4 md:gap-6 px-4 md:px-6 -mx-4 md:-mx-6 py-6 md:py-8 border-t border-ink/15 last:border-b transition-colors duration-300 ${
        active ? 'bg-ink text-paper' : 'hover:text-red'
      }`}
    >
      <span className={`hidden md:block md:col-span-1 label ${active ? 'text-paper/60' : 'text-ink-soft'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="col-span-12 md:col-span-6 font-display text-4xl md:text-5xl lg:text-7xl uppercase leading-[0.95] tracking-tightest">
        {project.category}
      </span>
      <span
        className={`col-span-8 md:col-span-3 label transition-colors ${
          active ? 'text-paper/60' : 'text-ink-soft group-hover:text-red'
        }`}
      >
        {lang === 'pt' ? project.tag : project.tagEn}
      </span>
      <span
        className={`col-span-4 md:col-span-2 label text-right flex items-center justify-end gap-2 transition-colors ${
          active ? 'text-paper/60' : 'text-ink-soft group-hover:text-red'
        }`}
      >
        {project.year}
        <span className={`transition-transform duration-300 ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
          →
        </span>
      </span>

      <motion.div
        className="md:hidden pointer-events-none absolute right-3 top-3 z-20 w-16 h-16 rounded-md overflow-hidden shadow-xl"
        style={{ opacity: imageOpacity, scale: imageScale, rotate: imageRotate }}
      >
        <img src={project.image} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </motion.a>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const t = projectsCopy[lang]
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canHoverHeading = useCanHover()
  const headingInView = useInView(headingRef, { amount: 0.6 })
  const headingActive = !canHoverHeading && headingInView

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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mb-14">
        <p className="label text-ink-soft md:col-span-3">{t.kicker}</p>
        <h2
          ref={headingRef}
          data-cursor=""
          className={`md:col-span-9 font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-balance tracking-tightest transition-colors duration-300 hover:text-red ${headingActive ? 'text-red' : ''}`}
        >
          {t.heading}
        </h2>
      </div>

      <div ref={containerRef} onMouseMove={onMouseMove} className="relative">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            lang={lang}
            isHovered={hovered === i}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            onNavigate={(e) => {
              if (project.slug) {
                e.preventDefault()
                navigate(`/projetos/${project.slug}`)
              }
            }}
          />
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
        <a href="#fragments" data-cursor="GO" className="label hover:text-red transition-colors">
          {t.cta} →
        </a>
      </div>
    </section>
  )
}
