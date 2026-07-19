import editableCopy from './editableCopy.json'
import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import tgardenImg from '../assets/images/Thumb_lobs.jpg'
import lobsImg from '../assets/images/project-lobs.jpg'
import lobs01Img from '../assets/images/lobs_01.jpg'
import lobs02Img from '../assets/images/lobs_02.jpg'
import lobs03Img from '../assets/images/lobs_03.jpg'
import jj01Img from '../assets/images/JJ_01.jpg'
import jj03Img from '../assets/images/JJ_03.jpg'
import jj04Img from '../assets/images/JJ_04.jpg'
import jj05Img from '../assets/images/JJ_05.jpg'
import presentation01Img from '../assets/images/Presentation_01.jpg'
import presentation02Img from '../assets/images/Presentation_02.jpg'
import presentation03Img from '../assets/images/Presentation_03.jpg'
import presentation04Img from '../assets/images/Presentation_04.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
import tgardenDesktop02Img from '../assets/images/tgarden_Desktop_02.jpg'
import tgardenDesktop03Img from '../assets/images/tgarden_Desktop_03.jpg'
import efetivaImg02 from '../assets/images/webdesign_efetiva_02.jpg'
import efetivaImg03 from '../assets/images/webdesign_efetiva_03.jpg'
import velvoImg01 from '../assets/images/01_Velvo.jpg'
import velvoImg02 from '../assets/images/02_Velvo.jpg'
import velvoImg03 from '../assets/images/03_Velvo.jpg'
import velvoImg04 from '../assets/images/04_Velvo.jpg'
import velvoImg05 from '../assets/images/05_Velvo.jpg'
import velvoImg06 from '../assets/images/06_Velvo.jpg'
import velvoImg07 from '../assets/images/07_Velvo.jpg'
import velvoImg08 from '../assets/images/08_Velvo.jpg'
import velvoImg08b from '../assets/images/08.1_Velvo.jpg'
import velvoImg09 from '../assets/images/09_Velvo.jpg'
import velvoImg10 from '../assets/images/10_Velvo.jpg'
import velvoImg11 from '../assets/images/11_Velvo.jpg'
import patararaImg01 from '../assets/images/PataRara_Packaging_01.jpg'
import patararaImg02 from '../assets/images/PataRara_Packaging_02.jpg'
import patararaImg03 from '../assets/images/PataRara_Packaging_03.jpg'
import patararaImg04 from '../assets/images/PataRara_Packaging_04.jpg'
import patararaImg06 from '../assets/images/PataRara_Packaging_06.jpg'
import biriquimImg01 from '../assets/images/Biriquim_01.jpg'
import biriquimImg02 from '../assets/images/Biriquim_02.jpg'

// Any file dropped in src/assets/videos/ named "<key>.<ext>" (e.g. "05.mp4")
// is picked up automatically and matched to the section with that videoKey.
// Missing files simply render without a video — nothing breaks.
const videoFiles = import.meta.glob('../assets/videos/*.{mp4,webm,mov,MP4,MOV,WEBM}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function getSectionVideo(videoKey: string): string | undefined {
  const match = Object.entries(videoFiles).find(([path]) => {
    const name = path.split('/').pop()?.split('.')[0]
    return name === videoKey
  })
  return match?.[1]
}

export interface ProjectDetail {
  slug: string
  categoryId: string
  projectNumber: string
  categoryTotal: string
  year: string
  heroImage: string
  heroVideoKey?: string
  /** Renders heroImage on mobile like a section's mobileImageCover: cropped 18/25 box with the reveal-pan + drag interaction. Desktop is unaffected. */
  heroMobileCover?: boolean
  /** false = fact sheet renders once, right under the intro. 'end' = fact sheet renders once, right before the closing statement. Defaults to true (repeats after every section, as in Maoka). */
  factSheetRepeat?: boolean | 'end'
  pt: ProjectDetailCopy
  en: ProjectDetailCopy
}

export interface MediaBlock {
  image?: string
  /** Renders `image` in a clipped, scroll-driven parallax container instead of a flush full-width image. */
  parallax?: boolean
  embedUrl?: string
  /** Overrides the embed's default square aspect ratio (e.g. '16/9' for a real video, vs. the Pacdora-style square 3D viewer). Drops the red background too. */
  embedAspect?: string
  /** Matches a file in src/assets/videos/ the same way section-level videoKey does. */
  videoKey?: string
  /** Keeps this block's video at its natural full-width/auto-height size on mobile, instead of the default cropped 18/25 cover treatment. */
  mobileNatural?: boolean
  /** Crops this block's video to this aspect ratio on desktop (e.g. '16/9'), instead of its natural size. Useful for vertical source clips. */
  desktopAspect?: string
  /** Renders this block's image like Auditions: cropped 18/25 box with the reveal-pan + drag interaction. Desktop is unaffected. */
  mobileCover?: boolean
  /** Renders a heading + text breather instead of media, right at this point in the sequence. Takes priority over image/videoKey/embedUrl when present. */
  heading?: string
  text?: string
}

