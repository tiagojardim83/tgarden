import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import tgardenImg from '../assets/images/Thumb_lobs.jpg'
import lobsImg from '../assets/images/project-lobs.jpg'
import lobs01Img from '../assets/images/lobs_01.jpg'
import lobs02Img from '../assets/images/lobs_02.jpg'
import lobs03Img from '../assets/images/lobs_03.jpg'
import presentation01Img from '../assets/images/Presentation_01.jpg'
import presentation02Img from '../assets/images/Presentation_02.jpg'
import presentation03Img from '../assets/images/Presentation_03.jpg'
import presentation04Img from '../assets/images/Presentation_04.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
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
  /** false = fact sheet renders once, right under the intro. Defaults to true (repeats after every section, as in Maoka). */
  factSheetRepeat?: boolean
  pt: ProjectDetailCopy
  en: ProjectDetailCopy
}

export interface MediaBlock {
  image?: string
  /** Renders `image` in a clipped, scroll-driven parallax container instead of a flush full-width image. */
  parallax?: boolean
  embedUrl?: string
  /** Matches a file in src/assets/videos/ the same way section-level videoKey does. */
  videoKey?: string
  /** Keeps this block's video at its natural full-width/auto-height size on mobile, instead of the default cropped 18/25 cover treatment. */
  mobileNatural?: boolean
  /** Renders this block's image like Auditions: cropped 18/25 box with the reveal-pan + drag interaction. Desktop is unaffected. */
  mobileCover?: boolean
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
      heroStatement: 'Ideias que conseguem investimento.',
      client: 'MALAB',
      sector: 'Apresentações de Alto Impacto',
      scope: 'Presentation Design, Direção Criativa',
      sections: [
        {
          videoKey: 'presentation-01',
          heading: 'Conteúdo em breve.',
          text: 'Em breve, o case completo deste projeto.',
          client: 'MALAB',
          sector: 'Apresentações de Alto Impacto',
        },
        {
          videoKey: 'presentation-02',
          images: [presentation02Img],
          heading: 'Uma travessia sensível entre voz e memória.',
          text: 'Deck de apresentação para "As Vozes de Milton", experiência que convida o público a sentir a obra de Milton Nascimento — não só assistir.',
          client: 'Its Shooow Time',
          sector: 'Entretenimento & Vida Noturna',
        },
        {
          videoKey: 'presentation-03',
          images: [presentation03Img],
          mobileImageCover: true,
          year: '2015',
          heading: 'Auditions: uma jornada sensorial.',
          text: 'Deck de apresentação "Auditions", conduzindo o público por uma experiência de percepção e sentidos.',
          client: 'Anglo Gold Ashanti',
          sector: 'Mineração & Corporativo',
        },
        {
          videoKey: 'presentation-04',
          media: [{ image: presentation04Img, mobileCover: true }, { videoKey: 'Presenation_04', mobileNatural: true }],
          heading: 'Um show, uma marca global.',
          text: 'Deck de apresentação para o show internacional de Alicia Keys em Belo Horizonte, associando uma artista global a marcas que buscam visibilidade massiva e posicionamento premium.',
          client: 'Malab',
          sector: 'Música & Entretenimento',
        },
      ],
      closing: 'UMA IDEIA SÓ EXISTE DE VERDADE QUANDO ALGUÉM DIZ SIM A ELA.',
    },
    en: {
      category: 'Presentation Design',
      title: 'Presentation Design',
      heroStatement: 'Ideas that get funded.',
      client: 'MALAB',
      sector: 'High-Impact Presentations',
      scope: 'Presentation Design, Creative Direction',
      sections: [
        {
          videoKey: 'presentation-01',
          heading: 'Content coming soon.',
          text: "This project's full case study is coming soon.",
          client: 'MALAB',
          sector: 'High-Impact Presentations',
        },
        {
          videoKey: 'presentation-02',
          images: [presentation02Img],
          heading: 'A sensitive journey between voice and memory.',
          text: 'A pitch deck for "As Vozes de Milton," an experience that invites the audience to feel the work of Milton Nascimento — not just watch it.',
          client: 'Its Shooow Time',
          sector: 'Entertainment & Nightlife',
        },
        {
          videoKey: 'presentation-03',
          images: [presentation03Img],
          mobileImageCover: true,
          year: '2015',
          heading: 'Auditions: a sensorial journey.',
          text: 'A pitch deck for "Auditions," guiding the audience through an experience of perception and the senses.',
          client: 'Anglo Gold Ashanti',
          sector: 'Mining & Corporate',
        },
        {
          videoKey: 'presentation-04',
          media: [{ image: presentation04Img, mobileCover: true }, { videoKey: 'Presenation_04', mobileNatural: true }],
          heading: 'One show, one global brand.',
          text: "A pitch deck for Alicia Keys' international show in Belo Horizonte, pairing a global artist with brands seeking massive visibility and premium positioning.",
          client: 'Malab',
          sector: 'Music & Entertainment',
        },
      ],
      closing: "AN IDEA ONLY TRULY EXISTS ONCE SOMEONE SAYS YES TO IT.",
    },
  },
  {
    slug: 'maoka',
    categoryId: 'visual-identity',
    projectNumber: '01',
    categoryTotal: '06',
    year: '2024',
    heroImage: maokaImg,
    pt: {
      category: 'Identidade Visual',
      title: 'Maoka',
      heroStatement: 'A marca não é um logo. É a forma de uma memória.',
      client: 'Maoka',
      sector: 'Cenografia & Experiência',
      scope: 'Branding, Identidade Visual',
      sections: [
        {
          videoKey: '02',
          mobileAspect: '16/9',
          heading: 'Identidade antes do logo.',
          text: 'Uma identidade visual não é só um logo, uma cor ou uma fonte. É o sistema operacional de uma marca: o conjunto de sinais, regras e comportamentos que torna uma empresa reconhecível, confiável e memorável antes mesmo de uma palavra ser lida.',
          client: 'Maoka',
          sector: 'Cenografia & Experiência',
        },
        {
          videoKey: '05',
          mobileAspect: '16/9',
          heading: 'Lola',
          text: 'Uma marca premium de autocuidado traduzida em uma linguagem calma e presente: tons suaves, tipografia elegante e um logo que respira junto com a marca.',
          client: 'Lola',
          sector: 'Autocuidado & Bem-estar',
        },
        {
          videoKey: '06',
          mobileAspect: '16/9',
          heading: 'Fazenda Santa Mônica',
          text: 'Alimentos de alto padrão e experiências rurais reunidos em um sistema visual autêntico, refinado e atemporal.',
          client: 'Fazenda Santa Mônica',
          sector: 'Alimentos & Experiências Rurais',
        },
        {
          videoKey: '07',
          mobileAspect: '16/9',
          heading: 'Duck Motorcycle',
          text: 'Uma marca premium de motocicletas com alma de estrada, inspirada na herança do custom americano, no espírito Harley-Davidson de liberdade e pertencimento, unindo cromados, couro e tipografia robusta em uma identidade que atravessa gerações.',
          client: 'Duck Motorcycle',
          sector: 'Motocicletas Customizadas',
        },
        {
          videoKey: '08',
          mobileAspect: '16/9',
          heading: 'Vanessa Ferreira',
          text: 'Uma marca premium de beleza e skincare construída como um universo delicado e confiante: cores suaves, tipografia elegante e um símbolo pessoal e aspiracional.',
          client: 'Vanessa Ferreira',
          sector: 'Beleza & Skincare',
        },
        {
          videoKey: '09',
          mobileAspect: '16/9',
          heading: 'Mova',
          text: 'Uma produtora de eventos e ativações de marca que transforma experiências físicas em narrativas visuais: identidade flexível e modular, pronta para se adaptar a qualquer palco, marca ou momento.',
          client: 'Mova',
          sector: 'Produção de Eventos & Ativação de Marca',
        },
      ],
      closing:
        'UMA IDENTIDADE VISUAL SÓ FUNCIONA QUANDO SOBREVIVE AO MUNDO REAL. NA TGARDEN, CONSTRUÍMOS SISTEMAS QUE ESCALAM DE UM CARTÃO DE VISITA A UMA FACHADA, DE UMA TELA A UM ESPAÇO PÚBLICO, FEITOS PARA SEREM RECONHECIDOS, LEMBRADOS E SENTIDOS.',
    },
    en: {
      category: 'Visual Identity',
      title: 'Maoka',
      heroStatement: "A brand is not a logo. It's the shape of a memory.",
      client: 'Maoka',
      sector: 'Scenography & Experience',
      scope: 'Branding, Visual Identity',
      sections: [
        {
          videoKey: '02',
          mobileAspect: '16/9',
          heading: 'Identity before the logo.',
          text: 'A visual identity is not just a logo, a color or a font. It is the operating system of a brand: the set of signs, rules and behaviors that makes a company recognizable, trustworthy and memorable before a single word is read.',
          client: 'Maoka',
          sector: 'Scenography & Experience',
        },
        {
          videoKey: '05',
          mobileAspect: '16/9',
          heading: 'Lola',
          text: 'A premium self-care brand translated into a calm yet present language: soft tones, elegant typography and a logo that breathes with the brand.',
          client: 'Lola',
          sector: 'Self-Care & Wellness',
        },
        {
          videoKey: '06',
          mobileAspect: '16/9',
          heading: 'Fazenda Santa Mônica',
          text: 'High-end food and rural experiences brought together in a visual system that feels authentic, refined and timeless.',
          client: 'Fazenda Santa Mônica',
          sector: 'Food & Rural Experiences',
        },
        {
          videoKey: '07',
          mobileAspect: '16/9',
          heading: 'Duck Motorcycle',
          text: 'A premium motorcycle brand with road-worn soul, inspired by American custom heritage, in the Harley-Davidson spirit of freedom and belonging, blending chrome, leather and bold typography into an identity built to last generations.',
          client: 'Duck Motorcycle',
          sector: 'Custom Motorcycles',
        },
        {
          videoKey: '08',
          mobileAspect: '16/9',
          heading: 'Vanessa Ferreira',
          text: 'A premium beauty and skincare brand built as a delicate but confident universe: soft colors, elegant typography and a symbol that feels personal and aspirational.',
          client: 'Vanessa Ferreira',
          sector: 'Beauty & Skincare',
        },
        {
          videoKey: '09',
          mobileAspect: '16/9',
          heading: 'Mova',
          text: 'An event production and brand activation studio that turns physical experiences into visual narratives: a flexible, modular identity built to adapt to any stage, brand or moment.',
          client: 'Mova',
          sector: 'Event Production & Brand Activation',
        },
      ],
      closing:
        'A VISUAL IDENTITY ONLY WORKS WHEN IT SURVIVES THE REAL WORLD. AT TGARDEN, WE BUILD SYSTEMS THAT SCALE FROM A BUSINESS CARD TO A FACADE, FROM A SCREEN TO A PUBLIC SPACE, MADE TO BE RECOGNIZED, REMEMBERED AND FELT.',
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
      heroStatement: 'Key visual',
      intro: [
        'Key visuals construídos como sistemas vivos: imagens em movimento que carregam a marca por telas, palcos e ruas.',
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Eventos & Marcas de Experiência',
      scope: 'Key Visual, Motion, Direção de Arte',
      sections: [
        {
          videoKey: 'figa-02',
          heading: 'Uma imagem que se move, uma marca que respira.',
          text: 'Key visual é mais do que um cartaz. É uma postura: o jeito que a marca se posiciona, aparece e fala em cada ponto de contato. Cada projeto nasce de um gesto e se desdobra em sistema: tipografia, ritmo, cor e movimento trabalhando como um só.',
          client: 'Movida',
          sector: 'Eventos & Cultura',
        },
        {
          videoKey: 'figa-03',
          heading: 'Uma composição, muitas histórias.',
          text: 'A mesma grade visual acomoda peças completamente diferentes sem perder identidade, porque o sistema é a marca, não cada peça individual.',
          client: 'Movida',
          sector: 'Eventos & Cultura',
        },
        {
          videoKey: 'figa-04',
          heading: 'Frames como linguagem de marca.',
          text: 'Movimento é editorial. Corte, cadência e textura definem a voz da marca tanto quanto tipografia ou cor. De aberturas de evento a loops para redes sociais, cada peça nasce pra viver em movimento antes de virar impresso.',
          client: 'Rokka',
          sector: 'Música & Vida Noturna',
        },
        {
          videoKey: 'figa-05',
          heading: 'Um sistema, muitas superfícies.',
          text: 'A mesma key visual escala de uma tela de celular a um painel de rua sem perder tensão ou clareza. Modularidade, contenção e um gesto central forte: é isso que segura tudo junto em qualquer formato.',
          client: 'Figa, Movida, Rokka',
          sector: 'Aplicação Urbana & Impressa',
        },
      ],
      closing:
        'KEY VISUAL COMO COREOGRAFIA: UMA MARCA QUE CHEGA EM MOVIMENTO E FICA NA MEMÓRIA.',
    },
    en: {
      category: 'Key Visual',
      title: 'Figa',
      heroStatement: 'Key visual',
      intro: [
        'Key visuals built as living systems: moving images that carry the brand across screens, stages and streets.',
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Events & Experience Brands',
      scope: 'Key Visual, Motion, Art Direction',
      sections: [
        {
          videoKey: 'figa-02',
          heading: 'An image that moves, a brand that breathes.',
          text: "Key visual is more than a poster. It's a posture: the way the brand stands, looks and speaks across every touchpoint. Each project starts with a gesture and unfolds into a system: type, rhythm, color and motion working as one.",
          client: 'Movida',
          sector: 'Events & Culture',
        },
        {
          videoKey: 'figa-03',
          heading: 'One composition, many stories.',
          text: 'The same visual grid holds completely different pieces without losing identity, because the system is the brand, not any single piece.',
          client: 'Movida',
          sector: 'Events & Culture',
        },
        {
          videoKey: 'figa-04',
          heading: 'Frames as brand language.',
          text: 'Movement is editorial. Cuts, pacing and texture define the voice as much as type or color do. From event openers to social loops, each piece is built to live in motion first and translate into print second.',
          client: 'Rokka',
          sector: 'Music & Nightlife',
        },
        {
          videoKey: 'figa-05',
          heading: 'One system, many surfaces.',
          text: "The same key visual scales from a phone screen to a stage backdrop without losing tension or clarity. Modularity, restraint and a strong central gesture: that's what holds it together across formats.",
          client: 'Figa, Movida, Rokka',
          sector: 'Street & Print Application',
        },
      ],
      closing:
        'KEY VISUAL AS CHOREOGRAPHY: A BRAND THAT ARRIVES MOVING AND STAYS IN THE MEMORY.',
    },
  },
  {
    slug: 'tgarden-site',
    categoryId: 'web-design',
    projectNumber: '01',
    categoryTotal: '02',
    year: '2025',
    heroImage: tgardenImg,
    pt: {
      category: 'Web Design & Development',
      title: 'TGarden',
      heroStatement: 'Um site não é um cartão de visitas. É a primeira reunião.',
      client: 'TGarden',
      sector: 'Design & Desenvolvimento',
      scope: 'Web Design, Desenvolvimento Front-end',
      sections: [
        {
          videoKey: 'tgarden-site-02',
          heading: 'Performance é parte do design.',
          text: 'Uma animação linda que trava não é design, é ruído. Cada interação foi construída pra ser rápida antes de ser bonita.',
          client: 'TGarden',
          sector: 'Design & Desenvolvimento',
        },
        {
          videoKey: 'tgarden-site-03',
          heading: 'Construído pra crescer.',
          text: 'Componentes reutilizáveis e conteúdo estruturado significam que o site evolui junto com o estúdio, sem recomeçar do zero a cada mudança.',
          client: 'TGarden',
          sector: 'Design & Desenvolvimento',
        },
        {
          videoKey: 'webdesign-efetiva',
          images: [efetivaImg02, efetivaImg03],
          liveUrl: 'https://www.efetivaeng.com.br/',
          heading: 'Efetiva Engenharia',
          text: 'Site institucional para uma construtora especializada em reformas de alto padrão: portfólio de obras, diferenciais e um formulário direto de contato para captar novos projetos.',
          client: 'Efetiva Engenharia',
          sector: 'Engenharia & Reformas',
        },
      ],
      closing:
        'UM SITE BOM NÃO GRITA PRA SER NOTADO. ELE CONVENCE EM SILÊNCIO, NA VELOCIDADE DE UM CLIQUE.',
    },
    en: {
      category: 'Web Design & Development',
      title: 'TGarden',
      heroStatement: "A website isn't a business card. It's the first meeting.",
      client: 'TGarden',
      sector: 'Design & Development',
      scope: 'Web Design, Front-end Development',
      sections: [
        {
          videoKey: 'tgarden-site-02',
          heading: 'Performance is part of design.',
          text: "A beautiful animation that stutters isn't design, it's noise. Every interaction was built to be fast before it was built to be pretty.",
          client: 'TGarden',
          sector: 'Design & Development',
        },
        {
          videoKey: 'tgarden-site-03',
          heading: 'Built to grow.',
          text: 'Reusable components and structured content mean the site evolves alongside the studio, without starting from scratch with every change.',
          client: 'TGarden',
          sector: 'Design & Development',
        },
        {
          videoKey: 'webdesign-efetiva',
          images: [efetivaImg02, efetivaImg03],
          liveUrl: 'https://www.efetivaeng.com.br/',
          heading: 'Efetiva Engenharia',
          text: 'Institutional website for a high-end renovation contractor: project portfolio, differentiators and a direct contact form to bring in new projects.',
          client: 'Efetiva Engenharia',
          sector: 'Engineering & Renovations',
        },
      ],
      closing:
        "A GOOD WEBSITE DOESN'T SHOUT TO BE NOTICED. IT CONVINCES QUIETLY, AT THE SPEED OF A CLICK.",
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
      heroStatement: 'Motion não inventa histórias. Dá visibilidade às que a gente insiste em não ver.',
      client: 'Cidades Invisíveis',
      sector: 'Fotografia & Responsabilidade Social',
      scope: 'Motion Design, Edição de Vídeo',
      sections: [
        {
          videoKey: 'Motion_01',
          mobileAspect: '16/9',
          heading: 'Movimento com propósito.',
          text: 'Cada transição carrega intenção: velocidade, peso e ritmo contam a história tanto quanto a imagem parada.',
          client: 'Agência 2DA',
          sector: 'Publicidade & Comunicação',
        },
        {
          videoKey: 'Motion_02',
          mobileAspect: '16/9',
          heading: 'Da tela ao bloco de rua.',
          text: 'Um sistema de motion pensado pra viver em vídeo, palco de trio elétrico e redes sociais, sem perder identidade em nenhum formato.',
          client: 'Box / Cantin / Its Shooow Time',
          sector: 'Entretenimento & Vida Noturna',
        },
        {
          videoKey: 'Motion_04',
          mobileAspect: '16/9',
          heading: 'Transições com identidade.',
          text: 'Cortes e transições deixam de ser recursos técnicos e passam a fazer parte da linguagem da marca.',
          client: 'Prime Produtora',
          sector: 'Produção Audiovisual',
        },
        {
          videoKey: 'Motion_05',
          mobileAspect: '16/9',
          heading: 'Tipografia em movimento.',
          text: 'Letras que se comportam como personagens, reforçando a mensagem através do próprio gesto.',
          client: 'Agência 2DA',
          sector: 'Publicidade & Comunicação',
        },
        {
          videoKey: 'Motion_06',
          heading: 'Cor e energia.',
          text: 'Paletas dinâmicas acompanham o compasso da trilha, traduzindo emoção em movimento.',
          client: 'Maoka/Box',
          sector: 'Cenografia & Entretenimento',
        },
        {
          videoKey: 'Motion_07',
          mobileAspect: '16/9',
          heading: 'Consistência multiplataforma.',
          text: 'O mesmo sistema de motion se adapta a formatos verticais, horizontais e quadrados sem perder força.',
          client: 'Box/Trio Produtora',
          sector: 'Entretenimento',
        },
        {
          videoKey: 'Motion_08',
          heading: 'Detalhes que constroem escala.',
          text: 'Pequenas variações de timing e easing dão sofisticação a uma peça que parece simples à primeira vista.',
          client: 'Box',
          sector: 'Entretenimento',
        },
        {
          videoKey: 'Motion_09',
          heading: 'Motion como narrativa.',
          text: 'Cada peça conta uma história curta, com começo, clímax e desfecho dentro de poucos segundos.',
          client: 'Box',
          sector: 'Entretenimento',
        },
      ],
      closing:
        'CIDADES INVISÍVEIS SÓ EXISTEM PRA QUEM NUNCA PRECISOU OLHAR PRA ELAS.',
    },
    en: {
      category: 'Motion Design',
      title: 'Cidades Invisíveis',
      heroStatement: "Motion doesn't invent stories. It gives visibility to the ones we insist on not seeing.",
      client: 'Cidades Invisíveis',
      sector: 'Photography & Social Responsibility',
      scope: 'Motion Design, Video Editing',
      sections: [
        {
          videoKey: 'Motion_01',
          mobileAspect: '16/9',
          heading: 'Movement with purpose.',
          text: 'Every transition carries intention: speed, weight and rhythm tell the story just as much as the still image does.',
          client: 'Agência 2DA',
          sector: 'Advertising & Communication',
        },
        {
          videoKey: 'Motion_02',
          mobileAspect: '16/9',
          heading: 'From screen to street parade.',
          text: 'A motion system built to live on video, on a parade float stage and on social feeds, without losing identity in any format.',
          client: 'Box / Cantin / Its Shooow Time',
          sector: 'Entertainment & Nightlife',
        },
        {
          videoKey: 'Motion_04',
          mobileAspect: '16/9',
          heading: 'Transitions with identity.',
          text: "Cuts and transitions stop being technical tools and become part of the brand's own language.",
          client: 'Prime Produtora',
          sector: 'Audiovisual Production',
        },
        {
          videoKey: 'Motion_05',
          mobileAspect: '16/9',
          heading: 'Typography in motion.',
          text: 'Letters behave like characters, reinforcing the message through gesture itself.',
          client: 'Agência 2DA',
          sector: 'Advertising & Communication',
        },
        {
          videoKey: 'Motion_06',
          heading: 'Color and energy.',
          text: 'Dynamic palettes follow the beat of the soundtrack, translating emotion into movement.',
          client: 'Maoka/Box',
          sector: 'Scenography & Entertainment',
        },
        {
          videoKey: 'Motion_07',
          mobileAspect: '16/9',
          heading: 'Cross-platform consistency.',
          text: 'The same motion system adapts to vertical, horizontal and square formats without losing strength.',
          client: 'Box/Trio Produtora',
          sector: 'Entertainment',
        },
        {
          videoKey: 'Motion_08',
          heading: 'Details that build scale.',
          text: 'Small variations in timing and easing add sophistication to a piece that looks simple at first glance.',
          client: 'Box',
          sector: 'Entertainment',
        },
        {
          videoKey: 'Motion_09',
          heading: 'Motion as narrative.',
          text: 'Each piece tells a short story, with a beginning, climax and resolution within a few seconds.',
          client: 'Box',
          sector: 'Entertainment',
        },
      ],
      closing:
        'INVISIBLE CITIES ONLY EXIST FOR THOSE WHO NEVER HAD TO LOOK.',
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
      heroStatement: 'A embalagem é o primeiro produto que o cliente realmente sente.',
      intro: [
        'Três segundos. É o tempo que uma embalagem tem pra se destacar antes da mão do cliente ir pra outra marca.',
        'Textura, peso e acabamento comunicam qualidade antes mesmo da primeira palavra ser lida no rótulo: da paisagem que inspirou a marca ao produto na mão do cliente, cada peça continua a anterior.',
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
          heading: 'Um sistema, em sequência.',
          text: 'Mood board, garrafa, rótulo, identidade e fotografia: uma sequência visual contínua, sem interrupções.',
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
          heading: 'Pata Rara',
          text: 'Uma marca de petiscos naturais que também precisa fazer o cachorro (e o tutor) sorrir: mascote mordendo a embalagem, cores vibrantes por sabor e uma janela que mostra o produto de verdade. As ilustrações também foram feitas por mim.',
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
          heading: 'Biriquim',
          text: 'Uma bebida pronta pra beber que também é presença de festa: rótulo vibrante, sabor bem definido (vodka, guaraná, limão e toque de chapéu de couro) e uma lata que já comunica a experiência antes do primeiro gole.',
          client: 'Biriquim',
          sector: 'Bebidas',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
      ],
      closing:
        'UMA BOA EMBALAGEM VENDE NA PRATELEIRA E CONVENCE NA MÃO: DUAS EXPERIÊNCIAS, UM SÓ SISTEMA.',
    },
    en: {
      category: 'Packaging Design',
      title: 'Velvo',
      heroStatement: "Packaging is the first product the customer actually feels.",
      intro: [
        "Three seconds. That's how long a package has to stand out before the customer's hand moves to another brand.",
        "Texture, weight and finish communicate quality before a single word is read on the label: from the landscape that inspired the brand to the product in the customer's hand, each piece continues the last.",
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
          heading: 'One system, in sequence.',
          text: 'Mood board, bottle, label, identity and photography: one continuous visual sequence, without interruption.',
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
          heading: 'Pata Rara',
          text: 'A natural pet-treat brand that also needs to make the dog (and the owner) smile: a mascot biting through the pack, vibrant colors per flavor, and a window that shows the real product. The illustrations were also made by me.',
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
          heading: 'Biriquim',
          text: "A ready-to-drink can that's also a party statement: a vibrant label, a clear flavor identity (vodka, guaraná, lime and a touch of chapéu-de-couro), and a can that communicates the experience before the first sip.",
          client: 'Biriquim',
          sector: 'Beverages',
          showFactSheet: true,
          factSheetPosition: 'before',
        },
      ],
      closing:
        'GOOD PACKAGING SELLS ON THE SHELF AND CONVINCES IN THE HAND: TWO EXPERIENCES, ONE SYSTEM.',
    },
  },
  {
    slug: 'lobs-brazilian-art',
    categoryId: 'fashion',
    projectNumber: '01',
    categoryTotal: '01',
    year: '2025',
    heroImage: lobsImg,
    heroMobileCover: true,
    pt: {
      category: 'Fashion Design',
      title: 'Lobs Brazilian Art',
      heroStatement: 'Moda é identidade que se veste.',
      client: 'Lobs Brazilian Art',
      sector: 'Moda & Arte Brasileira',
      scope: 'Fashion Design, Direção Criativa',
      sections: [
        {
          videoKey: 'lobs-01',
          media: [{ image: lobs01Img }, { videoKey: 'lobs_02' }, { image: lobs02Img }, { image: lobs03Img }],
          heading: 'Vestido de verdade, não só fotografado.',
          text: 'Do mar ao dia a dia, as peças da Lobs vivem fora do estúdio — a prova de que a identidade da marca é usada, não só vista.',
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs-breather',
          showFactSheet: false,
          heading: 'Streetwear é atitude, não só roupa.',
          text: 'Da rua pro estúdio: cada estampa nasce da cultura urbana brasileira, criando peças que carregam identidade antes de qualquer tendência.',
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs-02',
          heading: 'Estampa como narrativa.',
          text: 'Cada padronagem carrega referência cultural brasileira traduzida em linguagem contemporânea, sem virar clichê.',
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
        {
          videoKey: 'lobs-03',
          heading: 'Da tela à passarela.',
          text: 'Um sistema visual que atravessa lookbook, etiqueta e vitrine mantendo a mesma assinatura em qualquer escala.',
          client: 'Lobs Brazilian Art',
          sector: 'Moda & Arte Brasileira',
        },
      ],
      closing:
        'MODA COM IDENTIDADE NÃO SEGUE TENDÊNCIA: CRIA REPERTÓRIO PRÓPRIO E DEIXA A TENDÊNCIA SEGUIR ELA.',
    },
    en: {
      category: 'Fashion Design',
      title: 'Lobs Brazilian Art',
      heroStatement: 'Fashion is identity you wear.',
      client: 'Lobs Brazilian Art',
      sector: 'Fashion & Brazilian Art',
      scope: 'Fashion Design, Creative Direction',
      sections: [
        {
          videoKey: 'lobs-01',
          media: [{ image: lobs01Img }, { videoKey: 'lobs_02' }, { image: lobs02Img }, { image: lobs03Img }],
          heading: 'Worn for real, not just photographed.',
          text: "From the sea to everyday life, Lobs' pieces live outside the studio — proof the brand's identity is worn, not just seen.",
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs-breather',
          showFactSheet: false,
          heading: 'Streetwear is attitude, not just clothing.',
          text: "From the street to the studio: every print is born from Brazilian urban culture, creating pieces that carry identity before any trend.",
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs-02',
          heading: 'Print as narrative.',
          text: 'Every pattern carries a Brazilian cultural reference translated into a contemporary language, without turning into a cliché.',
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
        {
          videoKey: 'lobs-03',
          heading: 'From screen to runway.',
          text: 'A visual system that crosses lookbook, label and storefront while keeping the same signature at any scale.',
          client: 'Lobs Brazilian Art',
          sector: 'Fashion & Brazilian Art',
        },
      ],
      closing:
        "FASHION WITH IDENTITY DOESN'T FOLLOW TRENDS: IT BUILDS ITS OWN REPERTOIRE AND LETS TRENDS FOLLOW IT.",
    },
  },
]

export function getProjectDetail(slug: string | undefined) {
  return projectDetails.find((p) => p.slug === slug)
}
