import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import uxuiImg from '../assets/images/thumb-ux-ui.jpg'
import thumbTgardenImg from '../assets/images/thumb-tgarden.jpg'
import motionImg from '../assets/images/Thumb_Site_Motion.webp'
import thumbLobsImg from '../assets/images/Thumb_Fashion_Design.jpg'
import gallery1 from '../assets/images/gallery-1.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import thumbVelvoImg from '../assets/images/thumb-velvo.jpg'
import gallery3 from '../assets/images/gallery-3.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
import gallery5 from '../assets/images/gallery-5.jpg'
import gallery6 from '../assets/images/gallery-6.jpg'

export type Lang = 'pt' | 'en'

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'fragments', label: 'Fragments' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  pt: {
    name: 'Tiago Jardim',
    location: 'Búzios / RJ',
    roleLine1: 'Diretor Criativo',
    roleLine2: 'Designer',
    nameTop: 'TGARDEN',
    nameBottom: 'TIAGO JARDIM',
    sub: 'Projetos que conectam identidade, imagem e experiência.',
    tag: 'TGARDEN DESIGN',
  },
  en: {
    name: 'Tiago Jardim',
    location: 'Búzios / RJ',
    roleLine1: 'Creative Director',
    roleLine2: 'Designer',
    nameTop: 'TGARDEN',
    nameBottom: 'TIAGO JARDIM',
    sub: 'Projects that connect identity, image and experience.',
    tag: 'TGARDEN DESIGN',
  },
}

export const featureStrip = [
  {
    number: '01',
    pt: { kicker: 'Identidade de Marca', heading: 'Identidade Visual + Key Visual' },
    en: { kicker: 'Brand Identity', heading: 'Visual Identity + Key Visual' },
  },
  {
    number: '02',
    pt: { kicker: 'Design de Apresentação', heading: 'Apresentações de Alto Impacto' },
    en: { kicker: 'Presentation Design', heading: 'High-Impact Presenta­tions' },
  },
  {
    number: '03',
    pt: { kicker: 'Experiências Digitais', heading: 'UX/UI • Web Dev • Motion' },
    en: { kicker: 'Digital Experiences', heading: 'UX/UI • Web Dev • Motion' },
  },
]

export const about = {
  pt: {
    kicker: '01 — About',
    heading: 'Entre o design e a ideia de fazer junto.',
    paragraphs: [
      'Sou Tiago Jardim, designer e diretor criativo. Atuo entre identidade visual, key visuals, motion design, apresentações de alto impacto e experiências digitais, criando projetos que combinam estratégia, estética e funcionalidade.',
      'Todo projeto nasce para resolver um desafio de comunicação. Da identidade de uma marca ao lançamento de um site, da apresentação de um negócio à construção de uma experiência visual, meu objetivo é transformar ideias em soluções consistentes, relevantes e memoráveis.',
    ],
  },
  en: {
    kicker: '01 — About',
    heading: 'Between design, and the idea of making it together.',
    paragraphs: [
      "I'm Tiago Jardim, designer and creative director. I work across visual identity, key visuals, motion design, high-impact presentations and digital experiences, creating projects that combine strategy, aesthetics and functionality.",
      'Every project is born to solve a communication challenge. From the identity of a brand to the launch of a website, from the presentation of a business to building a visual experience, my goal is to turn ideas into consistent, relevant and memorable solutions.',
    ],
  },
}

export const competencies = [
  'Visual Identity',
  'Key Visual',
  'UX/UI Design',
  'Web Design & Development',
  'Motion Design',
  'Packaging Design',
  'Fashion Design',
]

export const projectsCopy = {
  pt: { kicker: '02 — Projects', heading: 'Sete frentes, uma mesma assinatura.', cta: 'Todas as frentes' },
  en: { kicker: '02 — Projects', heading: 'Seven fronts, one same signature.', cta: 'All fronts' },
}

export interface ProjectSummary {
  id: string
  slug?: string
  category: string
  title: string
  year: string
  count: string
  countEn: string
  tag: string
  tagEn: string
  image: string
  imageFit?: 'contain'
}

