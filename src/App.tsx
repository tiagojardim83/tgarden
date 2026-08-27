import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { LangProvider } from './lib/lang'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const MovimentoHumano = lazy(() => import('./pages/MovimentoHumano'))

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <LangProvider>
          <Cursor />
          <ScrollToTop />
          <Nav />
          <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projetos/uxui" element={<MovimentoHumano />} />
              <Route path="/projetos/:slug" element={<ProjectPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
        </LangProvider>
      </LazyMotion>
    </MotionConfig>
  )
}

export default App
