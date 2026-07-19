import type { ReactNode } from 'react'
import { hero, contactCopy, socials } from '../data/content'
import editableCopy from '../data/editableCopy.json'
import { useLang } from '../lib/lang'
import Marquee from './Marquee'

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
      {children}
    </a>
  )
}

export default function Footer() {
  const { lang } = useLang()
  const t = contactCopy[lang]
  const year = new Date().getFullYear()

  const footerSocials = socials.filter((s) => s.label !== 'WhatsApp')
  const whatsapp = socials.find((s) => s.label === 'WhatsApp')

  return (
    <footer className="border-t border-ink/15 bg-ink text-paper overflow-hidden">
      <div className="px-4 md:px-8 pt-12 pb-4" data-admin-id="text:home:footer:word">
        <Marquee
          text={editableCopy['home:footer:word'][lang]}
          direction="left"
          duration={12}
          className="font-display text-[22vw] leading-[0.8] uppercase tracking-tightest"
          gapClassName="pr-10 md:pr-16"
        />
      </div>

      <div className="border-t border-paper/20 px-4 md:px-8 py-6 grid md:grid-cols-12 gap-6 label text-paper/70">
        <div className="md:col-span-3">
          <p>{hero[lang].name}</p>
          <p className="text-paper/50">© {year}</p>
        </div>

        <div className="md:col-span-3">
          <p>{t.locationLine1}</p>
          <p className="text-paper/50">{t.locationLine2}</p>
        </div>

        <div className="md:col-span-3 flex flex-wrap gap-4">
          {footerSocials.map((s) => (
            <FooterLink key={s.label} href={s.href}>
              {s.label} ↗︎
            </FooterLink>
          ))}
        </div>

        {whatsapp && (
          <div className="md:col-span-3 md:text-right" data-admin-id="text:home:footer:talkToMe">
            <FooterLink href={whatsapp.href}>{editableCopy['home:footer:talkToMe'][lang]} →</FooterLink>
          </div>
        )}
      </div>
    </footer>
  )
}
