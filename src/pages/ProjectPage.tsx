import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useAnimationControls, useScroll, useTransform } from 'motion/react'
import { useLang } from '../lib/lang'
import { useCanHover } from '../lib/useCanHover'
import { getProjectDetail, getSectionVideo } from '../data/projectDetails'
import { projects, projectPageCopy } from '../data/content'

function WorldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34.64 34.63" className={className} fill="currentColor">
      <path d="M17.32,21.53c-5.99,0-17.32-.88-17.32-4.21s11.33-4.21,17.32-4.21,17.32.88,17.32,4.21-11.33,4.21-17.32,4.21ZM17.32,14.5c-4.39,0-8.52.36-11.61,1.01-3.58.76-4.32,1.62-4.32,1.8s.73,1.04,4.32,1.8c3.09.65,7.22,1.01,11.61,1.01s8.51-.36,11.61-1.01c3.58-.76,4.32-1.61,4.32-1.8s-.73-1.05-4.32-1.8c-3.09-.65-7.22-1.01-11.61-1.01Z" />
      <path d="M17.32,28.67C7.77,28.67,0,23.58,0,17.32S7.77,5.96,17.32,5.96s17.32,5.1,17.32,11.36-7.77,11.36-17.32,11.36ZM17.32,7.35C8.54,7.35,1.39,11.82,1.39,17.32s7.14,9.96,15.92,9.96,15.92-4.47,15.92-9.96-7.14-9.96-15.92-9.96Z" />
      <path d="M17.32,34.63c-3.54,0-4.47-11.33-4.47-17.32S13.78,0,17.32,0s4.47,11.33,4.47,17.32-.93,17.32-4.47,17.32ZM17.32,1.39c-1.04,0-3.08,5.62-3.08,15.92s2.03,15.92,3.08,15.92,3.08-5.62,3.08-15.92-2.03-15.92-3.08-15.92Z" />
      <path d="M17.32,34.63c-6.26,0-11.36-7.77-11.36-17.32S11.06,0,17.32,0s11.35,7.77,11.35,17.32-5.09,17.32-11.35,17.32ZM17.32,1.39c-5.49,0-9.97,7.15-9.97,15.92s4.47,15.92,9.97,15.92,9.96-7.15,9.96-15.92S22.81,1.39,17.32,1.39Z" />
      <path d="M17.32,34.63C7.77,34.63,0,26.87,0,17.32S7.77,0,17.32,0s17.32,7.77,17.32,17.32-7.77,17.32-17.32,17.32ZM17.32,1.39C8.54,1.39,1.39,8.54,1.39,17.32s7.14,15.92,15.92,15.92,15.92-7.15,15.92-15.92S26.1,1.39,17.32,1.39Z" />
    </svg>
  )
}

// Defers fetching the (often 15-25MB) video file until its container is
// within rootMargin of the viewport, instead of every video on the page
// downloading at once via autoPlay the moment it mounts.
function LazyVideo({ src, className, style }: { src: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        io.disconnect()
      }
    }, { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      style={style}
    />
  )
}

