import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { m as motion, useInView, useScroll, useSpring, useTransform } from 'motion/react'
import { useLang } from '../lib/lang'
import { projects, projectPageCopy } from '../data/content'
import editableCopy from '../data/editableCopy.json'
import { useCanHover } from '../lib/useCanHover'
import { FactSheet, LiveSiteLink, PanCoverImage } from './ProjectPage'
import Marquee from '../components/Marquee'

const spring = { stiffness: 220, damping: 32, mass: 0.6 }

function LobsBuild({
  center,
  back,
  front,
  centerAdminId,
  backAdminId,
  frontAdminId,
}: {
  center: string
  back: string
  front: string
  centerAdminId?: string
  backAdminId?: string
  frontAdminId?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const canHover = useCanHover()
  const [hovered, setHovered] = useState(false)
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  const active = canHover ? hovered : inView
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })

  // Staged, one at a time: the laptop slides in from off-screen left alone first,
  // then the back panel settles in from the top-left, then the front panel
  // settles in from the top-right — each stage only starts once the previous
  // one is underway, so nothing moves simultaneously.
  // left/top are percentages of the container (not the image itself), so they
  // map directly onto the reference composition's measured proportions.
  const centerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.18], [0, 1]), spring)
  const centerLeft = useSpring(useTransform(scrollYProgress, [0, 0.32], ['-40%', '50%']), spring)

  const backOpacity = useSpring(useTransform(scrollYProgress, [0.38, 0.52], [0, 1]), spring)
  const backLeft = useSpring(useTransform(scrollYProgress, [0.38, 0.58], ['-10%', '27%']), spring)
  const backTop = useSpring(useTransform(scrollYProgress, [0.38, 0.58], ['-14%', '46%']), spring)

  const frontOpacity = useSpring(useTransform(scrollYProgress, [0.62, 0.76], [0, 1]), spring)
  const frontLeft = useSpring(useTransform(scrollYProgress, [0.62, 0.82], ['110%', '73%']), spring)
  const frontTop = useSpring(useTransform(scrollYProgress, [0.62, 0.82], ['-14%', '46%']), spring)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full aspect-[4/3] bg-red overflow-hidden"
    >
      <motion.div
        style={{
          opacity: backOpacity,
          left: backLeft,
          top: backTop,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute z-10 w-[36%]"
      >
        <motion.img
          src={back}
          alt=""
          data-admin-id={backAdminId}
          className="w-full h-auto block"
          animate={{ x: active ? '-6%' : '0%', y: active ? '-5%' : '0%', scale: active ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <motion.div
        style={{
          opacity: frontOpacity,
          left: frontLeft,
          top: frontTop,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute z-30 w-[36%]"
      >
        <motion.img
          src={front}
          alt=""
          data-admin-id={frontAdminId}
          className="w-full h-auto block"
          animate={{ x: active ? '6%' : '0%', y: active ? '-5%' : '0%', scale: active ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <motion.div
        style={{ opacity: centerOpacity, left: centerLeft, top: '55%', translateX: '-50%', translateY: '-50%' }}
        className="absolute z-20 w-[60%]"
      >
        <motion.img
          src={center}
          alt=""
          data-admin-id={centerAdminId}
          className="w-full h-auto block"
          animate={{ y: active ? '-3%' : '0%', scale: active ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  )
}

// Renders the iframe at the prototype's own native mobile width, then scales
// it down with a CSS transform to fit whatever width the container actually
// gets. This keeps the embedded page's internal text wrapping identical to
// its real mobile layout, instead of reflowing (and looking stretched) at
// our narrower container width.
function ScaledPrototype({
  src,
  title,
  nativeWidth,
  nativeHeight,
  className,
}: {
  src: string
  title: string
  nativeWidth: number
  nativeHeight: number
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / nativeWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [nativeWidth])

  return (
    <div ref={wrapperRef} className={className} style={{ height: scale ? nativeHeight * scale : undefined }}>
      {scale > 0 && (
        <iframe
          title={title}
          src={src}
          allowFullScreen
          style={{
            width: nativeWidth,
            height: nativeHeight,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 0,
          }}
        />
      )}
    </div>
  )
}

import showcase01 from '../assets/images/movimento-humano/showcase-01.png'
import showcase02 from '../assets/images/movimento-humano/showcase-02.png'
import showcase03 from '../assets/images/movimento-humano/showcase-03.png'
import lobsUxHero from '../assets/images/ux_ui_design_lobs_02.jpg'
import lobsLaptop from '../assets/images/ux_ui_design_lobs_04.jpg'
import lobsScreen01 from '../assets/images/lobsScreen_01.png'
import lobsScreen02 from '../assets/images/lobsScreen_02.png'
import lobsScreen03 from '../assets/images/lobsScreen_03.png'
import paddleHero from '../assets/images/01_AppPaddle_finale-product-design.png'
import paddleScreen01 from '../assets/images/01_boas-vindas.png'
import paddleScreen02 from '../assets/images/02_perfil-inicial-e-modalidades.png'
import paddleScreen03 from '../assets/images/03_conectar-sensor.png'
import paddleScreen04 from '../assets/images/04_permissoes-essenciais.png'
import paddleScreen05 from '../assets/images/05_inicio.png'
import paddleScreen06 from '../assets/images/06_preparar-remada.png'
import paddleScreen07 from '../assets/images/07_contagem-regressiva.png'
import paddleScreen08 from '../assets/images/08_remada-ao-vivo.png'
import paddleScreen09 from '../assets/images/09_treino-pausado.png'
import paddleScreen10 from '../assets/images/10_confirmar-encerramento.png'
import paddleScreen11 from '../assets/images/11_salvando-atividade.png'
import paddleScreen12 from '../assets/images/12_resumo-da-remada.png'
import paddleScreen13 from '../assets/images/13_analise-e-graficos.png'
import paddleScreen13b from '../assets/images/13B_voltas-do-treino.png'
import paddleScreen14 from '../assets/images/14_historico.png'
import paddleScreen15 from '../assets/images/15_comparar-treinos.png'
import paddleScreen16 from '../assets/images/16_progresso.png'
import paddleScreen17 from '../assets/images/17_central-de-seguranca.png'
import paddleScreen18 from '../assets/images/18_plano-de-remada.png'
import paddleScreen19 from '../assets/images/19_sos-nautico.png'
import paddleScreen20 from '../assets/images/20_perfil-e-dispositivos.png'
import paddleLandingMockup from '../assets/images/mockup-desktop.png'

const paddleScreens = [
  paddleScreen01,
  paddleScreen02,
  paddleScreen03,
  paddleScreen04,
  paddleScreen05,
  paddleScreen06,
  paddleScreen07,
  paddleScreen08,
  paddleScreen09,
  paddleScreen10,
  paddleScreen11,
  paddleScreen12,
  paddleScreen13,
  paddleScreen13b,
  paddleScreen14,
  paddleScreen15,
  paddleScreen16,
  paddleScreen17,
  paddleScreen18,
  paddleScreen19,
  paddleScreen20,
]

const copy = {
  pt: {
    intro: [
      editableCopy['movimento-humano:intro0'].pt,
      editableCopy['movimento-humano:intro1'].pt,
    ],
    sections: [
      {
        key: 's1',
        number: '02',
        kicker: editableCopy['movimento-humano:s1:kicker'].pt,
        heading: editableCopy['movimento-humano:s1:heading'].pt,
        text: editableCopy['movimento-humano:s1:text'].pt,
        image: showcase02,
      },
      {
        key: 's2',
        number: '03',
        kicker: editableCopy['movimento-humano:s2:kicker'].pt,
        heading: editableCopy['movimento-humano:s2:heading'].pt,
        text: editableCopy['movimento-humano:s2:text'].pt,
        image: showcase03,
      },
    ],
    titleKicker: editableCopy['movimento-humano:titleKicker'].pt,
    prototypeSectionKicker: editableCopy['movimento-humano:prototypeSectionKicker'].pt,
    prototypeKicker: editableCopy['movimento-humano:prototypeKicker'].pt,
    prototypeCaption: editableCopy['movimento-humano:prototypeCaption'].pt,
    closing:
      editableCopy['movimento-humano:closing'].pt,
    lobsKicker: editableCopy['movimento-humano:lobsKicker'].pt,
    lobsHeading: editableCopy['movimento-humano:lobsHeading'].pt,
    lobsText:
      editableCopy['movimento-humano:lobsText'].pt,
    lobsSector: editableCopy['movimento-humano:lobsSector'].pt,
    lobsScope: editableCopy['movimento-humano:lobsScope'].pt,
    mobileKicker: editableCopy['movimento-humano:mobileKicker'].pt,
    mobileHeading: editableCopy['movimento-humano:mobileHeading'].pt,
    mobileText:
      editableCopy['movimento-humano:mobileText'].pt,
    paddleKicker: editableCopy['movimento-humano:paddleKicker'].pt,
    paddleHeading: editableCopy['movimento-humano:paddleHeading'].pt,
    paddleText:
      editableCopy['movimento-humano:paddleText'].pt,
    paddleSector: editableCopy['movimento-humano:paddleSector'].pt,
    paddleScope: editableCopy['movimento-humano:paddleScope'].pt,
    paddleScreensKicker: editableCopy['movimento-humano:paddleScreensKicker'].pt,
    paddleScreensHeading: editableCopy['movimento-humano:paddleScreensHeading'].pt,
    paddleScreensText:
      editableCopy['movimento-humano:paddleScreensText'].pt,
    paddlePrototypeKicker: editableCopy['movimento-humano:paddlePrototypeKicker'].pt,
    paddlePrototypeHeading: editableCopy['movimento-humano:paddlePrototypeHeading'].pt,
    paddlePrototypeText:
      editableCopy['movimento-humano:paddlePrototypeText'].pt,
    paddleLandingKicker: editableCopy['movimento-humano:paddleLandingKicker'].pt,
    paddleLandingHeading: editableCopy['movimento-humano:paddleLandingHeading'].pt,
    paddleLandingText:
      editableCopy['movimento-humano:paddleLandingText'].pt,
  },
  en: {
    intro: [
      editableCopy['movimento-humano:intro0'].en,
      editableCopy['movimento-humano:intro1'].en,
    ],
    sections: [
      {
        key: 's1',
        number: '02',
        kicker: editableCopy['movimento-humano:s1:kicker'].en,
        heading: editableCopy['movimento-humano:s1:heading'].en,
        text: editableCopy['movimento-humano:s1:text'].en,
        image: showcase02,
      },
      {
        key: 's2',
        number: '03',
        kicker: editableCopy['movimento-humano:s2:kicker'].en,
        heading: editableCopy['movimento-humano:s2:heading'].en,
        text: editableCopy['movimento-humano:s2:text'].en,
        image: showcase03,
      },
    ],
    titleKicker: editableCopy['movimento-humano:titleKicker'].en,
    prototypeSectionKicker: editableCopy['movimento-humano:prototypeSectionKicker'].en,
    prototypeKicker: editableCopy['movimento-humano:prototypeKicker'].en,
    prototypeCaption: editableCopy['movimento-humano:prototypeCaption'].en,
    closing:
      editableCopy['movimento-humano:closing'].en,
    lobsKicker: editableCopy['movimento-humano:lobsKicker'].en,
    lobsHeading: editableCopy['movimento-humano:lobsHeading'].en,
    lobsText:
      editableCopy['movimento-humano:lobsText'].en,
    lobsSector: editableCopy['movimento-humano:lobsSector'].en,
    lobsScope: editableCopy['movimento-humano:lobsScope'].en,
    mobileKicker: editableCopy['movimento-humano:mobileKicker'].en,
    mobileHeading: editableCopy['movimento-humano:mobileHeading'].en,
    mobileText:
      editableCopy['movimento-humano:mobileText'].en,
    paddleKicker: editableCopy['movimento-humano:paddleKicker'].en,
    paddleHeading: editableCopy['movimento-humano:paddleHeading'].en,
    paddleText:
      editableCopy['movimento-humano:paddleText'].en,
    paddleSector: editableCopy['movimento-humano:paddleSector'].en,
    paddleScope: editableCopy['movimento-humano:paddleScope'].en,
    paddleScreensKicker: editableCopy['movimento-humano:paddleScreensKicker'].en,
    paddleScreensHeading: editableCopy['movimento-humano:paddleScreensHeading'].en,
    paddleScreensText:
      editableCopy['movimento-humano:paddleScreensText'].en,
    paddlePrototypeKicker: editableCopy['movimento-humano:paddlePrototypeKicker'].en,
    paddlePrototypeHeading: editableCopy['movimento-humano:paddlePrototypeHeading'].en,
    paddlePrototypeText:
      editableCopy['movimento-humano:paddlePrototypeText'].en,
    paddleLandingKicker: editableCopy['movimento-humano:paddleLandingKicker'].en,
    paddleLandingHeading: editableCopy['movimento-humano:paddleLandingHeading'].en,
    paddleLandingText:
      editableCopy['movimento-humano:paddleLandingText'].en,
  },
}

export default function MovimentoHumano() {
  const { lang } = useLang()
  const ui = projectPageCopy[lang]
  const c = copy[lang]
  const otherProjects = projects.filter((p) => p.id !== 'ux-ui')

  return (
    <main className="px-6 md:px-10 pt-8 md:pt-10">
      <Link to="/#projects" className="inline-flex items-center gap-2 label hover:text-red transition-colors">
        ← {ui.back}
      </Link>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 md:items-start">
        <div className="md:col-span-3">
          <p className="label text-ink-soft mb-3">{ui.project} 01 / 03</p>
          <p className="label text-red-label">2025 / UX/UI Design</p>
        </div>

        <p
          className="md:col-start-4 md:col-span-9 label text-ink-soft"
          data-admin-id="text:movimento-humano:titleKicker"
        >
          {c.titleKicker}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-start-4 md:col-span-9 font-display uppercase text-4xl md:text-7xl leading-[0.95]"
        >
          <span data-admin-id="text:movimento-humano:titleLine1">{editableCopy['movimento-humano:titleLine1'][lang]}</span>
          <br />
          <span data-admin-id="text:movimento-humano:titleLine2">{editableCopy['movimento-humano:titleLine2'][lang]}</span>
        </motion.h1>

        <div className="md:col-start-4 md:col-span-9 flex flex-col gap-4">
          {c.intro.map((p, i) => (
            <p
              key={i}
              data-admin-id={`text:movimento-humano:intro${i}`}
              className="text-sm md:text-base leading-relaxed text-ink-soft font-sans"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="-mx-6 md:-mx-10 mt-16 md:mt-24 bg-ink/5"
      >
        <PanCoverImage src={showcase01} alt="Movimento Humano" adminId="image:movimento-humano:s0" />
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-24 mt-16 md:mt-24">
        {c.sections.map((s) => (
          <div key={s.number}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
            >
              <p className="label text-ink-soft md:col-span-3" data-admin-id={`text:movimento-humano:${s.key}:kicker`}>
                {s.number} / {s.kicker}
              </p>
              <h2
                data-admin-id={`text:movimento-humano:${s.key}:heading`}
                className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
              >
                {s.heading}
              </h2>
              <p
                data-admin-id={`text:movimento-humano:${s.key}:text`}
                className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
              >
                {s.text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="-mx-6 md:-mx-10 mt-8 md:mt-10 bg-ink/5"
            >
              <PanCoverImage src={s.image} alt={s.heading} adminId={`image:movimento-humano:${s.key}`} />
            </motion.div>
          </div>
        ))}

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
          >
            <p
              className="label text-ink-soft md:col-span-3"
              data-admin-id="text:movimento-humano:prototypeSectionKicker"
            >
              {c.prototypeSectionKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:prototypeKicker"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.prototypeKicker}
            </h2>
            <p
              data-admin-id="text:movimento-humano:prototypeCaption"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.prototypeCaption}
            </p>
          </motion.div>

          <ScaledPrototype
            src="https://movimento-humano-app.vercel.app/"
            title={c.prototypeKicker}
            nativeWidth={402}
            nativeHeight={918}
            className="md:hidden mt-8 bg-ink overflow-hidden"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block md:mt-10 h-[960px] bg-ink"
          >
            <iframe
              className="w-full h-full"
              title={c.prototypeKicker}
              src="https://movimento-humano-app.vercel.app/"
              allowFullScreen
            />
          </motion.div>

          <div className="md:col-start-4 md:col-span-9 mt-8 md:mt-10">
            <FactSheet
              client="Movimento Humano"
              sector={editableCopy['movimento-humano:sector'][lang]}
              year="2025"
              scope={editableCopy['movimento-humano:scope'][lang]}
              ui={ui}
            />
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
          >
            <p className="label text-ink-soft md:col-span-3" data-admin-id="text:movimento-humano:lobsKicker">
              {c.lobsKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:lobsHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.lobsHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:lobsText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.lobsText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10"
          >
            <PanCoverImage src={lobsLaptop} alt="Lobs Brazilian Art" adminId="image:movimento-humano:lobsLaptop" />
          </motion.div>

          <div className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10">
            <LobsBuild
              center={lobsScreen02}
              back={lobsScreen03}
              front={lobsScreen01}
              centerAdminId="image:movimento-humano:lobsScreen02"
              backAdminId="image:movimento-humano:lobsScreen03"
              frontAdminId="image:movimento-humano:lobsScreen01"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mt-8 md:mt-10"
          >
            <p className="label text-ink-soft md:col-span-3" data-admin-id="text:movimento-humano:mobileKicker">
              {c.mobileKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:mobileHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.mobileHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:mobileText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.mobileText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10"
          >
            <PanCoverImage src={lobsUxHero} alt="Lobs Brazilian Art" adminId="image:movimento-humano:lobsUxHero" />
          </motion.div>

          <div className="md:col-start-4 md:col-span-9 mt-8 md:mt-10">
            <FactSheet
              client="Lobs Brazilian Art"
              sector={c.lobsSector}
              year="2025/26"
              scope={c.lobsScope}
              ui={ui}
            />
          </div>

          <LiveSiteLink
            href="https://www.lobs.com.br/"
            label={ui.viewLive}
            className="md:col-start-4 md:col-span-9 mt-8 md:mt-10"
          />
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
          >
            <p className="label text-ink-soft md:col-span-3" data-admin-id="text:movimento-humano:paddleKicker">
              {c.paddleKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:paddleHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.paddleHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:paddleText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.paddleText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10"
          >
            <PanCoverImage src={paddleHero} alt="Va'a Paddle" adminId="image:movimento-humano:paddleHero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mt-8 md:mt-10"
          >
            <p className="label text-ink-soft md:col-span-3" data-admin-id="text:movimento-humano:paddleScreensKicker">
              {c.paddleScreensKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:paddleScreensHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.paddleScreensHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:paddleScreensText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.paddleScreensText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10 bg-ink py-14 md:py-16"
          >
            <Marquee duration={70}>
              <div className="flex items-center gap-4 md:gap-6 pl-4 md:pl-6">
                {paddleScreens.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    data-admin-id={`image:movimento-humano:paddleScreen${i}`}
                    className="h-[520px] md:h-[560px] w-auto rounded-2xl shrink-0"
                  />
                ))}
              </div>
            </Marquee>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mt-8 md:mt-10"
          >
            <p
              className="label text-ink-soft md:col-span-3"
              data-admin-id="text:movimento-humano:paddlePrototypeKicker"
            >
              {c.paddlePrototypeKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:paddlePrototypeHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.paddlePrototypeHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:paddlePrototypeText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.paddlePrototypeText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 md:mt-10 h-[88dvh] md:h-auto md:aspect-video bg-ink"
          >
            <iframe
              className="w-full h-full"
              title="Va'a Paddle — Interactive Prototype"
              src="https://app-paddle-prototipo.vercel.app/"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mt-8 md:mt-10"
          >
            <p className="label text-ink-soft md:col-span-3" data-admin-id="text:movimento-humano:paddleLandingKicker">
              {c.paddleLandingKicker}
            </p>
            <h2
              data-admin-id="text:movimento-humano:paddleLandingHeading"
              className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight"
            >
              {c.paddleLandingHeading}
            </h2>
            <p
              data-admin-id="text:movimento-humano:paddleLandingText"
              className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft"
            >
              {c.paddleLandingText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10"
          >
            <PanCoverImage
              src={paddleLandingMockup}
              alt="Va'a Paddle — Landing Page"
              adminId="image:movimento-humano:paddleLandingMockup"
            />
          </motion.div>

          <div className="md:col-start-4 md:col-span-9 mt-8 md:mt-10">
            <FactSheet
              client="Clube Canoa Havaiana Búzios"
              sector={c.paddleSector}
              year="2026/2027"
              scope={c.paddleScope}
              ui={ui}
            />
          </div>

          <LiveSiteLink
            href="https://vaapaddle.com.br/"
            label={ui.viewLive}
            className="md:col-start-4 md:col-span-9 mt-8 md:mt-10"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="-mx-6 md:-mx-10 mt-16 md:mt-24 bg-ink text-paper py-20 md:py-28 px-6 md:px-10"
      >
        <p
          data-admin-id="text:movimento-humano:closing"
          className="font-display uppercase text-2xl md:text-4xl leading-[1.15] max-w-4xl"
        >
          {c.closing}
        </p>
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
