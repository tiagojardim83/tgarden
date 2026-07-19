import editableCopy from './editableCopy.json'
import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import uxuiImg from '../assets/images/thumb-ux-ui.jpg'
import thumbTgardenImg from '../assets/images/Thumb_Web design_development.jpg'
import motionImg from '../assets/images/Thumb_Site_Motion.webp'
import thumbLobsImg from '../assets/images/Thumb_Fashion_Design.jpg'
import presentationThumbImg from '../assets/images/Presentation_Thumb.jpg'
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
    name: editableCopy['home:hero:name'].pt,
    location: editableCopy['home:hero:location'].pt,
    roleLine1: editableCopy['home:hero:roleLine1'].pt,
    roleLine2: editableCopy['home:hero:roleLine2'].pt,
    nameTop: editableCopy['home:hero:nameTop'].pt,
    nameBottom: editableCopy['home:hero:nameBottom'].pt,
    sub: editableCopy['home:hero:sub'].pt,
    tag: editableCopy['home:hero:tag'].pt,
  },
  en: {
    name: editableCopy['home:hero:name'].en,
    location: editableCopy['home:hero:location'].en,
    roleLine1: editableCopy['home:hero:roleLine1'].en,
    roleLine2: editableCopy['home:hero:roleLine2'].en,
    nameTop: editableCopy['home:hero:nameTop'].en,
    nameBottom: editableCopy['home:hero:nameBottom'].en,
    sub: editableCopy['home:hero:sub'].en,
    tag: editableCopy['home:hero:tag'].en,
  },
}

export const featureStrip = [
  {
    number: '01',
    pt: { kicker: editableCopy['home:featureStrip0:kicker'].pt, heading: editableCopy['home:featureStrip0:heading'].pt },
    en: { kicker: editableCopy['home:featureStrip0:kicker'].en, heading: editableCopy['home:featureStrip0:heading'].en },
  },
  {
    number: '02',
    pt: { kicker: editableCopy['home:featureStrip1:kicker'].pt, heading: editableCopy['home:featureStrip1:heading'].pt },
    en: { kicker: editableCopy['home:featureStrip1:kicker'].en, heading: editableCopy['home:featureStrip1:heading'].en },
  },
  {
    number: '03',
    pt: { kicker: editableCopy['home:featureStrip2:kicker'].pt, heading: editableCopy['home:featureStrip2:heading'].pt },
    en: { kicker: editableCopy['home:featureStrip2:kicker'].en, heading: editableCopy['home:featureStrip2:heading'].en },
  },
]

export const about = {
  pt: {
    kicker: editableCopy['home:about:kicker'].pt,
    heading: editableCopy['home:about:heading'].pt,
    paragraphs: [
      editableCopy['home:about:paragraph0'].pt,
      editableCopy['home:about:paragraph1'].pt,
    ],
  },
  en: {
    kicker: editableCopy['home:about:kicker'].en,
    heading: editableCopy['home:about:heading'].en,
    paragraphs: [
      editableCopy['home:about:paragraph0'].en,
      editableCopy['home:about:paragraph1'].en,
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
  pt: { kicker: editableCopy['home:projects:kicker'].pt, heading: editableCopy['home:projects:heading'].pt, cta: editableCopy['home:projects:cta'].pt },
  en: { kicker: editableCopy['home:projects:kicker'].en, heading: editableCopy['home:projects:heading'].en, cta: editableCopy['home:projects:cta'].en },
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
    count: '4 projetos',
    countEn: '4 projects',
    image: presentationThumbImg,
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
    count: '8 projetos',
    countEn: '8 projects',
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
    count: '3 projetos',
    countEn: '3 projects',
    image: thumbLobsImg,
  },
]

export const skillsCopy = {
  pt: { kicker: editableCopy['home:skills:kicker'].pt, heading: editableCopy['home:skills:heading'].pt, trending: editableCopy['home:skills:trending'].pt },
  en: { kicker: editableCopy['home:skills:kicker'].en, heading: editableCopy['home:skills:heading'].en, trending: editableCopy['home:skills:trending'].en },
}

export const skills = [
  { name: 'Illustrator', short: 'Ai', value: 90 },
  { name: 'After Effects', short: 'Ae', value: 85 },
  { name: 'IA/FRONT-END', short: 'IA/FRONT-END', value: 88, trending: true },
  { name: 'Photoshop', short: 'Ps', value: 80 },
  { name: 'Premiere', short: 'Pr', value: 78 },
  { name: 'InDesign', short: 'Id', value: 75 },
  { name: 'Figma', short: 'Fig', value: 70 },
  { name: 'IA/GEN', short: 'IA/GEN', value: 85, trending: true },
]

export const fragmentsCopy = {
  pt: { kicker: editableCopy['home:fragments:kicker'].pt, heading: editableCopy['home:fragments:heading'].pt },
  en: { kicker: editableCopy['home:fragments:kicker'].en, heading: editableCopy['home:fragments:heading'].en },
}

export const fragments = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]

