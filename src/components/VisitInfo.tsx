import './VisitInfo.css'

const amenities = [
  'Açık hava bölümü',
  'Çocuk menüsü',
  'Köpeklerin içeri girmesine izin veriliyor',
  'Yemek kartları geçerlidir',
]

const hours = [
  { day: 'Pazar', time: '08:00–01:00' },
  { day: 'Pazartesi', time: '08:00–01:00' },
  { day: 'Salı', time: '08:00–01:00' },
  { day: 'Çarşamba', time: '08:00–01:00' },
  { day: 'Perşembe', time: '08:00–01:00' },
  { day: 'Cuma', time: '08:00–01:00' },
  { day: 'Cumartesi', time: '08:00–01:00' },
]

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=23+Nisan%2C+Mithatpa%C5%9Fa+Cd.+17-A%2C+16130+Nil%C3%BCfer%2FBursa'

export function VisitInfo() {
  return (
    <section className="visit-info" id="contact" aria-labelledby="visit-title">
      <div className="visit-info__inner">
        <div className="visit-info__intro">
          <p className="visit-info__eyebrow">Ziyaret</p>
          <h2 className="visit-info__title" id="visit-title">
            Sizi masamızda
            <br />
            bekliyoruz.
          </h2>
          <p className="visit-info__lead">
            Nilüfer&apos;de, Mithatpaşa Caddesi&apos;nde — açık havada,
            çocuklarla ve dostlarınızla.
          </p>
        </div>

        <div className="visit-info__grid">
          <div className="visit-info__block">
            <p className="visit-info__label">Hizmet seçenekleri</p>
            <ul className="visit-info__amenities">
              {amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="visit-info__block">
            <p className="visit-info__label">Adres</p>
            <p className="visit-info__text">
              23 Nisan, Mithatpaşa Cd. 17-A
              <br />
              16130 Nilüfer / Bursa
            </p>
            <a
              className="visit-info__link"
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Haritada aç
            </a>
          </div>

          <div className="visit-info__block">
            <p className="visit-info__label">Telefon</p>
            <a className="visit-info__phone" href="tel:+902249995056">
              (0224) 999 50 56
            </a>
          </div>

          <div className="visit-info__block visit-info__block--hours">
            <p className="visit-info__label">Çalışma saatleri</p>
            <p className="visit-info__hours-note">Her gün 08:00 – 01:00</p>
            <ul className="visit-info__hours">
              {hours.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
