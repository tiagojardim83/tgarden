import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { LangProvider } from './lib/lang'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <Cursor />
        <div className="max-w-[1260px] mx-auto bg-paper">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos/:slug" element={<ProjectPage />} />
          </Routes>
          <Footer />
        </div>
      </LangProvider>
    </MotionConfig>
  )
}

export default App
