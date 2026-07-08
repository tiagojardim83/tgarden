import maokaImg from '../assets/images/maoka-hover.jpg'
import figaImg from '../assets/images/figa-keyvisual-hover.jpg'
import tgardenImg from '../assets/images/Thumb_lobs.jpg'
import lobsImg from '../assets/images/project-lobs.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'

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
  /** false = fact sheet renders once, right under the intro. Defaults to true (repeats after every section, as in Maoka). */
  factSheetRepeat?: boolean
  pt: ProjectDetailCopy
  en: ProjectDetailCopy
}

interface ProjectSection {
  videoKey: string
  heading: string
  text: string
  client: string
  sector: string
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
          heading: 'Identidade antes do logo.',
          text: 'Uma identidade visual não é só um logo, uma cor ou uma fonte. É o sistema operacional de uma marca: o conjunto de sinais, regras e comportamentos que torna uma empresa reconhecível, confiável e memorável antes mesmo de uma palavra ser lida.',
          client: 'Maoka',
          sector: 'Cenografia & Experiência',
        },
        {
          videoKey: '05',
          heading: 'Lola',
          text: 'Uma marca premium de autocuidado traduzida em uma linguagem calma e presente — tons suaves, tipografia elegante e um logo que respira junto com a marca.',
          client: 'Lola',
          sector: 'Autocuidado & Bem-estar',
        },
        {
          videoKey: '06',
          heading: 'Fazenda Santa Mônica',
          text: 'Alimentos de alto padrão e experiências rurais reunidos em um sistema visual autêntico, refinado e atemporal.',
          client: 'Fazenda Santa Mônica',
          sector: 'Alimentos & Experiências Rurais',
        },
        {
          videoKey: '07',
          heading: 'Duck Motorcycle',
          text: 'Uma marca premium de motocicletas com alma de estrada — inspirada na herança do custom americano, no espírito Harley-Davidson de liberdade e pertencimento, unindo cromados, couro e tipografia robusta em uma identidade que atravessa gerações.',
          client: 'Duck Motorcycle',
          sector: 'Motocicletas Customizadas',
        },
        {
          videoKey: '08',
          heading: 'Vanessa Ferreira',
          text: 'Uma marca premium de beleza e skincare construída como um universo delicado e confiante — cores suaves, tipografia elegante e um símbolo pessoal e aspiracional.',
          client: 'Vanessa Ferreira',
          sector: 'Beleza & Skincare',
        },
        {
          videoKey: '09',
          heading: 'Mova',
          text: 'Uma produtora de eventos e ativações de marca que transforma experiências físicas em narrativas visuais — identidade flexível e modular, pronta para se adaptar a qualquer palco, marca ou momento.',
          client: 'Mova',
          sector: 'Produção de Eventos & Ativação de Marca',
        },
      ],
      closing:
        'UMA IDENTIDADE VISUAL SÓ FUNCIONA QUANDO SOBREVIVE AO MUNDO REAL. NA TGARDEN, CONSTRUÍMOS SISTEMAS QUE ESCALAM DE UM CARTÃO DE VISITA A UMA FACHADA, DE UMA TELA A UM ESPAÇO PÚBLICO — FEITOS PARA SEREM RECONHECIDOS, LEMBRADOS E SENTIDOS.',
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
          heading: 'Identity before the logo.',
          text: 'A visual identity is not just a logo, a color or a font. It is the operating system of a brand: the set of signs, rules and behaviors that makes a company recognizable, trustworthy and memorable before a single word is read.',
          client: 'Maoka',
          sector: 'Scenography & Experience',
        },
        {
          videoKey: '05',
          heading: 'Lola',
          text: 'A premium self-care brand translated into a calm yet present language — soft tones, elegant typography and a logo that breathes with the brand.',
          client: 'Lola',
          sector: 'Self-Care & Wellness',
        },
        {
          videoKey: '06',
          heading: 'Fazenda Santa Mônica',
          text: 'High-end food and rural experiences brought together in a visual system that feels authentic, refined and timeless.',
          client: 'Fazenda Santa Mônica',
          sector: 'Food & Rural Experiences',
        },
        {
          videoKey: '07',
          heading: 'Duck Motorcycle',
          text: 'A premium motorcycle brand with road-worn soul — inspired by American custom heritage, in the Harley-Davidson spirit of freedom and belonging, blending chrome, leather and bold typography into an identity built to last generations.',
          client: 'Duck Motorcycle',
          sector: 'Custom Motorcycles',
        },
        {
          videoKey: '08',
          heading: 'Vanessa Ferreira',
          text: 'A premium beauty and skincare brand built as a delicate but confident universe — soft colors, elegant typography and a symbol that feels personal and aspirational.',
          client: 'Vanessa Ferreira',
          sector: 'Beauty & Skincare',
        },
        {
          videoKey: '09',
          heading: 'Mova',
          text: 'An event production and brand activation studio that turns physical experiences into visual narratives — a flexible, modular identity built to adapt to any stage, brand or moment.',
          client: 'Mova',
          sector: 'Event Production & Brand Activation',
        },
      ],
      closing:
        'A VISUAL IDENTITY ONLY WORKS WHEN IT SURVIVES THE REAL WORLD. AT TGARDEN, WE BUILD SYSTEMS THAT SCALE FROM A BUSINESS CARD TO A FACADE, FROM A SCREEN TO A PUBLIC SPACE — MADE TO BE RECOGNIZED, REMEMBERED AND FELT.',
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
        'Key visuals construídos como sistemas vivos — imagens em movimento que carregam a marca por telas, palcos e ruas.',
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Eventos & Marcas de Experiência',
      scope: 'Key Visual, Motion, Direção de Arte',
      sections: [
        {
          videoKey: 'figa-02',
          heading: 'Uma imagem que se move, uma marca que respira.',
          text: 'Key visual é mais do que um cartaz. É uma postura — o jeito que a marca se posiciona, aparece e fala em cada ponto de contato. Cada projeto nasce de um gesto e se desdobra em sistema: tipografia, ritmo, cor e movimento trabalhando como um só.',
          client: 'Movida',
          sector: 'Eventos & Cultura',
        },
        {
          videoKey: 'figa-03',
          heading: 'Uma composição, muitas histórias.',
          text: 'A mesma grade visual acomoda peças completamente diferentes sem perder identidade — porque o sistema é a marca, não cada peça individual.',
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
        'KEY VISUAL COMO COREOGRAFIA — UMA MARCA QUE CHEGA EM MOVIMENTO E FICA NA MEMÓRIA.',
    },
    en: {
      category: 'Key Visual',
      title: 'Figa',
      heroStatement: 'Key visual',
      intro: [
        'Key visuals built as living systems — moving images that carry the brand across screens, stages and streets.',
      ],
      client: 'Figa, Movida, Rokka',
      sector: 'Events & Experience Brands',
      scope: 'Key Visual, Motion, Art Direction',
      sections: [
        {
          videoKey: 'figa-02',
          heading: 'An image that moves, a brand that breathes.',
          text: "Key visual is more than a poster. It's a posture — the way the brand stands, looks and speaks across every touchpoint. Each project starts with a gesture and unfolds into a system: type, rhythm, color and motion working as one.",
          client: 'Movida',
          sector: 'Events & Culture',
        },
        {
          videoKey: 'figa-03',
          heading: 'One composition, many stories.',
          text: 'The same visual grid holds completely different pieces without losing identity — because the system is the brand, not any single piece.',
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
        'KEY VISUAL AS CHOREOGRAPHY — A BRAND THAT ARRIVES MOVING AND STAYS IN THE MEMORY.',
    },
  },
  {
    slug: 'tgarden-site',
    categoryId: 'web-design',
    projectNumber: '01',
    categoryTotal: '01',
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
      ],
      closing:
        "A GOOD WEBSITE DOESN'T SHOUT TO BE NOTICED. IT CONVINCES QUIETLY, AT THE SPEED OF A CLICK.",
    },
  },
  {
    slug: 'carnaval-dos-sonhos',
    categoryId: 'motion-design',
    projectNumber: '01',
    categoryTotal: '01',
    year: '2025',
    heroImage: gallery4,
    pt: {
      category: 'Motion Design',
      title: 'Carnaval dos Sonhos',
      heroStatement: 'Motion não anima a marca. Dá ritmo pra ela.',
      client: 'Carnaval dos Sonhos',
      sector: 'Entretenimento & Cultura Popular',
      scope: 'Motion Design, Direção de Arte',
      sections: [
        {
          videoKey: 'carnaval-02',
          heading: 'Movimento com propósito.',
          text: 'Cada transição carrega intenção — velocidade, peso e ritmo contam a história tanto quanto a imagem parada.',
          client: 'Carnaval dos Sonhos',
          sector: 'Entretenimento & Cultura Popular',
        },
        {
          videoKey: 'carnaval-03',
          heading: 'Da tela ao bloco de rua.',
          text: 'Um sistema de motion pensado pra viver em vídeo, palco de trio elétrico e redes sociais, sem perder identidade em nenhum formato.',
          client: 'Carnaval dos Sonhos',
          sector: 'Entretenimento & Cultura Popular',
        },
      ],
      closing:
        'MOTION DESIGN É A DIFERENÇA ENTRE UMA MARCA QUE EXISTE E UMA MARCA QUE PULSA.',
    },
    en: {
      category: 'Motion Design',
      title: 'Carnaval dos Sonhos',
      heroStatement: "Motion doesn't animate the brand. It gives it rhythm.",
      client: 'Carnaval dos Sonhos',
      sector: 'Entertainment & Popular Culture',
      scope: 'Motion Design, Art Direction',
      sections: [
        {
          videoKey: 'carnaval-02',
          heading: 'Movement with purpose.',
          text: 'Every transition carries intention — speed, weight and rhythm tell the story just as much as the still image does.',
          client: 'Carnaval dos Sonhos',
          sector: 'Entertainment & Popular Culture',
        },
        {
          videoKey: 'carnaval-03',
          heading: 'From screen to street parade.',
          text: 'A motion system built to live on video, on a parade float stage and on social feeds, without losing identity in any format.',
          client: 'Carnaval dos Sonhos',
          sector: 'Entertainment & Popular Culture',
        },
      ],
      closing:
        'MOTION DESIGN IS THE DIFFERENCE BETWEEN A BRAND THAT EXISTS AND A BRAND THAT PULSES.',
    },
  },
  {
    slug: 'velvo',
    categoryId: 'packaging',
    projectNumber: '01',
    categoryTotal: '01',
    year: '2025',
    heroImage: gallery2,
    pt: {
      category: 'Packaging Design',
      title: 'Velvo',
      heroStatement: 'A embalagem é o primeiro produto que o cliente realmente sente.',
      client: 'Velvo',
      sector: 'Bens de Consumo',
      scope: 'Packaging Design, Identidade Visual',
      sections: [
        {
          videoKey: 'velvo-02',
          heading: 'Prateleira é campo de batalha.',
          text: 'Três segundos. É o tempo que uma embalagem tem pra se destacar antes da mão do cliente ir pra outra marca.',
          client: 'Velvo',
          sector: 'Bens de Consumo',
        },
        {
          videoKey: 'velvo-03',
          heading: 'Material como mensagem.',
          text: 'Textura, peso e acabamento comunicam qualidade antes mesmo da primeira palavra ser lida no rótulo.',
          client: 'Velvo',
          sector: 'Bens de Consumo',
        },
      ],
      closing:
        'UMA BOA EMBALAGEM VENDE NA PRATELEIRA E CONVENCE NA MÃO — DUAS EXPERIÊNCIAS, UM SÓ SISTEMA.',
    },
    en: {
      category: 'Packaging Design',
      title: 'Velvo',
      heroStatement: "Packaging is the first product the customer actually feels.",
      client: 'Velvo',
      sector: 'Consumer Goods',
      scope: 'Packaging Design, Visual Identity',
      sections: [
        {
          videoKey: 'velvo-02',
          heading: 'The shelf is a battlefield.',
          text: "Three seconds. That's how long a package has to stand out before the customer's hand moves to another brand.",
          client: 'Velvo',
          sector: 'Consumer Goods',
        },
        {
          videoKey: 'velvo-03',
          heading: 'Material as message.',
          text: 'Texture, weight and finish communicate quality before a single word is read on the label.',
          client: 'Velvo',
          sector: 'Consumer Goods',
        },
      ],
      closing:
        'GOOD PACKAGING SELLS ON THE SHELF AND CONVINCES IN THE HAND — TWO EXPERIENCES, ONE SYSTEM.',
    },
  },
  {
    slug: 'lobs-brazilian-art',
    categoryId: 'fashion',
    projectNumber: '01',
    categoryTotal: '01',
    year: '2025',
    heroImage: lobsImg,
    pt: {
      category: 'Fashion Design',
      title: 'Lobs Brazilian Art',
      heroStatement: 'Moda é identidade que se veste.',
      client: 'Lobs Brazilian Art',
      sector: 'Moda & Arte Brasileira',
      scope: 'Fashion Design, Direção Criativa',
      sections: [
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
        'MODA COM IDENTIDADE NÃO SEGUE TENDÊNCIA — CRIA REPERTÓRIO PRÓPRIO E DEIXA A TENDÊNCIA SEGUIR ELA.',
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
        "FASHION WITH IDENTITY DOESN'T FOLLOW TRENDS — IT BUILDS ITS OWN REPERTOIRE AND LETS TRENDS FOLLOW IT.",
    },
  },
]

export function getProjectDetail(slug: string | undefined) {
  return projectDetails.find((p) => p.slug === slug)
}
