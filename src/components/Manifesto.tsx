import { motion } from 'motion/react'
import { manifestoCopy } from '../data/content'
import { useLang } from '../lib/lang'

export default function Manifesto() {
  const { lang } = useLang()
  const t = manifestoCopy[lang]

  return (
    <section id="manifesto" className="bg-ink text-paper py-20 md:py-28 px-6 md:px-10">
      <p className="text-xs label text-paper/50 mb-8">{t.kicker}</p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display uppercase text-3xl md:text-5xl leading-[1.15] max-w-4xl"
      >
        {t.text}
      </motion.p>

      <p className="mt-10 text-sm text-paper/50">{t.signature}</p>
    </section>
  )
}
