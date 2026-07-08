import { MotionConfig } from 'motion/react'
import { LangProvider } from './lib/lang'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeatureStrip from './components/FeatureStrip'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Fragments from './components/Fragments'
import Manifesto from './components/Manifesto'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <Cursor />
        <Nav />
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
        <Footer />
      </LangProvider>
    </MotionConfig>
  )
}

export default App
