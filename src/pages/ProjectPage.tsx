import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLang } from '../lib/lang'
import { getProjectDetail, getSectionVideo } from '../data/projectDetails'
import { projects, projectPageCopy } from '../data/content'

function FactSheet({
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

  return (
    <main className="px-6 md:px-10 pt-8 md:pt-10">
      <Link to="/#projects" className="inline-flex items-center gap-2 label hover:text-red transition-colors">
        ← {ui.back}
      </Link>

      <div className="mt-10 md:mt-14">
        <p className="label text-ink-soft mb-3">
          {ui.project} {detail.projectNumber} / {detail.categoryTotal}
        </p>
        <p className="label text-red mb-6">
          {detail.year} — {copy.category}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display uppercase text-3xl md:text-6xl leading-[1.05] max-w-4xl"
        >
          {copy.heroStatement}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 md:mt-16 aspect-[16/9] overflow-hidden bg-ink/5"
      >
        <img src={detail.heroImage} alt={copy.title} className="w-full h-full object-cover" />
      </motion.div>

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
                className="max-w-2xl"
              >
                {displayNumber && <p className="label text-ink-soft mb-3">{displayNumber}</p>}
                <h2 className="font-display uppercase text-2xl md:text-4xl leading-tight mb-4">{s.heading}</h2>
                <p className="text-sm md:text-base leading-relaxed text-ink-soft">{s.text}</p>
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

              <div className="mt-8 md:mt-10">
                <FactSheet client={s.client} sector={s.sector} year={detail.year} scope={copy.scope} ui={ui} />
              </div>
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
          <h3 className="font-display uppercase text-2xl md:text-4xl">{ui.moreProjects}</h3>
          <Link to="/#projects" className="label hover:text-red transition-colors">
            {ui.allProjects} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherProjects.map((p) => (
            <Link key={p.id} to="/#projects" data-cursor="VIEW" className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-ink/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
