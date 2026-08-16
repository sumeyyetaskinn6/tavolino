import './MomentsGallery.css'

type MomentSize = 'standard' | 'tall' | 'wide' | 'feature'

type Moment = {
  id: string
  alt: string
  size: MomentSize
}

const moments: Moment[] = [
  {
    id: 'moment-01',
    alt: 'Tavolino mutfağından taze omlet',
    size: 'tall',
  },
  {
    id: 'moment-02',
    alt: 'Tavolino’da keyifli bir öğle yemeği',
    size: 'standard',
  },
  {
    id: 'moment-03',
    alt: 'Tavolino imza tabağı',
    size: 'standard',
  },
  {
    id: 'moment-04',
    alt: 'Paylaşımlı Tavolino kahvaltısı',
    size: 'tall',
  },
  {
    id: 'moment-05',
    alt: 'Tavolino’da makarna keyfi',
    size: 'standard',
  },
  {
    id: 'moment-06',
    alt: 'Limonlu sıcak içecek',
    size: 'standard',
  },
  {
    id: 'moment-07',
    alt: 'Tavolino usulü pizza',
    size: 'feature',
  },
  {
    id: 'moment-08',
    alt: 'Yoğurtlu Tavolino tabağı',
    size: 'standard',
  },
  {
    id: 'moment-09',
    alt: 'Tavolino fincanlarında kahve',
    size: 'standard',
  },
  {
    id: 'moment-10',
    alt: 'Tavolino burger hazırlanırken',
    size: 'tall',
  },
  {
    id: 'moment-11',
    alt: 'Kahve ve tatlı servisi',
    size: 'standard',
  },
  {
    id: 'moment-12',
    alt: 'Gün ışığında taze salata',
    size: 'standard',
  },
  {
    id: 'moment-13',
    alt: 'Taze salatanın son dokunuşu',
    size: 'tall',
  },
  {
    id: 'moment-14',
    alt: 'Tavolino soğuk kahvesi',
    size: 'standard',
  },
  {
    id: 'moment-15',
    alt: 'Taze otlarla servis edilen soğuk çorba',
    size: 'wide',
  },
]

const sizesByLayout: Record<MomentSize, string> = {
  standard: '(max-width: 759px) 48vw, (max-width: 1120px) 30vw, 340px',
  tall: '(max-width: 759px) 48vw, (max-width: 1120px) 30vw, 340px',
  wide: '(max-width: 759px) 94vw, (max-width: 1120px) 90vw, 1120px',
  feature: '(max-width: 759px) 94vw, (max-width: 1120px) 90vw, 1120px',
}

function momentSources(id: string, ext: 'avif' | 'webp' | 'jpg') {
  return `/gallery/${id}-800.${ext} 800w, /gallery/${id}-1200.${ext} 1200w`
}

export function MomentsGallery() {
  return (
    <section
      className="moments-gallery"
      id="story"
      aria-labelledby="moments-title"
    >
      <div className="moments-gallery__intro">
        <p className="moments-gallery__eyebrow">Bir masa, birçok an</p>
        <div className="moments-gallery__intro-copy">
          <h2 className="moments-gallery__title" id="moments-title">
            Tavolino’da hayat
            <br />
            sofranın etrafında.
          </h2>
          <p className="moments-gallery__description">
            Uzun kahvaltılar, kısa kahve molaları ve paylaşılan tabaklar. Günün
            ritmi değişse de iyi bir masanın hissi hep aynı kalır.
          </p>
        </div>
      </div>

      <div className="moments-gallery__grid">
        {moments.map((moment) => {
          const sizes = sizesByLayout[moment.size]

          return (
            <figure
              className={`moments-gallery__item moments-gallery__item--${moment.size}`}
              key={moment.id}
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet={momentSources(moment.id, 'avif')}
                  sizes={sizes}
                />
                <source
                  type="image/webp"
                  srcSet={momentSources(moment.id, 'webp')}
                  sizes={sizes}
                />
                <img
                  src={`/gallery/${moment.id}-800.jpg`}
                  srcSet={momentSources(moment.id, 'jpg')}
                  sizes={sizes}
                  alt={moment.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
