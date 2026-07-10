import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLang } from '../lib/lang'
import { projects, projectPageCopy } from '../data/content'
import { FactSheet } from './ProjectPage'

import showcase01 from '../assets/images/movimento-humano/showcase-01.png'
import showcase02 from '../assets/images/movimento-humano/showcase-02.png'
import showcase03 from '../assets/images/movimento-humano/showcase-03.png'
import splash01 from '../assets/images/movimento-humano/splash-01.png'
import splash02 from '../assets/images/movimento-humano/splash-02.png'
import splash03 from '../assets/images/movimento-humano/splash-03.png'
import login from '../assets/images/movimento-humano/login.png'
import home from '../assets/images/movimento-humano/home.png'
import oticaMape from '../assets/images/movimento-humano/otica-mape.png'
import treinos from '../assets/images/movimento-humano/treinos.png'
import treinosSemente from '../assets/images/movimento-humano/treinos-semente.png'
import treinosFruto from '../assets/images/movimento-humano/treinos-fruto.png'
import loja from '../assets/images/movimento-humano/loja.png'
import produto from '../assets/images/movimento-humano/produto.png'
import carrinho from '../assets/images/movimento-humano/carrinho.png'
import checkout from '../assets/images/movimento-humano/checkout.png'
import plan from '../assets/images/movimento-humano/plan.png'
import profile from '../assets/images/movimento-humano/profile.png'
import amorEmMovimento from '../assets/images/movimento-humano/amor-em-movimento.png'

