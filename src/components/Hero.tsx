import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return

    // iOS requires these properties before play() is requested.
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('autoplay', '')

    const play = () => {
      void video.play().catch(() => {
        // Low Power Mode or browser-level autoplay preferences can still block it.
      })
    }

    play()
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    window.addEventListener('pageshow', play)

    const resumeWhenVisible = () => {
      if (document.visibilityState === 'visible') play()
    }
    document.addEventListener('visibilitychange', resumeWhenVisible)

    return () => {
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      window.removeEventListener('pageshow', play)
      document.removeEventListener('visibilitychange', resumeWhenVisible)
    }
  }, [reducedMotion])

  return (
    <section className="hero" id="top" aria-label="Tavolino tanıtım">
      <div className="hero__media" aria-hidden="true">
        {!reducedMotion ? (
          <video
            ref={videoRef}
            className="hero__video"
            poster="/videos/posters/main-mobile.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            tabIndex={-1}
          >
            <source
              src="/videos/main-mobile.mp4"
              type="video/mp4"
              media="(max-width: 640px)"
            />
            <source src="/videos/main-optimized.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="hero__fallback" />
        )}
        <div className="hero__veil" />
      </div>

      <div className="hero__content">
        <h1 className="hero__brand">
          <img
            src="/brand/tavolino-white.png"
            alt="Tavolino — Coffee & Kitchen Works"
            className="hero__logo"
          />
        </h1>
        <p className="hero__lead">
          Şehrin ortasında sakin bir mola — taze demlenmiş kahve ve samimi bir
          masa.
        </p>
        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="#films">
            Keşfet
          </a>
          <a className="hero__button hero__button--ghost" href="#contact">
            Yol tarifi
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#contact" aria-label="Aşağı kaydır">
        <span className="hero__scroll-line" />
      </a>
    </section>
  )
}
