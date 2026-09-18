import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { m as motion, AnimatePresence } from 'motion/react'
import { navItems, socials } from '../data/content'
import { useLang } from '../lib/lang'
import logoMark from '../assets/tgarden-mark.svg'

const SOCIAL_ICONS: Record<string, string> = {
  Instagram:
    'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153.5.5.887 1.02 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.5-1.02.887-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.747 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04s.01 2.986.06 4.04c.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.747.353.137.882.3 1.857.344 1.054.05 1.37.06 4.04.06s2.987-.01 4.04-.06c.977-.045 1.505-.207 1.858-.344a3.09 3.09 0 001.15-.748c.35-.35.566-.683.747-1.15.137-.353.3-.882.344-1.857.05-1.054.06-1.37.06-4.04s-.01-2.986-.06-4.04c-.045-.976-.207-1.505-.344-1.858a3.098 3.098 0 00-.748-1.15 3.09 3.09 0 00-1.15-.747c-.353-.137-.881-.3-1.857-.344-1.054-.05-1.37-.06-4.04-.06zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  Vimeo:
    'M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32-2.83 3.68-5.225 5.52-7.184 5.52-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.12-4.105-1.68-6.157-.622-2.24-1.29-3.36-2.005-3.36-.156 0-.7.328-1.634.98l-.978-1.26c1.027-.903 2.04-1.806 3.037-2.71C6.098 4.05 7.12 3.49 7.804 3.427c1.634-.157 2.64.96 3.02 3.354.41 2.582.694 4.19.85 4.822.468 2.13.984 3.195 1.548 3.195.44 0 1.1-.696 1.986-2.088.882-1.393 1.356-2.452 1.42-3.18.128-1.202-.348-1.804-1.42-1.804-.505 0-1.026.116-1.563.346 1.037-3.4 3.018-5.052 5.943-4.954 2.17.062 3.194 1.474 3.09 4.236z',
  Dribbble:
    'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z',
  Behance:
    'M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z',
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
            aria-label={lang === 'pt' ? 'EN — switch language to English' : 'PT — mudar idioma para português'}
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
            className="md:hidden fixed inset-0 z-[100] bg-red flex items-center justify-center px-6"
          >
            <button
              className="absolute top-6 right-6 flex flex-col gap-1.5 w-7"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="h-[2px] bg-paper block rotate-45 translate-y-[3px]" />
              <span className="h-[2px] bg-paper block -rotate-45 -translate-y-[3px]" />
            </button>

            <img
              src={logoMark}
              alt="TGarden"
              className="absolute top-6 [@media(max-height:700px)]:top-3 w-56 h-56 [@media(max-height:700px)]:w-24 [@media(max-height:700px)]:h-24 shrink-0"
            />

            <div className="w-full max-w-sm border-t border-paper/30 shrink-0">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => scrollTo(item.id)}
                  className="w-full border-b border-paper/30 py-4 font-display uppercase text-paper text-3xl"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="absolute bottom-10 flex items-center justify-center flex-wrap gap-6 w-full px-6 shrink-0">
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