export function LiveSiteLink({ href, label, className = '' }: { href: string; label: string; className?: string }) {
  return (
    <div className={`grid grid-cols-2 border-y border-ink/15 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-cursor="VIEW"
        className="group flex items-center gap-3 py-6 md:py-8 pr-4 w-fit"
      >
        <span className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-3 label group-hover:bg-red transition-colors duration-300">
          {label}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </a>
      <div className="flex items-center justify-end pr-4 md:pr-6 border-l border-ink/15 py-6 md:py-8">
        <WorldIcon className="w-8 h-8 md:w-9 md:h-9 text-ink" />
      </div>
    </div>
  )
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <div ref={ref} className="w-full aspect-[4/3] md:aspect-video overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y, scale: 2 }} className="w-full h-full object-cover" />
    </div>
  )
}

function PanCoverImage({ src, alt }: { src: string; alt: string }) {
  const canHover = useCanHover()
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [dragLimit, setDragLimit] = useState(0)
  const controls = useAnimationControls()
  const hasPannedRef = useRef(false)

  const measure = () => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return
    setDragLimit(Math.max(0, img.getBoundingClientRect().width - container.getBoundingClientRect().width))
  }

  useEffect(() => {
    measure()
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  const isInteractive = ready && !canHover && dragLimit > 0

  useEffect(() => {
    if (!isInteractive || hasPannedRef.current) return
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPannedRef.current) {
          hasPannedRef.current = true
          controls.start({ x: -dragLimit, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } })
        }
      },
      { threshold: 0.2 },
    )
    io.observe(container)
    return () => io.disconnect()
  }, [isInteractive, dragLimit, controls])

  const imgClassName =
    'absolute inset-y-0 left-0 h-full w-auto max-w-none object-cover md:static md:h-auto md:w-full md:max-w-full'

  if (!isInteractive) {
    return (
      <div ref={containerRef} className="relative overflow-hidden aspect-[18/25] md:aspect-auto">
        <img ref={imgRef} src={src} alt={alt} onLoad={measure} className={imgClassName} />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden aspect-[18/25] md:aspect-auto touch-pan-y">
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={measure}
        drag="x"
        dragConstraints={{ left: -dragLimit, right: 0 }}
        dragElastic={0.05}
        initial={{ x: -dragLimit / 2 }}
        animate={controls}
        className={`${imgClassName} cursor-grab active:cursor-grabbing`}
      />
    </div>
  )
}

function EmbedFrame({
  src,
  title,
  activateLabel,
  aspect,
}: {
  src: string
  title: string
  activateLabel: string
  aspect?: string
}) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={`relative w-full flex items-center justify-center ${aspect ? '' : 'aspect-square bg-red'}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        src={src}
        title={title}
        allowFullScreen
        className="w-full h-full border-none"
        style={{ pointerEvents: active ? 'auto' : 'none' }}
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/5 transition-colors"
        >
          <span className="label bg-ink text-paper px-4 py-2">{activateLabel}</span>
        </button>
      )}
    </div>
  )
}

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
          <p className="label text-red">{detail.year} / {copy.category}</p>
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
          <LazyVideo
            src={heroVideoUrl}
            className="w-full aspect-[18/25] md:aspect-auto md:h-auto object-cover block"
          />
        </motion.div>
      ) : detail.heroMobileCover ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="-mx-6 md:-mx-10 mt-12 md:mt-16 bg-ink"
        >
          <PanCoverImage src={detail.heroImage} alt={copy.title} />
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
          const showFactSheet =
            s.showFactSheet ?? (detail.factSheetRepeat !== false && detail.factSheetRepeat !== 'end')
          return (
            <div key={i}>
              {s.precededByProjectFactSheet && (
                <div className="mb-16 md:mb-24">
                  <FactSheet client={copy.client} sector={copy.sector} year={detail.year} scope={copy.scope} ui={ui} />
                </div>
              )}

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

              {showFactSheet && s.factSheetPosition === 'before' && (
                <div className="mt-8 md:mt-10">
                  <FactSheet client={s.client} sector={s.sector} year={s.year ?? detail.year} scope={copy.scope} ui={ui} />
                </div>
              )}

              {videoUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="-mx-6 md:-mx-10 mt-8 md:mt-10"
                >
                  <LazyVideo
                    src={videoUrl}
                    style={{ '--mobile-ar': s.mobileAspect ?? '18/25' } as CSSProperties}
                    className="w-full aspect-[var(--mobile-ar)] md:aspect-auto md:h-auto object-cover block"
                  />
                </motion.div>
              )}

              {!videoUrl && s.media && s.media.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="-mx-6 md:-mx-10 mt-8 md:mt-10 flex flex-col gap-0"
                >
                  {s.media.map((block, blockIndex) => {
                    const blockVideoUrl = block.videoKey ? getSectionVideo(block.videoKey) : undefined
                    return blockVideoUrl ? (
                      <LazyVideo
                        key={blockIndex}
                        src={blockVideoUrl}
                        style={
                          block.desktopAspect
                            ? ({ '--desktop-ar': block.desktopAspect } as CSSProperties)
                            : undefined
                        }
                        className={
                          block.mobileNatural
                            ? 'w-full h-auto block'
                            : `w-full aspect-[18/25] object-cover block ${
                                block.desktopAspect ? 'md:aspect-[var(--desktop-ar)]' : 'md:aspect-auto md:h-auto'
                              }`
                        }
                      />
                    ) : block.embedUrl ? (
                      <EmbedFrame
                        key={blockIndex}
                        src={block.embedUrl}
                        title={`${s.heading} ${blockIndex + 1}`}
                        activateLabel={ui.clickToInteract}
                        aspect={block.embedAspect}
                      />
                    ) : block.parallax && block.image ? (
                      <ParallaxImage key={blockIndex} src={block.image} alt={s.heading} />
                    ) : block.mobileCover && block.image ? (
                      <PanCoverImage key={blockIndex} src={block.image} alt={s.heading} />
                    ) : (
                      <img key={blockIndex} src={block.image} alt={s.heading} className="w-full h-auto block" />
                    )
                  })}
                </motion.div>
              )}

              {!videoUrl && !s.media && s.images && s.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`-mx-6 md:-mx-10 mt-8 md:mt-10 flex flex-col gap-0 ${s.mobileImageCover ? 'bg-ink' : ''}`}
                >
                  {s.images.map((src, imgIndex) =>
                    s.mobileImageCover ? (
                      <PanCoverImage key={imgIndex} src={src} alt={s.heading} />
                    ) : (
                      <img key={imgIndex} src={src} alt={s.heading} className="w-full h-auto block" />
                    ),
                  )}
                </motion.div>
              )}

              {showFactSheet && s.factSheetPosition !== 'before' && (
                <div className="mt-8 md:mt-10">
                  <FactSheet client={s.client} sector={s.sector} year={s.year ?? detail.year} scope={copy.scope} ui={ui} />
                </div>
              )}

              {s.liveUrl && (
                <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-12">
                  <LiveSiteLink href={s.liveUrl} label={ui.viewLive} className="md:col-start-4 md:col-span-9" />
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
              to={p.slug ? `/projetos/${p.slug}` : '/#projects'}
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
              <p className="font-display uppercase text-lg mt-3">{p.category}</p>
              <p className="label text-ink-soft">{lang === 'pt' ? p.count : p.countEn}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
