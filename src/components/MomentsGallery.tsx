import './MomentsGallery.css'

type MomentSize = 'standard' | 'tall' | 'wide' | 'feature'

type Moment = {
  src: string
  alt: string
  size: MomentSize
}

const moments: Moment[] = [
  {
    src: '/gallery/moment-01.jpg',
    alt: 'Tavolino mutfağından taze omlet',
    size: 'tall',
  },
  {
    src: '/gallery/moment-02.jpg',
    alt: 'Tavolino’da keyifli bir öğle yemeği',
    size: 'standard',
  },
  {
    src: '/gallery/moment-03.jpg',
    alt: 'Tavolino imza tabağı',
    size: 'standard',
  },
  {
    src: '/gallery/moment-04.jpg',
    alt: 'Paylaşımlı Tavolino kahvaltısı',
    size: 'tall',
  },
  {
    src: '/gallery/moment-05.jpg',
    alt: 'Tavolino’da makarna keyfi',
    size: 'standard',
  },
  {
    src: '/gallery/moment-06.jpg',
    alt: 'Limonlu sıcak içecek',
    size: 'standard',
  },
  {
    src: '/gallery/moment-07.jpg',
    alt: 'Tavolino usulü pizza',
    size: 'feature',
  },
  {
    src: '/gallery/moment-08.jpg',
    alt: 'Yoğurtlu Tavolino tabağı',
    size: 'standard',
  },
  {
    src: '/gallery/moment-09.jpg',
    alt: 'Tavolino fincanlarında kahve',
    size: 'standard',
  },
  {
    src: '/gallery/moment-10.jpg',
    alt: 'Tavolino burger hazırlanırken',
    size: 'tall',
  },
  {
    src: '/gallery/moment-11.jpg',
    alt: 'Kahve ve tatlı servisi',
    size: 'standard',
  },
  {
    src: '/gallery/moment-12.jpg',
    alt: 'Gün ışığında taze salata',
    size: 'standard',
  },
  {
    src: '/gallery/moment-13.jpg',
    alt: 'Taze salatanın son dokunuşu',
    size: 'tall',
  },
  {
    src: '/gallery/moment-14.jpg',
    alt: 'Tavolino soğuk kahvesi',
    size: 'standard',
  },
  {
    src: '/gallery/moment-15.jpg',
    alt: 'Taze otlarla servis edilen soğuk çorba',
    size: 'wide',
  },
]

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
        {moments.map((moment) => (
          <figure
            className={`moments-gallery__item moments-gallery__item--${moment.size}`}
            key={moment.src}
          >
            <img
              src={moment.src}
              alt={moment.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
