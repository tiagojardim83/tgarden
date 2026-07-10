import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { navItems, socials } from '../data/content'
import { useLang } from '../lib/lang'
import logoMark from '../assets/tgarden-mark.svg'

const SOCIAL_ICONS: Record<string, string> = {
  Instagram:
    'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153.5.5.887 1.02 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.5-1.02.887-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.747 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04s.01 2.986.06 4.04c.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.747.353.137.882.3 1.857.344 1.054.05 1.37.06 4.04.06s2.987-.01 4.04-.06c.977-.045 1.505-.207 1.858-.344a3.09 3.09 0 001.15-.748c.35-.35.566-.683.747-1.15.137-.353.3-.882.344-1.857.05-1.054.06-1.37.06-4.04s-.01-2.986-.06-4.04c-.045-.976-.207-1.505-.344-1.858a3.098 3.098 0 00-.748-1.15 3.09 3.09 0 00-1.15-.747c-.353-.137-.881-.3-1.857-.344-1.054-.05-1.37-.06-4.04-.06zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  WhatsApp:
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .16 5.304.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.906-5.304 11.909-11.892a11.821 11.821 0 00-3.44-8.453',
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLang()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
    setMenuOpen(false)
  }

  return (
    <>
    <header className="sticky top-0 z-[60] bg-paper/90 backdrop-blur-sm border-b border-ink/15">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={() => scrollTo('hero')}
          data-cursor="TOP"
          className="flex items-center gap-2 label"
        >
          <span className="w-2 h-2 bg-ink inline-block" />
          ©TGarden
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="label py-2 hover:text-red transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="label border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors duration-300"
            aria-label="Toggle language"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <span className="hidden sm:block w-px h-4 bg-ink/25" />
          <button
            onClick={() => scrollTo('contact')}
            data-cursor="GO"
            className="hidden sm:inline-flex items-center gap-1.5 label hover:text-red transition-colors"
          >
            {lang === 'pt' ? 'Falar comigo' : 'Talk to me'} →
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 w-7 z-[61]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <motion.span className="h-[2px] bg-ink block" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} />
            <motion.span className="h-[2px] bg-ink block" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.span className="h-[2px] bg-ink block" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} />
          </button>
        </div>
      </div>
    </header>

    {createPortal(
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden fixed inset-0 z-[100] bg-red flex flex-col items-center px-6 py-14"
          >
            <button
              className="absolute top-6 right-6 flex flex-col gap-1.5 w-7"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="h-[2px] bg-paper block rotate-45 translate-y-[3px]" />
              <span className="h-[2px] bg-paper block -rotate-45 -translate-y-[3px]" />
            </button>

            <img src={logoMark} alt="TGarden" className="w-10 h-10 shrink-0" />

            <div className="flex-1 flex flex-col justify-center w-full max-w-sm border-t border-paper/30">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => scrollTo(item.id)}
                  className="w-full border-b border-paper/30 py-5 font-display uppercase text-paper text-3xl"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-ink">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d={SOCIAL_ICONS[s.label]} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}
