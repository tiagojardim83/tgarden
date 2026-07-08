import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { navItems } from '../data/content'
import { useLang } from '../lib/lang'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-[60] bg-paper/90 backdrop-blur-sm border-b border-ink/15">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={() => scrollTo('hero')}
          data-cursor="TOP"
          className="flex items-center gap-2 font-display uppercase text-sm tracking-tight"
        >
          <span className="w-2 h-2 bg-ink inline-block" />
          ©TGarden
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs label py-2 hover:text-red transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="text-xs label border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors duration-300"
            aria-label="Toggle language"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <span className="hidden sm:block w-px h-4 bg-ink/25" />
          <button
            onClick={() => scrollTo('contact')}
            data-cursor="GO"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs label hover:text-red transition-colors"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden fixed inset-0 bg-ink flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => scrollTo(item.id)}
                className="font-display text-paper text-3xl"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
