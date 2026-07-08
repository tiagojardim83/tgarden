import { featureStrip } from '../data/content'
import { useLang } from '../lib/lang'

export default function FeatureStrip() {
  const { lang } = useLang()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-ink/15">
      {featureStrip.map((item, i) => {
        const t = item[lang]
        return (
          <div
            key={i}
            data-cursor="VIEW"
            className="group relative px-6 md:px-10 py-10 md:py-14 min-h-[280px] md:min-h-[380px] flex flex-col justify-between gap-10 border-ink/15 md:border-l first:border-l-0 [border-left-width:0] md:[border-left-width:1px] bg-paper hover:bg-ink transition-colors duration-500 cursor-default"
          >
            <p className="label text-ink-soft group-hover:text-paper/50 transition-colors duration-500">
              {item.number} / {t.kicker}
            </p>

            <h3 className="font-display uppercase text-2xl md:text-4xl leading-[1.05] text-ink group-hover:text-paper transition-colors duration-500">
              {t.heading}
            </h3>

            <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-ink group-hover:border-paper flex items-center justify-center text-ink group-hover:text-paper transition-colors duration-500">
              <span className="text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                →
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
