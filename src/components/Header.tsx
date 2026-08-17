import { useEffect, useState } from 'react'
import './Header.css'

const MENU_URL = 'https://www.menuburada.tr/tavolino'

const navLinks = [
  { label: 'Menü', href: MENU_URL, external: true },
  { label: 'Anlar', href: '#story' },
  { label: 'Randevu', href: '#reservation' },
  { label: 'İletişim', href: '#contact' },
]

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=23+Nisan%2C+Mithatpa%C5%9Fa+Cd.+17-A%2C+16130+Nil%C3%BCfer%2FBursa'

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`header ${scrolled || menuOpen ? 'header--solid' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
    >
      <div className="header__inner">
        <a
          className="header__brand"
          href="#top"
          aria-label="Tavolino ana sayfa"
          onClick={closeMenu}
        >
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
            <a
              key={link.href}
              href={link.href}
              className="header__link"
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
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
        <div className="header__mobile-panel">
          <p className="header__mobile-eyebrow">Menü</p>

          <nav className="header__mobile-nav" aria-label="Mobil menü">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="header__mobile-link"
                onClick={closeMenu}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="header__mobile-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="header__mobile-label">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="header__mobile-footer">
            <a
              className="header__mobile-cta"
              href="#reservation"
              onClick={closeMenu}
            >
              Rezervasyon
            </a>

            <div className="header__mobile-meta">
              <a className="header__mobile-meta-link" href="tel:+902249995056">
                Ara
              </a>
              <a
                className="header__mobile-meta-link"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                Yol tarifi
              </a>
              <a
                className="header__mobile-meta-link"
                href="https://www.instagram.com/tavolinocafe/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