export const projects: ProjectSummary[] = [
  {
    id: 'visual-identity',
    slug: 'maoka',
    category: 'Visual Identity',
    title: 'Maoka',
    year: '2024',
    count: '6 projetos',
    countEn: '6 projects',
    tag: '6 projetos',
    tagEn: '6 projects',
    image: maokaImg,
  },
  {
    id: 'key-visual',
    slug: 'figa',
    category: 'Key Visual',
    title: 'Figa',
    year: '2025/26',
    count: '5 projetos',
    countEn: '5 projects',
    tag: '5 projetos',
    tagEn: '5 projects',
    image: figaImg,
  },
  {
    id: 'ux-ui',
    slug: 'movimento-humano',
    category: 'UX/UI Design',
    title: 'Movimento Humano',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    tag: 'Movimento Humano',
    tagEn: 'Movimento Humano',
    image: uxuiImg,
  },
  {
    id: 'web-design',
    slug: 'tgarden-site',
    category: 'Web Design & Development',
    title: 'TGarden',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    tag: 'TGarden',
    tagEn: 'TGarden',
    image: thumbTgardenImg,
  },
  {
    id: 'motion-design',
    slug: 'cidades-invisiveis',
    category: 'Motion Design',
    title: 'Cidades Invisíveis',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    tag: 'Cidades Invisíveis',
    tagEn: 'Cidades Invisíveis',
    image: motionImg,
    imageFit: 'contain',
  },
  {
    id: 'packaging',
    slug: 'velvo',
    category: 'Packaging Design',
    title: 'Velvo',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    tag: 'Velvo',
    tagEn: 'Velvo',
    image: thumbVelvoImg,
  },
  {
    id: 'fashion',
    slug: 'lobs-brazilian-art',
    category: 'Fashion Design',
    title: 'Lobs Brazilian Art',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    tag: 'Lobs Brazilian Art',
    tagEn: 'Lobs Brazilian Art',
    image: thumbLobsImg,
  },
]

export const skillsCopy = {
  pt: { kicker: '03 — Skills', heading: 'Habilidade em desenvolvimento.' },
  en: { kicker: '03 — Skills', heading: 'Software skill in development.' },
}

export const skills = [
  { name: 'Illustrator', short: 'Ai', value: 90 },
  { name: 'After Effects', short: 'Ae', value: 85 },
  { name: 'Framer', short: 'Fr', value: 82 },
  { name: 'Photoshop', short: 'Ps', value: 80 },
  { name: 'Premiere', short: 'Pr', value: 78 },
  { name: 'InDesign', short: 'Id', value: 75 },
  { name: 'Figma', short: 'Fig', value: 70 },
  { name: 'XD', short: 'Xd', value: 62 },
]

export const fragmentsCopy = {
  pt: { kicker: '04 — Fragments', heading: 'Processo, bastidor e ruído.' },
  en: { kicker: '04 — Fragments', heading: 'Process, backstage and noise.' },
}

export const fragments = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]

export const manifestoCopy = {
  pt: {
    kicker: '05 — Manifesto',
    text: 'Criar é misturar técnica e intuição. Conectar estética, design e negócio sem perder a alma do que é feito.',
    signature: '— Tiago Jardim',
  },
  en: {
    kicker: '05 — Manifesto',
    text: 'To create is to mix technique and intuition. To connect aesthetics, design and business without losing the soul of what is made.',
    signature: '— Tiago Jardim',
  },
}

export const contactCopy = {
  pt: {
    kicker: '06 — Contact',
    heading: 'Vamos falar sobre uma ideia.',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    email: 'E-mail',
    emailPlaceholder: 'voce@email.com',
    subject: 'Assunto',
    subjectPlaceholder: 'Sobre o que é?',
    message: 'Mensagem',
    messagePlaceholder: 'Conte um pouco sobre sua ideia, projeto ou convite.',
    send: 'Enviar mensagem',
    direct: 'Direto',
    social: 'Redes',
    locationLine1: 'Armação dos Búzios | RJ/BR',
    locationLine2: 'Atende Brasil & Exterior',
  },
  en: {
    kicker: '06 — Contact',
    heading: "Let's talk about an idea.",
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'E-mail',
    emailPlaceholder: 'you@email.com',
    subject: 'Subject',
    subjectPlaceholder: "What's it about?",
    message: 'Message',
    messagePlaceholder: 'Tell me a bit about your idea, project or invitation.',
    send: 'Send message',
    direct: 'Direct',
    social: 'Social',
    locationLine1: 'Armação dos Búzios | RJ/BR',
    locationLine2: 'Serving Brazil & abroad',
  },
}

export const socials = [
  { label: 'Instagram', handle: '@_tgarden', href: 'https://instagram.com/_tgarden' },
  { label: 'LinkedIn', handle: 'tiago-jardim', href: 'https://linkedin.com/in/tiago-jardim-5ab6b3b8' },
  { label: 'Vimeo', handle: 'tiagojardim', href: 'https://vimeo.com/tiagojardim' },
  { label: 'WhatsApp', handle: 'tgardenstudio', href: 'https://wa.me/tgardenstudio' },
]

export const email = 'tiagojardim@tgarden.com.br'

export const footerWord = '© DESIGN & IMPACTO'

export const projectPageCopy = {
  pt: {
    back: 'Voltar',
    project: 'Projeto',
    client: 'Cliente',
    sector: 'Setor',
    year: 'Ano',
    scope: 'Escopo',
    moreProjects: 'Mais projetos',
    allProjects: 'Todos os projetos',
  },
  en: {
    back: 'Back',
    project: 'Project',
    client: 'Client',
    sector: 'Sector',
    year: 'Year',
    scope: 'Scope',
    moreProjects: 'More projects',
    allProjects: 'All projects',
  },
}
