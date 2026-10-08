import './LocationMap.css'

const mapsDirectionsUrl =
  'https://www.google.com/maps?rlz=1C5GCEM_enTR1177TR1179&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&geocode=KYFNDOJXEcoUMeaQwULnJFgp&daddr=23+Nisan,+Mithatpa%C5%9Fa+Cd.+17-A,+16130+Ni%CC%87l%C3%BCfer/Bursa'

const mapsEmbedUrl =
  'https://maps.google.com/maps?q=23+Nisan,+Mithatpa%C5%9Fa+Cd.+17-A,+16130+Nil%C3%BCfer/Bursa&hl=tr&z=16&output=embed'

export function LocationMap() {
  return (
    <section className="location-map" aria-labelledby="location-map-title">
      <div className="location-map__inner">
        <div className="location-map__copy">
          <p className="location-map__eyebrow">Konum</p>
          <h2 className="location-map__title" id="location-map-title">
            Bizi haritada
            <br />
            bulun.
          </h2>
          <p className="location-map__address">
            23 Nisan Mahallesi, 
            <br />
            16130 Nilüfer / Bursa
          </p>
          <a
            className="location-map__cta"
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Yol tarifi al
          </a>
        </div>

        <div className="location-map__frame-wrap">
          <iframe
            className="location-map__frame"
            src={mapsEmbedUrl}
            title="Tavolino konumu — Google Haritalar"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
