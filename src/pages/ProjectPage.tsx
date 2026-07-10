import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLang } from '../lib/lang'
import { getProjectDetail, getSectionVideo } from '../data/projectDetails'
import { projects, projectPageCopy } from '../data/content'

export function FactSheet({
  client,
  sector,
  year,
  scope,
  ui,
}: {
  client: string
  sector: string
  year: string
  scope: string
  ui: (typeof projectPageCopy)['pt']
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-ink/15">
      <div>
        <p className="label text-ink-soft mb-1">{ui.client}</p>
        <p className="text-sm">{client}</p>
      </div>
      <div>
        <p className="label text-ink-soft mb-1">{ui.sector}</p>
        <p className="text-sm">{sector}</p>
      </div>
      <div>
        <p className="label text-ink-soft mb-1">{ui.year}</p>
        <p className="text-sm">{year}</p>
      </div>
      <div>
        <p className="label text-ink-soft mb-1">{ui.scope}</p>
        <p className="text-sm">{scope}</p>
      </div>
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const { lang } = useLang()
  const detail = getProjectDetail(slug)
  const ui = projectPageCopy[lang]

  if (!detail) return <Navigate to="/" replace />

  const copy = detail[lang]
  const otherProjects = projects.filter((p) => p.id !== detail.categoryId)
  const heroVideoUrl = detail.heroVideoKey ? getSectionVideo(detail.heroVideoKey) : undefined

  return (
    <main className="px-6 md:px-10 pt-8 md:pt-10">
      <Link to="/#projects" className="inline-flex items-center gap-2 label hover:text-red transition-colors">
        ← {ui.back}
      </Link>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 md:items-start">
        <div className="md:col-span-3">
          <p className="label text-ink-soft mb-3">
            {ui.project} {detail.projectNumber} / {detail.categoryTotal}
          </p>
          <p className="label text-red">{detail.year} — {copy.category}</p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-start-4 md:col-span-9 font-display uppercase text-3xl md:text-6xl leading-[1.05]"
        >
          {copy.heroStatement}
        </motion.h1>

        {copy.intro && (
          <div className="md:col-start-4 md:col-span-9 flex flex-col gap-4">
            {copy.intro.map((p, i) => (
              <p key={i} className="text-sm md:text-base leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        )}

        {detail.factSheetRepeat === false && (
          <div className="md:col-start-4 md:col-span-9">
            <FactSheet client={copy.client} sector={copy.sector} year={detail.year} scope={copy.scope} ui={ui} />
          </div>
        )}
      </div>

      {heroVideoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="-mx-6 md:-mx-10 mt-12 md:mt-16 bg-ink"
        >
          <video src={heroVideoUrl} autoPlay muted loop playsInline className="w-full h-auto block" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-16 aspect-[16/9] overflow-hidden bg-ink/5"
        >
          <img src={detail.heroImage} alt={copy.title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="flex flex-col gap-16 md:gap-24 mt-16 md:mt-24">
        {copy.sections.map((s, i) => {
          const videoUrl = getSectionVideo(s.videoKey)
          const displayNumber = i === 0 ? null : String(i + 1).padStart(2, '0')
          return (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
              >
                {displayNumber && <p className="label text-ink-soft md:col-span-3">{displayNumber}</p>}
                <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
                  {s.heading}
                </h2>
                <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </motion.div>

              {videoUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="-mx-6 md:-mx-10 mt-8 md:mt-10"
                >
                  <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-auto block" />
                </motion.div>
              )}

              {detail.factSheetRepeat !== false && (
                <div className="mt-8 md:mt-10">
                  <FactSheet client={s.client} sector={s.sector} year={detail.year} scope={copy.scope} ui={ui} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="-mx-6 md:-mx-10 mt-16 md:mt-24 bg-ink text-paper py-20 md:py-28 px-6 md:px-10"
      >
        <p className="font-display uppercase text-2xl md:text-4xl leading-[1.15] max-w-4xl">{copy.closing}</p>
      </motion.div>

      <div className="mt-16 md:mt-24 mb-20 md:mb-28">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display uppercase text-2xl md:text-4xl"
          >
            {ui.moreProjects}
          </motion.h3>
          <Link to="/#projects" className="label hover:text-red transition-colors">
            {ui.allProjects} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {otherProjects.map((p) => (
            <Link
              key={p.id}
              to={p.slug ? `/projects/${p.slug}` : '/#projects'}
              data-cursor="VIEW"
              className="group block"
            >
              <div className="aspect-video overflow-hidden bg-ink/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <p className="label text-ink-soft mt-3">{p.category}</p>
              <p className="font-display uppercase text-lg">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