interface ProjectSection {
  videoKey: string
  images?: string[]
  /** Ordered mix of static images and interactive embeds (e.g. Pacdora 3D packaging viewers). Takes priority over `images` when present. */
  media?: MediaBlock[]
  liveUrl?: string
  heading: string
  text: string
  client: string
  sector: string
  /** Overrides the project-level year for this one section's fact sheet. */
  year?: string
  /** Overrides the project-level factSheetRepeat default for this one section. */
  showFactSheet?: boolean
  /** Where the fact sheet sits relative to the section's media. Defaults to 'after'. */
  factSheetPosition?: 'before' | 'after'
  /** Renders the project-level fact sheet (overall client/sector/scope) right before this section. Used when factSheetRepeat is 'end' to close out the main case study right before a different bundled sub-project starts. */
  precededByProjectFactSheet?: boolean
  /** Each media image animates in on its own as it's scrolled to, instead of the whole block fading in together. */
  staggerMedia?: boolean
  /** Mobile aspect ratio (e.g. '16/9') for this section's video, overriding the site default of 18/25 (1080x1500). */
  mobileAspect?: string
  /** Renders `images` on mobile like the site's hero video: cropped to fill an 18/25 black-backed box, instead of full-width/auto-height. Desktop is unaffected. */
  mobileImageCover?: boolean
}

interface ProjectDetailCopy {
  category: string
  title: string
  heroStatement: string
  intro?: string[]
  client: string
  sector: string
  scope: string
  sections: ProjectSection[]
  closing: string
}

