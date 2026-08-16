import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()

async function convertRaster(input, outputs) {
  const meta = await sharp(input).rotate().metadata()

  for (const output of outputs) {
    let pipeline = sharp(input).rotate()

    if (output.width && meta.width && meta.width > output.width) {
      pipeline = pipeline.resize({
        width: output.width,
        withoutEnlargement: true,
      })
    }

    if (output.format === 'webp') {
      pipeline = pipeline.webp({
        quality: output.quality ?? 72,
        effort: 6,
        alphaQuality: 80,
      })
    } else if (output.format === 'avif') {
      pipeline = pipeline.avif({
        quality: output.quality ?? 55,
        effort: 6,
      })
    } else if (output.format === 'jpeg') {
      pipeline = pipeline.jpeg({
        quality: output.quality ?? 78,
        mozjpeg: true,
      })
    }

    await pipeline.toFile(output.path)
  }
}

async function convertGallery() {
  const sourceDir = path.join(root, 'media-source/gallery-originals')
  const outDir = path.join(root, 'public/gallery')
  await fs.mkdir(outDir, { recursive: true })

  const files = (await fs.readdir(sourceDir))
    .filter((file) => file.endsWith('.jpg'))
    .sort()

  for (const file of files) {
    const base = file.replace(/\.jpg$/i, '')
    const input = path.join(sourceDir, file)

    await convertRaster(input, [
      {
        path: path.join(outDir, `${base}-800.avif`),
        format: 'avif',
        width: 800,
        quality: 50,
      },
      {
        path: path.join(outDir, `${base}-1200.avif`),
        format: 'avif',
        width: 1200,
        quality: 52,
      },
      {
        path: path.join(outDir, `${base}-800.webp`),
        format: 'webp',
        width: 800,
        quality: 70,
      },
      {
        path: path.join(outDir, `${base}-1200.webp`),
        format: 'webp',
        width: 1200,
        quality: 72,
      },
      {
        path: path.join(outDir, `${base}-800.jpg`),
        format: 'jpeg',
        width: 800,
        quality: 76,
      },
      {
        path: path.join(outDir, `${base}-1200.jpg`),
        format: 'jpeg',
        width: 1200,
        quality: 78,
      },
    ])

    console.log(`gallery ${base}`)
  }
}

async function convertPosters() {
  const dir = path.join(root, 'public/videos/posters')
  const files = (await fs.readdir(dir)).filter(
    (file) => file.endsWith('.jpg') && !file.includes('-'),
  )

  for (const file of files) {
    const base = file.replace(/\.jpg$/i, '')
    const input = path.join(dir, file)

    await convertRaster(input, [
      {
        path: path.join(dir, `${base}.webp`),
        format: 'webp',
        width: 900,
        quality: 68,
      },
      {
        path: path.join(dir, `${base}.avif`),
        format: 'avif',
        width: 900,
        quality: 48,
      },
    ])

    console.log(`poster ${base}`)
  }
}

async function convertBrand() {
  const dir = path.join(root, 'public/brand')

  await convertRaster(path.join(dir, 'reservation-table.png'), [
    {
      path: path.join(dir, 'reservation-table.avif'),
      format: 'avif',
      width: 1200,
      quality: 50,
    },
    {
      path: path.join(dir, 'reservation-table.webp'),
      format: 'webp',
      width: 1200,
      quality: 72,
    },
    {
      path: path.join(dir, 'reservation-table.jpg'),
      format: 'jpeg',
      width: 1200,
      quality: 78,
    },
  ])

  for (const logo of ['tavolino-white.png', 'tavolino-black.png']) {
    const base = logo.replace(/\.png$/i, '')
    await convertRaster(path.join(dir, logo), [
      {
        path: path.join(dir, `${base}.webp`),
        format: 'webp',
        quality: 82,
      },
    ])
  }

  console.log('brand assets')
}

await convertGallery()
await convertPosters()
await convertBrand()
console.log('done')
