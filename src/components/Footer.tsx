import './Footer.css'

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=23+Nisan%2C+Mithatpa%C5%9Fa+Cd.+17-A%2C+16130+Nil%C3%BCfer%2FBursa'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand-block">
          <img
            src="/brand/tavolino-white.png"
            alt="Tavolino"
            className="footer__logo"
          />
          <p className="footer__tagline">
            Coffee & Kitchen Works — Nilüfer, Bursa.
          </p>
        </div>

        <div className="footer__meta">
          <a className="footer__action" href="tel:+902249995056">
            Ara
          </a>
          <a
            className="footer__action"
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Yol tarifi
          </a>
          <a
            className="footer__action"
            href="https://www.instagram.com/tavolinocafe/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© {new Date().getFullYear()} Tavolino</p>
        <p className="footer__copy">Mithatpaşa Cd. 17-A, Nilüfer</p>
      </div>
    </footer>
  )
}
