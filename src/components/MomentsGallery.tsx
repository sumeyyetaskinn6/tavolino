import './MomentsGallery.css'

type MomentSize = 'standard' | 'tall' | 'wide' | 'feature'

type Moment = {
  id: string
  alt: string
  caption: string
  size: MomentSize
}

const moments: Moment[] = [
  {
    id: 'moment-01',
    alt: 'Tavolino mutfağından taze omlet',
    caption: 'Taze otlarla süslenmiş sıcak omlet.',
    size: 'tall',
  },
  {
    id: 'moment-02',
    alt: 'Tavolino’da paylaşılan bir öğle yemeği',
    caption: 'Güneşli bir öğle, paylaşılmış tabaklar.',
    size: 'standard',
  },
  {
    id: 'moment-03',
    alt: 'Yoğurtlu et ve çıtır patates tabağı',
    caption: 'Yoğurt, et ve çıtır patates.',
    size: 'standard',
  },
  {
    id: 'moment-04',
    alt: 'Paylaşımlı Tavolino kahvaltısı',
    caption: 'Uzun, paylaşılmış bir kahvaltı.',
    size: 'tall',
  },
  {
    id: 'moment-05',
    alt: 'Şinitzel, patates ve taze salata',
    caption: 'Çıtır şinitzel, taze salata.',
    size: 'standard',
  },
  {
    id: 'moment-06',
    alt: 'Kremalı makarna tabağı',
    caption: 'Kremalı makarna, sakin bir lokma.',
    size: 'standard',
  },
  {
    id: 'moment-07',
    alt: 'Limon dilimli sıcak içecek',
    caption: 'Limonlu, sıcak bir mola.',
    size: 'feature',
  },
  {
    id: 'moment-08',
    alt: 'Tavolino usulü peynirli pizza',
    caption: 'Taze çıkan peynirli pizza.',
    size: 'standard',
  },
  {
    id: 'moment-09',
    alt: 'Tavolino fincanlarında kahve',
    caption: 'Tavolino fincanında taze kahve.',
    size: 'standard',
  },
  {
    id: 'moment-10',
    alt: 'Erimiş peynir dökülen burger',
    caption: 'Erimiş peynir, sıcak burger.',
    size: 'tall',
  },
  {
    id: 'moment-11',
    alt: 'Latte ve San Sebastian cheesecake',
    caption: 'Latte ve San Sebastian.',
    size: 'standard',
  },
  {
    id: 'moment-12',
    alt: 'Enginarlı taze salata',
    caption: 'Enginar ve taze yeşillik.',
    size: 'standard',
  },
  {
    id: 'moment-13',
    alt: 'Zeytinyağı dökülen taze salata',
    caption: 'Zeytinyağının son dokunuşu.',
    size: 'tall',
  },
  {
    id: 'moment-14',
    alt: 'Katmanlı soğuk kahve',
    caption: 'Katmanlı, ferah bir soğuk kahve.',
    size: 'standard',
  },
  {
    id: 'moment-16',
    alt: 'Kabak ve kuru domatesli taze salata',
    caption: 'Kabak ve kuru domatesli salata.',
    size: 'standard',
  },
  {
    id: 'moment-15',
    alt: 'Nane ve zeytinyağlı cacık',
    caption: 'Nane ve zeytinyağlı cacık.',
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
              <div className="moments-gallery__media">
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
              </div>
              <figcaption className="moments-gallery__caption">
                {moment.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
