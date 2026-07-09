import { navItems, footerWord } from '../data/content'
import Marquee from './Marquee'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper overflow-hidden">
      <div className="h-[20vw] md:h-[16vw] flex items-center overflow-hidden">
        <Marquee
          text={footerWord}
          direction="left"
          duration={12}
          className="font-display text-[28vw] md:text-[24vw] leading-none translate-y-[4%]"
          gapClassName="pr-10 md:pr-16"
        />
      </div>

      <div className="mt-10 px-6 md:px-10 py-6 border-t border-paper/15 flex flex-wrap items-center justify-between gap-4 label text-paper/60">
        <span>© {year} TGarden — Tiago Jardim</span>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-1.5 hover:text-paper transition-colors"
            >
              {item.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          ))}
        </nav>

        <button
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          data-cursor="UP"
          className="hover:text-paper transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
