import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FilmShowcase } from './components/FilmShowcase'
import { MomentsGallery } from './components/MomentsGallery'
import { Reservation } from './components/Reservation'
import { VisitInfo } from './components/VisitInfo'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <FilmShowcase />
        <MomentsGallery />
        <Reservation />
        <VisitInfo />
      </main>
      <Footer />
    </div>
  )
}

export default App
