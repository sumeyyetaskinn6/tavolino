import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import './Reservation.css'

const WHATSAPP_NUMBER = '902249995056'

type ReservationFields = {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  note: string
}

const initialFields: ReservationFields = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  note: '',
}

function formatDate(value: string) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}`
}

export function Reservation() {
  const [fields, setFields] = useState<ReservationFields>(initialFields)
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const updateField =
    (key: keyof ReservationFields) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFields((current) => ({ ...current, [key]: event.target.value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = [
      'Merhaba Tavolino,',
      'Randevu talebi oluşturmak istiyorum.',
      '',
      `Ad Soyad: ${fields.name.trim()}`,
      `Telefon: ${fields.phone.trim()}`,
      `Tarih: ${formatDate(fields.date)}`,
      `Saat: ${fields.time}`,
      `Kişi sayısı: ${fields.guests}`,
      fields.note.trim() ? `Not: ${fields.note.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      className="reservation"
      id="reservation"
      aria-labelledby="reservation-title"
    >
      <div className="reservation__inner">
        <div className="reservation__intro">
          <p className="reservation__eyebrow">Rezervasyon</p>
          <h2 className="reservation__title" id="reservation-title">
            Randevu
            <br />
            oluşturun.
          </h2>
          <p className="reservation__lead">
            Bilgilerinizi bırakın; WhatsApp üzerinden talebinizi anında
            iletelim.
          </p>
          <figure className="reservation__visual">
            <picture>
              <source
                srcSet="/brand/reservation-table.avif"
                type="image/avif"
              />
              <source
                srcSet="/brand/reservation-table.webp"
                type="image/webp"
              />
              <img
                src="/brand/reservation-table.jpg"
                alt="Tavolino masası — Bu masada güzel şeyler olur"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
        </div>

        <form className="reservation__form" onSubmit={handleSubmit}>
          <div className="reservation__field">
            <label htmlFor="reservation-name">Ad Soyad</label>
            <input
              id="reservation-name"
              name="name"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              required
              placeholder="Adınız ve soyadınız"
              value={fields.name}
              onChange={updateField('name')}
            />
          </div>

          <div className="reservation__field">
            <label htmlFor="reservation-phone">Telefon</label>
            <input
              id="reservation-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              enterKeyHint="next"
              required
              placeholder="05xx xxx xx xx"
              value={fields.phone}
              onChange={updateField('phone')}
            />
          </div>

          <div className="reservation__row">
            <div className="reservation__field">
              <label htmlFor="reservation-date">Tarih</label>
              <input
                id="reservation-date"
                name="date"
                type="date"
                required
                min={today}
                value={fields.date}
                onChange={updateField('date')}
              />
            </div>

            <div className="reservation__field">
              <label htmlFor="reservation-time">Saat</label>
              <input
                id="reservation-time"
                name="time"
                type="time"
                required
                value={fields.time}
                onChange={updateField('time')}
              />
            </div>
          </div>

          <div className="reservation__field">
            <label htmlFor="reservation-guests">Kişi sayısı</label>
            <select
              id="reservation-guests"
              name="guests"
              required
              value={fields.guests}
              onChange={updateField('guests')}
            >
              {Array.from({ length: 12 }, (_, index) => {
                const value = String(index + 1)
                return (
                  <option key={value} value={value}>
                    {value} kişi
                  </option>
                )
              })}
            </select>
          </div>

          <div className="reservation__field">
            <label htmlFor="reservation-note">Not (isteğe bağlı)</label>
            <textarea
              id="reservation-note"
              name="note"
              rows={3}
              enterKeyHint="done"
              placeholder="Özel isteğiniz varsa yazabilirsiniz"
              value={fields.note}
              onChange={updateField('note')}
            />
          </div>

          <button className="reservation__submit" type="submit">
            Randevu Oluştur
          </button>

          <p className="reservation__hint">
            Butona tıkladığınızda WhatsApp açılır ve mesajınız hazır gelir.
          </p>
        </form>
      </div>
    </section>
  )
}
