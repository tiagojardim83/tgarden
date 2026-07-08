import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import FeatureStrip from '../components/FeatureStrip'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Fragments from '../components/Fragments'
import Manifesto from '../components/Manifesto'
import Contact from '../components/Contact'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView())
  }, [hash])

  return (
    <main>
      <Hero />
      <FeatureStrip />
      <About />
      <Projects />
      <Skills />
      <Fragments />
      <Manifesto />
      <Contact />
    </main>
  )
}