export const projectDetails: ProjectDetail[] = [
  {
    // PLACEHOLDER — Tiago will send the real client(s), sections and media for this project.
    slug: 'presentation-design',
    categoryId: 'presentation-design',
    projectNumber: '01',
    categoryTotal: '01',
    year: '2025/26',
    heroImage: presentation01Img,
    heroMobileCover: true,
    pt: {
      category: 'Presentation Design',
      title: 'Presentation Design',
      heroStatement: editableCopy['presentation-design'].pt,
      client: 'MALAB',
      sector: 'Apresentações de Alto Impacto',
      scope: 'Presentation Design, Direção Criativa',
      sections: [
        {
          videoKey: 'presentation-01',
          heading: editableCopy['presentation-design:s0:heading'].pt,
          text: editableCopy['presentation-design:s0:text'].pt,
          client: 'MALAB',
          sector: 'Apresentações de Alto Impacto',
        },
        {
          videoKey: 'presentation-02',
          images: [presentation02Img],
          mobileImageCover: true,
          heading: editableCopy['presentation-design:s1:heading'].pt,
          text: editableCopy['presentation-design:s1:text'].pt,
          client: 'Its Shooow Time',
          sector: 'Entretenimento & Vida Noturna',
        },
        {
          videoKey: 'presentation-03',
          images: [presentation03Img],
          mobileImageCover: true,
          year: '2015',
          heading: editableCopy['presentation-design:s2:heading'].pt,
          text: editableCopy['presentation-design:s2:text'].pt,
          client: 'Anglo Gold Ashanti',
          sector: 'Mineração & Corporativo',
        },
        {
          videoKey: 'presentation-04',
          media: [{ image: presentation04Img, mobileCover: true }, { videoKey: 'Presenation_04', mobileNatural: true }],
          heading: editableCopy['presentation-design:s3:heading'].pt,
          text: editableCopy['presentation-design:s3:text'].pt,
          client: 'Malab',
          sector: 'Música & Entretenimento',
        },
      ],
      closing: editableCopy['presentation-design:closing'].pt,
    },
    en: {
      category: 'Presentation Design',
      title: 'Presentation Design',
      heroStatement: editableCopy['presentation-design'].en,
      client: 'MALAB',
      sector: 'High-Impact Presentations',
      scope: 'Presentation Design, Creative Direction',
      sections: [
        {
          videoKey: 'presentation-01',
          heading: editableCopy['presentation-design:s0:heading'].en,
          text: editableCopy['presentation-design:s0:text'].en,
          client: 'MALAB',
          sector: 'High-Impact Presentations',
        },
        {
          videoKey: 'presentation-02',
          images: [presentation02Img],
          mobileImageCover: true,
          heading: editableCopy['presentation-design:s1:heading'].en,
          text: editableCopy['presentation-design:s1:text'].en,
          client: 'Its Shooow Time',
          sector: 'Entertainment & Nightlife',
        },
        {
          videoKey: 'presentation-03',
          images: [presentation03Img],
          mobileImageCover: true,
          year: '2015',
          heading: editableCopy['presentation-design:s2:heading'].en,
          text: editableCopy['presentation-design:s2:text'].en,
          client: 'Anglo Gold Ashanti',
          sector: 'Mining & Corporate',
        },
        {
          videoKey: 'presentation-04',
          media: [{ image: presentation04Img, mobileCover: true }, { videoKey: 'Presenation_04', mobileNatural: true }],
          heading: editableCopy['presentation-design:s3:heading'].en,
          text: editableCopy['presentation-design:s3:text'].en,
          client: 'Malab',
          sector: 'Music & Entertainment',
        },
      ],
      closing: editableCopy['presentation-design:closing'].en,
    },
  },
  {
    slug: 'maoka',
    categoryId: 'visual-identity',
    projectNumber: '01',
    categoryTotal: '06',
    year: '2024',
    heroImage: maokaImg,
    heroMobileCover: true,
    pt: {
      category: 'Identidade Visual',
      title: 'Maoka',
      heroStatement: editableCopy.maoka.pt,
      client: 'Maoka',
      sector: 'Cenografia & Experiência',
      scope: 'Branding, Identidade Visual',
      sections: [
        {
          videoKey: 'maoka-intro-media',
          media: [
            { videoKey: '02', mobileNatural: true },
            {
              heading: editableCopy['maoka:s0:m1:heading'].pt,
              text: editableCopy['maoka:s0:m1:text'].pt,
            },
            { videoKey: '01' },
          ],
          heading: editableCopy['maoka:s0:heading'].pt,
          text: editableCopy['maoka:s0:text'].pt,
          client: 'Maoka',
          sector: 'Cenografia & Experiência',
        },
        {
          videoKey: '05',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s1:heading'].pt,
          text: editableCopy['maoka:s1:text'].pt,
          client: 'Lola',
          sector: 'Autocuidado & Bem-estar',
        },
        {
          videoKey: '06',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s2:heading'].pt,
          text: editableCopy['maoka:s2:text'].pt,
          client: 'Fazenda Santa Mônica',
          sector: 'Alimentos & Experiências Rurais',
        },
        {
          videoKey: '07',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s3:heading'].pt,
          text: editableCopy['maoka:s3:text'].pt,
          client: 'Duck Motorcycle',
          sector: 'Motocicletas Customizadas',
        },
        {
          videoKey: '08',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s4:heading'].pt,
          text: editableCopy['maoka:s4:text'].pt,
          client: 'Vanessa Ferreira',
          sector: 'Beleza & Skincare',
        },
        {
          videoKey: '09',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s5:heading'].pt,
          text: editableCopy['maoka:s5:text'].pt,
          client: 'Mova',
          sector: 'Produção de Eventos & Ativação de Marca',
        },
      ],
      closing:
        editableCopy['maoka:closing'].pt,
    },
    en: {
      category: 'Visual Identity',
      title: 'Maoka',
      heroStatement: editableCopy.maoka.en,
      client: 'Maoka',
      sector: 'Scenography & Experience',
      scope: 'Branding, Visual Identity',
      sections: [
        {
          videoKey: 'maoka-intro-media',
          media: [
            { videoKey: '02', mobileNatural: true },
            {
              heading: editableCopy['maoka:s0:m1:heading'].en,
              text: editableCopy['maoka:s0:m1:text'].en,
            },
            { videoKey: '01' },
          ],
          heading: editableCopy['maoka:s0:heading'].en,
          text: editableCopy['maoka:s0:text'].en,
          client: 'Maoka',
          sector: 'Scenography & Experience',
        },
        {
          videoKey: '05',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s1:heading'].en,
          text: editableCopy['maoka:s1:text'].en,
          client: 'Lola',
          sector: 'Self-Care & Wellness',
        },
        {
          videoKey: '06',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s2:heading'].en,
          text: editableCopy['maoka:s2:text'].en,
          client: 'Fazenda Santa Mônica',
          sector: 'Food & Rural Experiences',
        },
        {
          videoKey: '07',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s3:heading'].en,
          text: editableCopy['maoka:s3:text'].en,
          client: 'Duck Motorcycle',
          sector: 'Custom Motorcycles',
        },
        {
          videoKey: '08',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s4:heading'].en,
          text: editableCopy['maoka:s4:text'].en,
          client: 'Vanessa Ferreira',
          sector: 'Beauty & Skincare',
        },
        {
          videoKey: '09',
          mobileAspect: '16/9',
          heading: editableCopy['maoka:s5:heading'].en,
          text: editableCopy['maoka:s5:text'].en,
          client: 'Mova',
          sector: 'Event Production & Brand Activation',
        },
      ],
      closing:
        editableCopy['maoka:closing'].en,
    },
  },
  {
    slug: 'figa',
    categoryId: 'key-visual',
    projectNumber: '01',
    categoryTotal: '05',
    year: '2025',
    heroImage: figaImg,
    heroVideoKey: 'figa-01',
    factSheetRepeat: false,
    pt: {
      category: 'Key Visual',
      title: 'Figa',
      heroStatement: editableCopy.figa.pt,
      intro: [
        editableCopy['figa:intro0'].pt,
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Eventos & Marcas de Experiência',
      scope: 'Key Visual, Motion, Direção de Arte',
      sections: [
        {
          videoKey: 'figa-02',
          heading: editableCopy['figa:s0:heading'].pt,
          text: editableCopy['figa:s0:text'].pt,
          client: 'Movida',
          sector: 'Eventos & Cultura',
        },
        {
          videoKey: 'figa-03',
          heading: editableCopy['figa:s1:heading'].pt,
          text: editableCopy['figa:s1:text'].pt,
          client: 'Movida',
          sector: 'Eventos & Cultura',
        },
        {
          videoKey: 'figa-04',
          heading: editableCopy['figa:s2:heading'].pt,
          text: editableCopy['figa:s2:text'].pt,
          client: 'Rokka',
          sector: 'Música & Vida Noturna',
        },
        {
          videoKey: 'figa-05',
          heading: editableCopy['figa:s3:heading'].pt,
          text: editableCopy['figa:s3:text'].pt,
          client: 'Figa, Movida, Rokka',
          sector: 'Aplicação Urbana & Impressa',
        },
      ],
      closing:
        editableCopy['figa:closing'].pt,
    },
    en: {
      category: 'Key Visual',
      title: 'Figa',
      heroStatement: editableCopy.figa.en,
      intro: [
        editableCopy['figa:intro0'].en,
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Events & Experience Brands',
      scope: 'Key Visual, Motion, Art Direction',
      sections: [
        {
          videoKey: 'figa-02',
          heading: editableCopy['figa:s0:heading'].en,
          text: editableCopy['figa:s0:text'].en,
          client: 'Movida',
          sector: 'Events & Culture',
        },
        {
          videoKey: 'figa-03',
          heading: editableCopy['figa:s1:heading'].en,
          text: editableCopy['figa:s1:text'].en,
          client: 'Movida',
          sector: 'Events & Culture',
        },
        {
          videoKey: 'figa-04',
          heading: editableCopy['figa:s2:heading'].en,
          text: editableCopy['figa:s2:text'].en,
          client: 'Rokka',
          sector: 'Music & Nightlife',
        },
        {
          videoKey: 'figa-05',
          heading: editableCopy['figa:s3:heading'].en,
          text: editableCopy['figa:s3:text'].en,
          client: 'Figa, Movida, Rokka',
          sector: 'Street & Print Application',
        },
      ],
      closing:
        editableCopy['figa:closing'].en,
    },
  },
  {
    slug: 'tgarden-site',
    categoryId: 'web-design',
    projectNumber: '01',
    categoryTotal: '02',
    year: '2025',
    heroImage: tgardenImg,
    heroMobileCover: true,
    factSheetRepeat: 'end',
    pt: {
      category: 'Web Design & Development',
      title: 'TGarden',
      heroStatement: editableCopy['tgarden-site'].pt,
      client: 'TGarden',
      sector: 'Design & Desenvolvimento',
      scope: 'Web Design, Desenvolvimento Front-end',
      sections: [
        {
          videoKey: 'tgarden-site-02',
          heading: editableCopy['tgarden-site:s0:heading'].pt,
          text: editableCopy['tgarden-site:s0:text'].pt,
          client: 'TGarden',
          sector: 'Design & Desenvolvimento',
        },
        {
          videoKey: 'tgarden-site-03',
          images: [tgardenDesktop03Img],
          mobileImageCover: true,
          showFactSheet: false,
          liveUrl: 'https://tiagojardim83.github.io/tgarden/',
          heading: editableCopy['tgarden-site:s1:heading'].pt,
          text: editableCopy['tgarden-site:s1:text'].pt,
          client: 'TGarden',
          sector: 'Design & Desenvolvimento',
        },
        {
          videoKey: 'tgarden-site-04',
          images: [tgardenDesktop02Img],
          mobileImageCover: true,
          heading: editableCopy['tgarden-site:s2:heading'].pt,
          text: editableCopy['tgarden-site:s2:text'].pt,
          client: 'TGarden',
          sector: 'Design & Desenvolvimento',
        },
        {
          videoKey: 'webdesign-efetiva',
          images: [efetivaImg02, efetivaImg03],
          mobileImageCover: true,
          liveUrl: 'https://www.efetivaeng.com.br/',
          precededByProjectFactSheet: true,
          showFactSheet: true,
          heading: editableCopy['tgarden-site:s3:heading'].pt,
          text: editableCopy['tgarden-site:s3:text'].pt,
          client: 'Efetiva Engenharia',
          sector: 'Engenharia & Reformas',
        },
      ],
      closing:
        editableCopy['tgarden-site:closing'].pt,
    },
    en: {
      category: 'Web Design & Development',
      title: 'TGarden',
      heroStatement: editableCopy['tgarden-site'].en,
      client: 'TGarden',
      sector: 'Design & Development',
      scope: 'Web Design, Front-end Development',
      sections: [
        {
          videoKey: 'tgarden-site-02',
          heading: editableCopy['tgarden-site:s0:heading'].en,
          text: editableCopy['tgarden-site:s0:text'].en,
          client: 'TGarden',
          sector: 'Design & Development',
        },
        {
          videoKey: 'tgarden-site-03',
          images: [tgardenDesktop03Img],
          mobileImageCover: true,
          showFactSheet: false,
          liveUrl: 'https://tiagojardim83.github.io/tgarden/',
          heading: editableCopy['tgarden-site:s1:heading'].en,
          text: editableCopy['tgarden-site:s1:text'].en,
          client: 'TGarden',
          sector: 'Design & Development',
        },
        {
          videoKey: 'tgarden-site-04',
          images: [tgardenDesktop02Img],
          mobileImageCover: true,
          heading: editableCopy['tgarden-site:s2:heading'].en,
          text: editableCopy['tgarden-site:s2:text'].en,
          client: 'TGarden',
          sector: 'Design & Development',
        },
        {
          videoKey: 'webdesign-efetiva',
          images: [efetivaImg02, efetivaImg03],
          mobileImageCover: true,
          liveUrl: 'https://www.efetivaeng.com.br/',
          precededByProjectFactSheet: true,
          showFactSheet: true,
          heading: editableCopy['tgarden-site:s3:heading'].en,
          text: editableCopy['tgarden-site:s3:text'].en,
          client: 'Efetiva Engenharia',
          sector: 'Engineering & Renovations',
        },
      ],
      closing:
        editableCopy['tgarden-site:closing'].en,
    },
  },
  {
    slug: 'cidades-invisiveis',
    categoryId: 'motion-design',
    projectNumber: '01',
    categoryTotal: '08',
    year: '2025',
    heroImage: gallery4,
    heroVideoKey: 'Motion_03',
    pt: {
      category: 'Motion Design',
      title: 'Cidades Invisíveis',
      heroStatement: editableCopy['cidades-invisiveis'].pt,
      client: 'Cidades Invisíveis',
      sector: 'Fotografia & Responsabilidade Social',
      scope: 'Motion Design, Edição de Vídeo',
      sections: [
        {
          videoKey: 'Motion_01',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s0:heading'].pt,
          text: editableCopy['cidades-invisiveis:s0:text'].pt,
          client: 'Agência 2DA',
          sector: 'Publicidade & Comunicação',
        },
        {
          videoKey: 'Motion_02',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s1:heading'].pt,
          text: editableCopy['cidades-invisiveis:s1:text'].pt,
          client: 'Box / Cantin / Its Shooow Time',
          sector: 'Entretenimento & Vida Noturna',
        },
        {
          videoKey: 'Motion_04',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s2:heading'].pt,
          text: editableCopy['cidades-invisiveis:s2:text'].pt,
          client: 'Prime Produtora',
          sector: 'Produção Audiovisual',
        },
        {
          videoKey: 'Motion_05',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s3:heading'].pt,
          text: editableCopy['cidades-invisiveis:s3:text'].pt,
          client: 'Agência 2DA',
          sector: 'Publicidade & Comunicação',
        },
        {
          videoKey: 'Motion_06',
          heading: editableCopy['cidades-invisiveis:s4:heading'].pt,
          text: editableCopy['cidades-invisiveis:s4:text'].pt,
          client: 'Maoka/Box',
          sector: 'Cenografia & Entretenimento',
        },
        {
          videoKey: 'Motion_07',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s5:heading'].pt,
          text: editableCopy['cidades-invisiveis:s5:text'].pt,
          client: 'Box/Trio Produtora',
          sector: 'Entretenimento',
        },
        {
          videoKey: 'Motion_08',
          heading: editableCopy['cidades-invisiveis:s6:heading'].pt,
          text: editableCopy['cidades-invisiveis:s6:text'].pt,
          client: 'Box',
          sector: 'Entretenimento',
        },
        {
          videoKey: 'Motion_09',
          heading: editableCopy['cidades-invisiveis:s7:heading'].pt,
          text: editableCopy['cidades-invisiveis:s7:text'].pt,
          client: 'Box',
          sector: 'Entretenimento',
        },
      ],
      closing:
        editableCopy['cidades-invisiveis:closing'].pt,
    },
    en: {
      category: 'Motion Design',
      title: 'Cidades Invisíveis',
      heroStatement: editableCopy['cidades-invisiveis'].en,
      client: 'Cidades Invisíveis',
      sector: 'Photography & Social Responsibility',
      scope: 'Motion Design, Video Editing',
      sections: [
        {
          videoKey: 'Motion_01',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s0:heading'].en,
          text: editableCopy['cidades-invisiveis:s0:text'].en,
          client: 'Agência 2DA',
          sector: 'Advertising & Communication',
        },
        {
          videoKey: 'Motion_02',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s1:heading'].en,
          text: editableCopy['cidades-invisiveis:s1:text'].en,
          client: 'Box / Cantin / Its Shooow Time',
          sector: 'Entertainment & Nightlife',
        },
        {
          videoKey: 'Motion_04',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s2:heading'].en,
          text: editableCopy['cidades-invisiveis:s2:text'].en,
          client: 'Prime Produtora',
          sector: 'Audiovisual Production',
        },
        {
          videoKey: 'Motion_05',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s3:heading'].en,
          text: editableCopy['cidades-invisiveis:s3:text'].en,
          client: 'Agência 2DA',
          sector: 'Advertising & Communication',
        },
        {
          videoKey: 'Motion_06',
          heading: editableCopy['cidades-invisiveis:s4:heading'].en,
          text: editableCopy['cidades-invisiveis:s4:text'].en,
          client: 'Maoka/Box',
          sector: 'Scenography & Entertainment',
        },
        {
          videoKey: 'Motion_07',
          mobileAspect: '16/9',
          heading: editableCopy['cidades-invisiveis:s5:heading'].en,
          text: editableCopy['cidades-invisiveis:s5:text'].en,
          client: 'Box/Trio Produtora',
          sector: 'Entertainment',
        },
        {
          videoKey: 'Motion_08',
          heading: editableCopy['cidades-invisiveis:s6:heading'].en,
          text: editableCopy['cidades-invisiveis:s6:text'].en,
          client: 'Box',
          sector: 'Entertainment',
        },
        {
          videoKey: 'Motion_09',
          heading: editableCopy['cidades-invisiveis:s7:heading'].en,
          text: editableCopy['cidades-invisiveis:s7:text'].en,
          client: 'Box',
          sector: 'Entertainment',
        },
      ],
      closing:
        editableCopy['cidades-invisiveis:closing'].en,
    },
  },
  {
    slug: 'velvo',
    categoryId: 'packaging',
    projectNumber: '01',
    categoryTotal: '03',
    year: '2025',
    heroImage: velvoImg01,
    factSheetRepeat: false,
    pt: {
      category: 'Packaging Design',
      title: 'Velvo',
      heroStatement: editableCopy.velvo.pt,
      intro: [
        editableCopy['velvo:intro0'].pt,
        editableCopy['velvo:intro1'].pt,
      ],
      client: 'Velvo',
      sector: 'Bens de Consumo',
      scope: 'Packaging Design, Identidade Visual',
      sections: [
        {
          videoKey: 'velvo-sequence',
          images: [
            velvoImg02,
            velvoImg03,
            velvoImg04,
            velvoImg05,
            velvoImg06,
            velvoImg07,
            velvoImg08,
            velvoImg08b,
            velvoImg09,
            velvoImg11,
            velvoImg10,
          ],
          heading: editableCopy['velvo:s0:heading'].pt,
          text: editableCopy['velvo:s0:text'].pt,
          client: 'Velvo',
          sector: 'Bens de Consumo',
        },
        {
          videoKey: 'patarara-sequence',
          media: [
            { image: patararaImg01 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps1of0x7if' },
            { image: patararaImg02, parallax: true },
            { image: patararaImg03 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps9gc4lo1v' },
            { image: patararaImg06, parallax: true },
            { image: patararaImg04 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps9f6hpmac' },
          ],
          heading: editableCopy['velvo:s1:heading'].pt,
          text: editableCopy['velvo:s1:text'].pt,
          client: 'Pata Rara',
          sector: 'Pet Food',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
        {
          videoKey: 'biriquim-sequence',
          media: [
            { image: biriquimImg01 },
            { image: biriquimImg02 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=pseh0snxto' },
            { videoKey: 'biriquim_01' },
          ],
          heading: editableCopy['velvo:s2:heading'].pt,
          text: editableCopy['velvo:s2:text'].pt,
          client: 'Biriquim',
          sector: 'Bebidas',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
      ],
      closing:
        editableCopy['velvo:closing'].pt,
    },
    en: {
      category: 'Packaging Design',
      title: 'Velvo',
      heroStatement: editableCopy.velvo.en,
      intro: [
        editableCopy['velvo:intro0'].en,
        editableCopy['velvo:intro1'].en,
      ],
      client: 'Velvo',
      sector: 'Consumer Goods',
      scope: 'Packaging Design, Visual Identity',
      sections: [
        {
          videoKey: 'velvo-sequence',
          images: [
            velvoImg02,
            velvoImg03,
            velvoImg04,
            velvoImg05,
            velvoImg06,
            velvoImg07,
            velvoImg08,
            velvoImg08b,
            velvoImg09,
            velvoImg11,
            velvoImg10,
          ],
          heading: editableCopy['velvo:s0:heading'].en,
          text: editableCopy['velvo:s0:text'].en,
          client: 'Velvo',
          sector: 'Consumer Goods',
        },
        {
          videoKey: 'patarara-sequence',
          media: [
            { image: patararaImg01 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps1of0x7if' },
            { image: patararaImg02, parallax: true },
            { image: patararaImg03 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps9gc4lo1v' },
            { image: patararaImg06, parallax: true },
            { image: patararaImg04 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=ps9f6hpmac' },
          ],
          heading: editableCopy['velvo:s1:heading'].en,
          text: editableCopy['velvo:s1:text'].en,
          client: 'Pata Rara',
          sector: 'Pet Food',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
        {
          videoKey: 'biriquim-sequence',
          media: [
            { image: biriquimImg01 },
            { image: biriquimImg02 },
            { embedUrl: 'https://www.pacdora.com/pt/share?filter_url=pseh0snxto' },
            { videoKey: 'biriquim_01' },
          ],
          heading: editableCopy['velvo:s2:heading'].en,
          text: editableCopy['velvo:s2:text'].en,
          client: 'Biriquim',
          sector: 'Beverages',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
      ],
      closing:
        editableCopy['velvo:closing'].en,
    },
  },
  {
    slug: 'lobs-brazilian-art',
    categoryId: 'fashion',
    projectNumber: '01',
    categoryTotal: '01',
    year: 'Est.2006',
    heroImage: lobsImg,
    heroMobileCover: true,
    pt: {
      category: 'Fashion Design',
      title: 'Lobs Brazilian Art',
      heroStatement: editableCopy['lobs-brazilian-art'].pt,
      client: 'Lobs Brazilian Art',
      sector: 'Moda & Arte Brasileira',
      scope: 'Fashion Design, Direção Criativa',
      sections: [
        {
          videoKey: 'lobs-01',
          media: [{ image: lobs01Img, mobileCover: true }, { videoKey: 'lobs_02' }],
          showFactSheet: false,
          heading: editableCopy['lobs-brazilian-art:s0:heading'].pt,
          text: editableCopy['lobs-brazilian-art:s0:text'].pt,
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs-breather',
          media: [
            { image: lobs02Img, mobileCover: true },
            {
              heading: editableCopy['lobs-brazilian-art:s1:m1:heading'].pt,
              text: editableCopy['lobs-brazilian-art:s1:m1:text'].pt,
            },
            { videoKey: 'lobs_05' },
            {
              heading: editableCopy['lobs-brazilian-art:s1:m3:heading'].pt,
              text: editableCopy['lobs-brazilian-art:s1:m3:text'].pt,
            },
            { videoKey: 'lobs_03', desktopAspect: '16/9' },
            { image: lobs03Img, mobileCover: true },
          ],
          showFactSheet: false,
          heading: editableCopy['lobs-brazilian-art:s1:heading'].pt,
          text: editableCopy['lobs-brazilian-art:s1:text'].pt,
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs_04',
          heading: editableCopy['lobs-brazilian-art:s2:heading'].pt,
          text: editableCopy['lobs-brazilian-art:s2:text'].pt,
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs-04',
          media: [
            { image: jj01Img },
            { embedUrl: 'https://player.vimeo.com/video/540778495?h=be5f54999f', embedAspect: '16/9' },
            { image: jj03Img },
            { image: jj04Img },
            { image: jj05Img },
          ],
          heading: editableCopy['lobs-brazilian-art:s3:heading'].pt,
          text: editableCopy['lobs-brazilian-art:s3:text'].pt,
          client: 'John John Denim',
          sector: 'Moda & Concursos Criativos',
          year: '2020',
        },
        {
          videoKey: 'Reserva_02',
          heading: editableCopy['lobs-brazilian-art:s4:heading'].pt,
          text: editableCopy['lobs-brazilian-art:s4:text'].pt,
          client: 'Reserva',
          sector: 'Moda & Grandes Marcas',
          year: '2023',
        },
      ],
      closing:
        editableCopy['lobs-brazilian-art:closing'].pt,
    },
    en: {
      category: 'Fashion Design',
      title: 'Lobs Brazilian Art',
      heroStatement: editableCopy['lobs-brazilian-art'].en,
      client: 'Lobs Brazilian Art',
      sector: 'Fashion & Brazilian Art',
      scope: 'Fashion Design, Creative Direction',
      sections: [
        {
          videoKey: 'lobs-01',
          media: [{ image: lobs01Img, mobileCover: true }, { videoKey: 'lobs_02' }],
          showFactSheet: false,
          heading: editableCopy['lobs-brazilian-art:s0:heading'].en,
          text: editableCopy['lobs-brazilian-art:s0:text'].en,
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs-breather',
          media: [
            { image: lobs02Img, mobileCover: true },
            {
              heading: editableCopy['lobs-brazilian-art:s1:m1:heading'].en,
              text: editableCopy['lobs-brazilian-art:s1:m1:text'].en,
            },
            { videoKey: 'lobs_05' },
            {
              heading: editableCopy['lobs-brazilian-art:s1:m3:heading'].en,
              text: editableCopy['lobs-brazilian-art:s1:m3:text'].en,
            },
            { videoKey: 'lobs_03', desktopAspect: '16/9' },
            { image: lobs03Img, mobileCover: true },
          ],
          showFactSheet: false,
          heading: editableCopy['lobs-brazilian-art:s1:heading'].en,
          text: editableCopy['lobs-brazilian-art:s1:text'].en,
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs_04',
          heading: editableCopy['lobs-brazilian-art:s2:heading'].en,
          text: editableCopy['lobs-brazilian-art:s2:text'].en,
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs-04',
          media: [
            { image: jj01Img },
            { embedUrl: 'https://player.vimeo.com/video/540778495?h=be5f54999f', embedAspect: '16/9' },
            { image: jj03Img },
            { image: jj04Img },
            { image: jj05Img },
          ],
          heading: editableCopy['lobs-brazilian-art:s3:heading'].en,
          text: editableCopy['lobs-brazilian-art:s3:text'].en,
          client: 'John John Denim',
          sector: 'Fashion & Creative Contests',
          year: '2020',
        },
        {
          videoKey: 'Reserva_02',
          heading: editableCopy['lobs-brazilian-art:s4:heading'].en,
          text: editableCopy['lobs-brazilian-art:s4:text'].en,
          client: 'Reserva',
          sector: 'Fashion & Major Brands',
          year: '2023',
        },
      ],
      closing:
        editableCopy['lobs-brazilian-art:closing'].en,
    },
  },
]

export function getProjectDetail(slug: string | undefined) {
  return projectDetails.find((p) => p.slug === slug)
}
