import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Hero text (the page's LCP element on mobile) and the big display headline
// both need a webfont before they can paint in their final look. Without a
// hint, the browser only discovers these .woff2 files after it has fetched
// and parsed the CSS, adding a full extra network round trip to the
// critical path. Preloading just these two (of the site's four weights)
// starts that fetch in parallel with the CSS instead.
const criticalFontMatches = ['archivo-latin-500-normal', 'archivo-black-latin-400-normal']

function preloadCriticalFonts(): Plugin {
  let base = '/'
  return {
    name: 'preload-critical-fonts',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(html, ctx) {
      const bundle = ctx.bundle
      if (!bundle) return html
      const links = Object.values(bundle)
        .filter(
          (chunk): chunk is typeof chunk & { fileName: string } =>
            chunk.type === 'asset' &&
            chunk.fileName.endsWith('.woff2') &&
            criticalFontMatches.some((match) => chunk.fileName.includes(match)),
        )
        .map(
          (asset) =>
            `<link rel="preload" href="${base}${asset.fileName}" as="font" type="font/woff2" crossorigin>`,
        )
        .join('\n    ')
      return links ? html.replace('</head>', `    ${links}\n  </head>`) : html
    },
  }
}

// https://vite.dev/config/
// Vercel serves the app from the domain root; GitHub Pages serves it under /tgarden/.
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/tgarden/',
  plugins: [react(), preloadCriticalFonts()],
})