const copy = {
  pt: {
    intro: [
      'Movimento Humano é um ecossistema de bem-estar construído em torno de treino, comunidade e autocuidado. O produto é organizado em três estágios de prática — Semente, Fruto e Movimento — mapeados em uma interface coerente e calma que guia o usuário sem ruído.',
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
        text: 'Cada tela existe pra resolver uma decisão do usuário. Antes de desenhar um pixel, mapeamos a jornada inteira — onde trava, onde flui, onde perde.',
        image: showcase02,
      },
      {
        number: '03',
        kicker: 'Sistema',
        heading: 'Consistência é confiança.',
        text: 'Um sistema de componentes coerente faz o produto parecer maior do que é — e mais fácil de usar do que qualquer concorrente.',
        image: showcase03,
      },
    ],
    prototypeKicker: 'Protótipo Interativo',
    prototypeCaption: 'Navegue pelo fluxo completo, do onboarding ao treino.',
    gridKicker: '04 — Sistema',
    gridHeading: 'Uma linguagem, dezesseis telas.',
    gridText:
      'Do splash ao checkout, a interface mantém o mesmo DNA visual. Tipografia como gesto, movimento como ritmo, cor como respiração. Os componentes foram desenhados como um sistema modular, pronto pra escalar em novos módulos — treino, loja, comunidade e perfil.',
    grid: [
      { image: splash01, label: 'Onboarding' },
      { image: splash02, label: 'Onboarding' },
      { image: splash03, label: 'Onboarding' },
      { image: login, label: 'Login' },
      { image: home, label: 'Home' },
      { image: oticaMape, label: 'Comunidade' },
      { image: treinos, label: 'Treinos' },
      { image: treinosSemente, label: 'Treino · Semente' },
      { image: treinosFruto, label: 'Treino · Fruto' },
      { image: amorEmMovimento, label: 'Amor em Movimento' },
      { image: loja, label: 'Loja' },
      { image: produto, label: 'Produto' },
      { image: carrinho, label: 'Carrinho' },
      { image: checkout, label: 'Checkout' },
      { image: plan, label: 'Assinatura' },
      { image: profile, label: 'Perfil' },
    ],
    closingSectionKicker: '05 — Encerramento',
    closingSectionHeading: 'Interface é a nova marca.',
    closingSectionText:
      'Um produto digital é onde uma marca é de fato vivida, não só vista. A interface é o que sustenta o engajamento e transforma decisões — tela após tela. Na TGarden, UX/UI não é decoração. É o sistema operacional da marca — porque cada interação bem cuidada reforça a identidade visual, e um produto que parece fácil é o que faz todo mundo voltar.',
    closing:
      'UMA INTERFACE HUMANA PARA UMA PRÁTICA HUMANA — FEITA PRA PARECER UM GESTO, NÃO UMA TELA.',
  },
  en: {
    intro: [
      'Movimento Humano is a wellness ecosystem built around training, community and self-care. The product is organized into three stages of practice — Semente, Fruto and Movimento — mapped into a coherent, calm interface that guides the user without noise.',
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
        text: 'Every screen exists to resolve a user decision. Before drawing a single pixel, we map the entire journey — where it stalls, where it flows, where it loses people.',
        image: showcase02,
      },
      {
        number: '03',
        kicker: 'System',
        heading: 'Consistency is trust.',
        text: 'A coherent component system makes the product feel bigger than it is — and easier to use than any competitor.',
        image: showcase03,
      },
    ],
    prototypeKicker: 'Interactive Prototype',
    prototypeCaption: 'Navigate the full flow, from onboarding to training.',
    gridKicker: '04 — System',
    gridHeading: 'One language, sixteen touchpoints.',
    gridText:
      'From splash to checkout, the interface holds the same visual DNA. Type as gesture, motion as rhythm, color as breath. Components were designed as a modular system, ready to scale across new modules — training, store, community and profile.',
    grid: [
      { image: splash01, label: 'Onboarding' },
      { image: splash02, label: 'Onboarding' },
      { image: splash03, label: 'Onboarding' },
      { image: login, label: 'Login' },
      { image: home, label: 'Home' },
      { image: oticaMape, label: 'Community' },
      { image: treinos, label: 'Training' },
      { image: treinosSemente, label: 'Training · Semente' },
      { image: treinosFruto, label: 'Training · Fruto' },
      { image: amorEmMovimento, label: 'Amor em Movimento' },
      { image: loja, label: 'Store' },
      { image: produto, label: 'Product' },
      { image: carrinho, label: 'Cart' },
      { image: checkout, label: 'Checkout' },
      { image: plan, label: 'Plan' },
      { image: profile, label: 'Profile' },
    ],
    closingSectionKicker: '05 — Closing',
    closingSectionHeading: 'Interface is the new brand.',
    closingSectionText:
      "A digital product is where a brand is truly lived, not just seen. The interface is what sustains engagement and turns decisions — screen after screen. At TGarden, UX/UI isn't decoration. It's the operating system of the brand — because every well-crafted interaction reinforces the visual identity, and a product that feels effortless is what makes everyone come back.",
    closing:
      'A HUMAN INTERFACE FOR A HUMAN PRACTICE — DESIGNED TO FEEL LIKE A GESTURE, NOT A SCREEN.',
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
          <p className="label text-ink-soft mb-3">{ui.project} 01 / 01</p>
          <p className="label text-red">2025 — UX/UI Design</p>
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
                {s.number} — {s.kicker}
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
            <p className="label text-ink-soft md:col-span-3">{c.gridKicker}</p>
            <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
              {c.gridHeading}
            </h2>
            <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
              {c.gridText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {c.grid.map((g, i) => (
              <div key={i} className="group">
                <div className="aspect-[9/19.5] overflow-hidden bg-ink/5">
                  <img
                    src={g.image}
                    alt={g.label}
                    className="w-full h-full object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom"
                  />
                </div>
                <p className="label text-ink-soft mt-3">
                  {String(i + 1).padStart(2, '0')} — {g.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 md:items-start"
        >
          <p className="label text-ink-soft md:col-span-3">{c.closingSectionKicker}</p>
          <h2 className="md:col-start-4 md:col-span-9 font-display uppercase text-2xl md:text-4xl leading-tight">
            {c.closingSectionHeading}
          </h2>
          <p className="md:col-start-4 md:col-span-9 text-sm md:text-base leading-relaxed text-ink-soft">
            {c.closingSectionText}
          </p>
        </motion.div>
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
