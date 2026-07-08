import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { contactCopy, email, socials } from '../data/content'
import { useLang } from '../lib/lang'

function FormField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder: string
  type?: string
}) {
  const isTextarea = type === 'textarea'
  const Field = isTextarea ? 'textarea' : 'input'

  return (
    <label className="block py-3 border-b border-ink/25">
      <span className="block label text-ink mb-2">{label}</span>
      <Field
        type={!isTextarea ? type : undefined}
        rows={isTextarea ? 3 : undefined}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-ink placeholder:text-ink-soft/60 resize-none"
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
      <h2 className="font-display uppercase text-4xl md:text-6xl leading-[1.05] max-w-2xl">{t.heading}</h2>
      <p className="label text-ink-soft mt-8 mb-14">{t.kicker}</p>

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
            <form onSubmit={onSubmit} className="flex flex-col">
              <div className="grid md:grid-cols-2 gap-x-6">
                <FormField label={t.name} placeholder={t.namePlaceholder} />
                <FormField label={t.email} placeholder={t.emailPlaceholder} type="email" />
              </div>
              <FormField label={t.subject} placeholder={t.subjectPlaceholder} />
              <FormField label={t.message} placeholder={t.messagePlaceholder} type="textarea" />

              <button
                type="submit"
                data-cursor="SEND"
                className="group mt-8 self-start inline-flex items-center gap-3 bg-ink text-paper rounded-md px-6 py-3 label hover:bg-red transition-colors duration-300"
              >
                {t.send}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-4 md:col-start-9 md:border-l border-ink/15 md:pl-10 flex flex-col gap-10">
          <div>
            <p className="label text-ink-soft mb-3">{t.direct}</p>
            <a
              href={`mailto:${email}`}
              data-cursor="MAIL"
              className="font-display uppercase text-xl md:text-2xl leading-tight hover:text-red transition-colors"
            >
              {email.split('@')[0]}
              <wbr />@{email.split('@')[1]}
            </a>
          </div>

          <div>
            <p className="label text-ink-soft mb-3">{t.social}</p>
            <div className="flex flex-col">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={s.label}
                  className="group flex items-center justify-between py-2.5 border-b border-ink/15 label hover:text-red transition-colors"
                >
                  {s.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="label text-ink-soft leading-relaxed">
            <p>{t.locationLine1}</p>
            <p>{t.locationLine2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
