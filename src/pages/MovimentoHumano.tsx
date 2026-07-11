import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react'
import { useLang } from '../lib/lang'
import { projects, projectPageCopy } from '../data/content'
import { useCanHover } from '../lib/useCanHover'
import { FactSheet, LiveSiteLink } from './ProjectPage'

const spring = { stiffness: 220, damping: 32, mass: 0.6 }

function LobsBuild({ center, back, front }: { center: string; back: string; front: string }) {
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
          className="w-full h-auto block"
          animate={{ y: active ? '-3%' : '0%', scale: active ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
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

const copy = {
  pt: {
    intro: [
      'Movimento Humano é um ecossistema de bem-estar construído em torno de treino, comunidade e autocuidado. O produto é organizado em três estágios de prática: Semente, Fruto e Movimento, mapeados em uma interface coerente e calma que guia o usuário sem ruído.',
      'Cada tela é um momento de intenção: hierarquia suave, tipografia editorial e espaço generoso para que o conteúdo permaneça em foco.',
    ],
    sections: [
      {
        number: '01',
        kicker: 'Conceito',
        heading: 'Um app que respira com você.',
        text: 'Antes de desenhar telas, desenhamos o ritmo: onboarding, treino e loja precisam parecer parte do mesmo corpo, não três produtos costurados um no outro.',
        image: showcase01,
      },
      {
        number: '02',
        kicker: 'Fluxo',
        heading: 'Fluxo antes de tela.',
        text: 'Cada tela existe pra resolver uma decisão do usuário. Antes de desenhar um pixel, mapeamos a jornada inteira: onde trava, onde flui, onde perde.',
        image: showcase02,
      },
      {
        number: '03',
        kicker: 'Sistema',
        heading: 'Consistência é confiança.',
        text: 'Um sistema de componentes coerente faz o produto parecer maior do que é, e mais fácil de usar do que qualquer concorrente.',
        image: showcase03,
      },
    ],
    prototypeKicker: 'Protótipo Interativo',
    prototypeCaption: 'Navegue pelo fluxo completo, do onboarding ao treino.',
    closing:
      'UMA INTERFACE HUMANA PARA UMA PRÁTICA HUMANA, FEITA PRA PARECER UM GESTO, NÃO UMA TELA.',
    lobsKicker: '04 / Lobs Brazilian Art',
    lobsHeading: 'Uma loja com a mesma atitude da marca.',
    lobsText:
      'O e-commerce da Lobs Brazilian Art precisava traduzir a mesma atitude da marca pro digital: navegação simples, produto em primeiro plano e uma experiência de compra que funciona igual em qualquer tela.',
    lobsSector: 'E-commerce & Moda',
    lobsScope: 'UX/UI Design, E-commerce',
    mobileKicker: '05 / Mobile',
    mobileHeading: 'Mobile em primeiro lugar.',
    mobileText:
      'A experiência precisava funcionar igual na tela pequena: a mesma loja, a mesma atitude, sem perder nada no caminho.',
  },
  en: {
    intro: [
      'Movimento Humano is a wellness ecosystem built around training, community and self-care. The product is organized into three stages of practice: Semente, Fruto and Movimento, mapped into a coherent, calm interface that guides the user without noise.',
      'Every screen is a moment of intention: soft hierarchy, editorial typography and generous space so the content stays in focus.',
    ],
    sections: [
      {
        number: '01',
        kicker: 'Concept',
        heading: 'An app that breathes with you.',
        text: 'Before drawing screens, we drew the rhythm: onboarding, training and store need to feel like the same body, not three products stitched together.',
        image: showcase01,
      },
      {
        number: '02',
        kicker: 'Flow',
        heading: 'Flow before screen.',
        text: 'Every screen exists to resolve a user decision. Before drawing a single pixel, we map the entire journey: where it stalls, where it flows, where it loses people.',
        image: showcase02,
      },
      {
        number: '03',
        kicker: 'System',
        heading: 'Consistency is trust.',
        text: 'A coherent component system makes the product feel bigger than it is, and easier to use than any competitor.',
        image: showcase03,
      },
    ],
    prototypeKicker: 'Interactive Prototype',
    prototypeCaption: 'Navigate the full flow, from onboarding to training.',
    closing:
      'A HUMAN INTERFACE FOR A HUMAN PRACTICE, DESIGNED TO FEEL LIKE A GESTURE, NOT A SCREEN.',
    lobsKicker: '04 / Lobs Brazilian Art',
    lobsHeading: 'A store with the same attitude as the brand.',
    lobsText:
      "Lobs Brazilian Art's e-commerce needed to translate the brand's attitude into digital: simple navigation, product front and center, and a shopping experience that works the same on any screen.",
    lobsSector: 'E-commerce & Fashion',
    lobsScope: 'UX/UI Design, E-commerce',
    mobileKicker: '05 / Mobile',
    mobileHeading: 'Mobile first.',
    mobileText:
      "The experience needed to work just as well on the small screen: the same store, the same attitude, without losing anything along the way.",
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
          <p className="label text-ink-soft mb-3">{ui.project} 01 / 02</p>
          <p className="label text-red">2025 / UX/UI Design</p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-start-4 md:col-span-9 font-display uppercase text-4xl md:text-7xl leading-[0.95]"
        >
          Movimento
          <br />
          Humano
        </motion.h1>

        <div className="md:col-start-4 md:col-span-9 flex flex-col gap-4">
          {c.intro.map((p, i) => (
            <p key={i} className="text-sm md:text-base leading-relaxed text-ink-soft font-sans">
              {p}
            </p>
          ))}
        </div>

        <div className="md:col-start-4 md:col-span-9">
          <FactSheet
            client="Movimento Humano"
            sector={lang === 'pt' ? 'Saúde & Bem-estar Digital' : 'Digital Health & Wellness'}
            year="2025"
            scope={lang === 'pt' ? 'UX/UI Design, Produto Digital' : 'UX/UI Design, Digital Product'}
            ui={ui}
          />
        </div>
      </div>

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
              <p className="label text-ink-soft md:col-span-3">
                {s.number} / {s.kicker}
              </p>
              <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
                {s.heading}
              </h2>
              <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
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
              <img src={s.image} alt={s.heading} className="w-full h-auto block" />
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
            <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
              {c.prototypeKicker}
            </h2>
            <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
              {c.prototypeCaption}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 md:mt-10 aspect-video bg-ink"
          >
            <iframe
              className="w-full h-full"
              src="https://embed.figma.com/proto/A359K834znCzDXpKtlNCML/MOVIMENTO-HUMANO?node-id=14-55&starting-point-node-id=14%3A28&embed-host=share"
              allowFullScreen
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
          >
            <p className="label text-ink-soft md:col-span-3">{c.lobsKicker}</p>
            <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
              {c.lobsHeading}
            </h2>
            <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
              {c.lobsText}
            </p>
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

          <motion.img
            src={lobsLaptop}
            alt="Lobs Brazilian Art"
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10 h-auto block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <LiveSiteLink
            href="https://www.lobs.com.br/"
            label={ui.viewLive}
            className="md:col-start-4 md:col-span-9 mt-8 md:mt-10"
          />

          <div className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10">
            <LobsBuild center={lobsScreen02} back={lobsScreen03} front={lobsScreen01} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start mt-8 md:mt-10"
          >
            <p className="label text-ink-soft md:col-span-3">{c.mobileKicker}</p>
            <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
              {c.mobileHeading}
            </h2>
            <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
              {c.mobileText}
            </p>
          </motion.div>

          <motion.img
            src={lobsUxHero}
            alt="Lobs Brazilian Art"
            className="relative left-1/2 -translate-x-1/2 w-screen mt-8 md:mt-10 h-auto block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
        <p className="font-display uppercase text-2xl md:text-4xl leading-[1.15] max-w-4xl">{c.closing}</p>
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
              <p className="label text-ink-soft mt-3">{p.category}</p>
              <p className="font-display uppercase text-lg">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