export const manifestoCopy = {
  pt: {
    kicker: editableCopy['home:manifesto:kicker'].pt,
    text: editableCopy['home:manifesto:text'].pt,
    signature: editableCopy['home:manifesto:signature'].pt,
  },
  en: {
    kicker: editableCopy['home:manifesto:kicker'].en,
    text: editableCopy['home:manifesto:text'].en,
    signature: editableCopy['home:manifesto:signature'].en,
  },
}

export const contactCopy = {
  pt: {
    kicker: editableCopy['home:contact:kicker'].pt,
    heading: editableCopy['home:contact:heading'].pt,
    name: editableCopy['home:contact:name'].pt,
    namePlaceholder: editableCopy['home:contact:namePlaceholder'].pt,
    email: editableCopy['home:contact:email'].pt,
    emailPlaceholder: editableCopy['home:contact:emailPlaceholder'].pt,
    subject: editableCopy['home:contact:subject'].pt,
    subjectPlaceholder: editableCopy['home:contact:subjectPlaceholder'].pt,
    message: editableCopy['home:contact:message'].pt,
    messagePlaceholder: editableCopy['home:contact:messagePlaceholder'].pt,
    send: editableCopy['home:contact:send'].pt,
    direct: editableCopy['home:contact:direct'].pt,
    social: editableCopy['home:contact:social'].pt,
    locationLine1: editableCopy['home:contact:locationLine1'].pt,
    locationLine2: editableCopy['home:contact:locationLine2'].pt,
  },
  en: {
    kicker: editableCopy['home:contact:kicker'].en,
    heading: editableCopy['home:contact:heading'].en,
    name: editableCopy['home:contact:name'].en,
    namePlaceholder: editableCopy['home:contact:namePlaceholder'].en,
    email: editableCopy['home:contact:email'].en,
    emailPlaceholder: editableCopy['home:contact:emailPlaceholder'].en,
    subject: editableCopy['home:contact:subject'].en,
    subjectPlaceholder: editableCopy['home:contact:subjectPlaceholder'].en,
    message: editableCopy['home:contact:message'].en,
    messagePlaceholder: editableCopy['home:contact:messagePlaceholder'].en,
    send: editableCopy['home:contact:send'].en,
    direct: editableCopy['home:contact:direct'].en,
    social: editableCopy['home:contact:social'].en,
    locationLine1: editableCopy['home:contact:locationLine1'].en,
    locationLine2: editableCopy['home:contact:locationLine2'].en,
  },
}

export const socials = [
  { label: 'Instagram', handle: '@tgarden_studio', href: 'https://www.instagram.com/tgarden_studio' },
  { label: 'LinkedIn', handle: 'tiago-jardim', href: 'https://linkedin.com/in/tiago-jardim-5ab6b3b8' },
  { label: 'Vimeo', handle: 'tiagojardim', href: 'https://vimeo.com/tiagojardim' },
  { label: 'WhatsApp', handle: '+55 22 99239-6993', href: 'https://wa.me/5522992396993' },
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
