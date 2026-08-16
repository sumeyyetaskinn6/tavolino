import { useEffect, useState } from 'react'
import './Header.css'

const navLinks = [
  { label: 'Anlar', href: '#story' },
  { label: 'Randevu', href: '#reservation' },
  { label: 'İletişim', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`header ${scrolled || menuOpen ? 'header--solid' : ''}`}>
      <div className="header__inner">
        <a className="header__brand" href="#top" aria-label="Tavolino ana sayfa">
          <img
            src="/brand/tavolino-white.webp"
            alt="Tavolino"
            className="header__logo"
            width={180}
            height={54}
            decoding="async"
            fetchPriority="high"
          />
        </a>

        <nav className="header__nav" aria-label="Ana menü">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header__cta" href="#reservation">
          Rezervasyon
        </a>

        <button
          type="button"
          className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="header__mobile-nav" aria-label="Mobil menü">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="header__mobile-cta"
            href="#reservation"
            onClick={() => setMenuOpen(false)}
          >
            Rezervasyon
          </a>
        </nav>
      </div>
    </header>
  )
}
