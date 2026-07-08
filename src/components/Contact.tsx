import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { contactCopy, email, socials } from '../data/content'
import { useLang } from '../lib/lang'

function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const isTextarea = type === 'textarea'
  const Field = isTextarea ? 'textarea' : 'input'

  return (
    <label className="block relative py-3 border-b border-ink/25">
      <span
        className={`absolute left-0 transition-all duration-300 pointer-events-none label ${
          focused || value ? 'text-[10px] -top-1 text-red' : 'text-sm top-4 text-ink-soft'
        }`}
      >
        {label}
      </span>
      <Field
        type={!isTextarea ? type : undefined}
        rows={isTextarea ? 3 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none pt-4 text-base resize-none"
      />
    </label>
  )
}

export default function Contact() {
  const { lang } = useLang()
  const t = contactCopy[lang]
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="px-6 md:px-10 py-20 md:py-28 border-b border-ink/15">
      <p className="text-xs label text-ink-soft mb-4">{t.kicker}</p>
      <h2 className="font-display uppercase text-4xl md:text-6xl leading-[1.05] max-w-2xl mb-14">{t.heading}</h2>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          {sent ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl"
            >
              ✓ {lang === 'pt' ? 'Mensagem enviada. Obrigado!' : 'Message sent. Thank you!'}
            </motion.p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
              <div className="grid md:grid-cols-2 gap-x-6">
                <FormField label={t.name} />
                <FormField label={t.email} type="email" />
              </div>
              <FormField label={t.subject} />
              <FormField label={t.message} type="textarea" />

              <button
                type="submit"
                data-cursor="SEND"
                className="group mt-8 self-start inline-flex items-center gap-3 border border-ink rounded-full px-7 py-3.5 text-xs label hover:bg-ink hover:text-paper transition-colors duration-300"
              >
                {t.send}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-6">
          <a href={`mailto:${email}`} data-cursor="MAIL" className="font-display text-lg break-words hover:text-red transition-colors w-fit">
            {email}
          </a>
          <p className="text-sm text-ink-soft">{t.location}</p>
          <div className="flex flex-col gap-2 mt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor={s.label}
                className="text-xs label w-fit hover:text-red transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
