import { motion } from 'motion/react'
import { manifestoCopy } from '../data/content'
import { useLang } from '../lib/lang'

export default function Manifesto() {
  const { lang } = useLang()
  const t = manifestoCopy[lang]

  return (
    <section id="manifesto" className="bg-ink text-paper py-20 md:py-28 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 md:items-start">
        <p className="label text-paper/50 md:col-span-3">{t.kicker}</p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-9 font-display uppercase text-4xl md:text-6xl leading-[1.15]"
        >
          {t.text.split(' ').map((word, wi) => (
            <span key={wi}>
              <span className="inline-block">
                {[...word].map((char, ci) => (
                  <span key={ci} className="transition-colors duration-300 hover:text-red">
                    {char}
                  </span>
                ))}
              </span>{' '}
            </span>
          ))}
        </motion.p>

        <p className="md:col-start-4 md:col-span-9 text-sm text-paper/50">{t.signature}</p>
      </div>
    </section>
  )
}
