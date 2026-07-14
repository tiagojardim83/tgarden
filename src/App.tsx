import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { LangProvider } from './lib/lang'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import MovimentoHumano from './pages/MovimentoHumano'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <Cursor />
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos/movimento-humano" element={<MovimentoHumano />} />
          <Route path="/projetos/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </LangProvider>
    </MotionConfig>
  )
}

export default App
