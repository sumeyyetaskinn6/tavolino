import { useEffect, useRef, useState } from 'react'
import './FilmShowcase.css'

type Film = {
  id: string
  label: string
}

const films: Film[] = [
  { id: '2', label: 'Mutfak' },
  { id: '3', label: 'Sofra' },
  { id: '4', label: 'Kahve' },
  { id: '5', label: 'Paylaşım' },
  { id: '6', label: 'Detay' },
  { id: '7', label: 'Ritim' },
  { id: '8', label: 'Atmosfer' },
]

// The first cards are visible right after the hero, so they download immediately.
const EAGER_COUNT = 3

function FilmCard({ film, eager }: { film: Film; eager: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const visibleRef = useRef(eager)
  const [primed, setPrimed] = useState(eager)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const play = () => {
      if (!visibleRef.current) return
      void video.play().catch(() => {})
    }

    const prefetchObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPrimed(true)
        if (video.preload !== 'auto') {
          video.preload = 'auto'
          video.load()
        }
        prefetchObserver.disconnect()
      },
      { rootMargin: '1800px 0px', threshold: 0 },
    )

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )

    // The browser's own muted autoplay can start a card that is still off-screen.
    const enforceVisibility = () => {
      if (!visibleRef.current) video.pause()
    }

    prefetchObserver.observe(video)
    playbackObserver.observe(video)
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    video.addEventListener('play', enforceVisibility)

    if (eager) play()

    return () => {
      prefetchObserver.disconnect()
      playbackObserver.disconnect()
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      video.removeEventListener('play', enforceVisibility)
    }
  }, [eager])

  return (
    <figure className="film-showcase__card">
      <video
        ref={videoRef}
        className="film-showcase__video"
        poster={`/videos/posters/film-${film.id}.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload={primed ? 'auto' : 'metadata'}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        aria-label={`Tavolino — ${film.label}`}
      >
        <source
          src={`/videos/film-${film.id}-mobile.mp4`}
          type="video/mp4"
          media="(max-width: 640px)"
        />
        <source src={`/videos/film-${film.id}.mp4`} type="video/mp4" />
      </video>
    </figure>
  )
}

export function FilmShowcase() {
  return (
    <section className="film-showcase" id="films" aria-labelledby="films-title">
      <div className="film-showcase__intro">
        <p className="film-showcase__eyebrow">Hareket halinde</p>
        <h2 className="film-showcase__title" id="films-title">
          Tavolino’nun
          <br />
          kısa filmleri.
        </h2>
        <p className="film-showcase__description">
          Masadan mutfağa, kahveden sohbete — atmosferi bir nefeste hissedin.
        </p>
      </div>

      <div className="film-showcase__grid">
        {films.map((film, index) => (
          <FilmCard key={film.id} film={film} eager={index < EAGER_COUNT} />
        ))}
      </div>
    </section>
  )
}
