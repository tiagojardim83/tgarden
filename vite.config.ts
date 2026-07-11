import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vercel serves the app from the domain root; GitHub Pages serves it under /tgarden/.
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/tgarden/',
  plugins: [react()],
})
