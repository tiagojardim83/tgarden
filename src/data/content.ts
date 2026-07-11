import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import uxuiImg from '../assets/images/thumb-ux-ui.jpg'
import thumbTgardenImg from '../assets/images/Thumb_Web design_development.jpg'
import motionImg from '../assets/images/Thumb_Site_Motion.webp'
import thumbLobsImg from '../assets/images/Thumb_Fashion_Design.jpg'
import gallery1 from '../assets/images/gallery-1.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import thumbVelvoImg from '../assets/images/thumb-Packaging.jpg'
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
    sub: 'Transformo ideias em projetos aprovados, do pitch que garante investimento à marca, motion e produto que dão vida a ela.',
    tag: 'TGARDEN STUDIO',
  },
  en: {
    name: 'Tiago Jardim',
    location: 'Búzios / RJ',
    roleLine1: 'Creative Director',
    roleLine2: 'Designer',
    nameTop: 'TGARDEN',
    nameBottom: 'TIAGO JARDIM',
    sub: 'I turn ideas into approved projects, from the pitch that gets funded to the brand, motion and product that bring it to life.',
    tag: 'TGARDEN STUDIO',
  },
}

export const featureStrip = [
  {
    number: '01',
    pt: { kicker: 'Design de Apresentação', heading: 'Apresentações de Alto Impacto' },
    en: { kicker: 'Presentation Design', heading: 'High-Impact Presenta­tions' },
  },
  {
    number: '02',
    pt: { kicker: 'Identidade de Marca', heading: 'Identidade Visual + Key Visual' },
    en: { kicker: 'Brand Identity', heading: 'Visual Identity + Key Visual' },
  },
  {
    number: '03',
    pt: { kicker: 'Experiências Digitais', heading: 'UX/UI • Web Dev • Motion' },
    en: { kicker: 'Digital Experiences', heading: 'UX/UI • Web Dev • Motion' },
  },
]

export const about = {
  pt: {
    kicker: '01 / About',
    heading: 'Entre o design e a ideia de fazer junto.',
    paragraphs: [
      'Sou Tiago Jardim, designer e diretor de arte. Transformo ideias em projetos aprovados, começando pela apresentação que dá luz verde a um negócio, seguida da identidade de marca, motion e experiência digital que a colocam em prática.',
      'Todo projeto existe para resolver o mesmo desafio: tornar uma ideia clara o suficiente para ser aprovada, e consistente o suficiente para ser lembrada. Seja um pitch deck em busca de investimento, uma marca sendo lançada no mundo, ou um produto encontrando sua interface, meu papel é sempre o mesmo: transformar ideias em estrutura.',
    ],
  },
  en: {
    kicker: '01 / About',
    heading: 'Between design, and the idea of making it together.',
    paragraphs: [
      "I'm Tiago Jardim, designer and art director. I turn ideas into approved projects, starting with the presentation that gets a business greenlit, followed by the brand identity, motion and digital experience that bring it to life.",
      "Every project exists to solve the same challenge: making an idea clear enough to be approved, and consistent enough to be remembered. Whether it's a pitch deck seeking investment, a brand launching into the world, or a product finding its interface, my role is always the same: turn ideas into structure.",
    ],
  },
}

export const competencies = [
  'Presentation Design',
  'Visual Identity',
  'Key Visual',
  'Motion Design',
  'UX/UI Design',
  'Web Design & Development',
  'Packaging Design',
  'Fashion Design',
]

export const projectsCopy = {
  pt: { kicker: '02 / Projects', heading: 'Sete frentes, uma mesma assinatura.', cta: 'Todas as frentes' },
  en: { kicker: '02 / Projects', heading: 'Seven fronts, one same signature.', cta: 'All fronts' },
}

export interface ProjectSummary {
  id: string
  slug?: string
  category: string
  title: string
  year: string
  count: string
  countEn: string
  image: string
  imageFit?: 'contain'
}

export const projects: ProjectSummary[] = [
  {
    id: 'presentation-design',
    slug: 'presentation-design',
    category: 'Presentation Design',
    title: 'Presentation Design',
    year: '2025/26',
    count: 'Projetos',
    countEn: 'Projects',
    image: gallery1,
  },
  {
    id: 'visual-identity',
    slug: 'maoka',
    category: 'Visual Identity',
    title: 'Maoka',
    year: '2024',
    count: '6 projetos',
    countEn: '6 projects',
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
    image: figaImg,
  },
  {
    id: 'motion-design',
    slug: 'cidades-invisiveis',
    category: 'Motion Design',
    title: 'Cidades Invisíveis',
    year: '2025/26',
    count: '1 projeto',
    countEn: '1 project',
    image: motionImg,
    imageFit: 'contain',
  },
  {
    id: 'ux-ui',
    slug: 'movimento-humano',
    category: 'UX/UI Design',
    title: 'Movimento Humano',
    year: '2025/26',
    count: '2 projetos',
    countEn: '2 projects',
    image: uxuiImg,
  },
  {
    id: 'web-design',
    slug: 'tgarden-site',
    category: 'Web Design & Development',
    title: 'TGarden',
    year: '2025/26',
    count: '2 projetos',
    countEn: '2 projects',
    image: thumbTgardenImg,
  },
  {
    id: 'packaging',
    slug: 'velvo',
    category: 'Packaging Design',
    title: 'Velvo',
    year: '2025/26',
    count: '3 projetos',
    countEn: '3 projects',
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
    image: thumbLobsImg,
  },
]

export const skillsCopy = {
  pt: { kicker: '03 / Skills', heading: 'Habilidade em desenvolvimento.' },
  en: { kicker: '03 / Skills', heading: 'Software skill in development.' },
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
  pt: { kicker: '04 / Fragments', heading: 'Processo, bastidor e ruído.' },
  en: { kicker: '04 / Fragments', heading: 'Process, backstage and noise.' },
}

export const fragments = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]

export const manifestoCopy = {
  pt: {
    kicker: '05 / Manifesto',
    text: 'Criar é misturar técnica e intuição. Conectar estética, design e negócio sem perder a alma do que é feito.',
    signature: 'Tiago Jardim',
  },
  en: {
    kicker: '05 / Manifesto',
    text: 'To create is to mix technique and intuition. To connect aesthetics, design and business without losing the soul of what is made.',
    signature: 'Tiago Jardim',
  },
}

export const contactCopy = {
  pt: {
    kicker: '06 / Contact',
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
    kicker: '06 / Contact',
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
    viewLive: 'Ver site ao vivo',
    clickToInteract: 'Clique para interagir',
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
    viewLive: 'View live site',
    clickToInteract: 'Click to interact',
  },
}
