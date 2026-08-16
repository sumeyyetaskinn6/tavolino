#!/bin/bash
# Rebuilds public/gallery from the raw screenshots archived in media-source/moments.
# Order of the list below must match the `moments` array in MomentsGallery.tsx.
set -euo pipefail

sources=(
  "18.01.05"
  "18.01.22"
  "18.01.52"
  "18.01.35"
  "18.02.04"
  "18.02.20"
  "18.02.31"
  "18.02.47"
  "23.42.51"
  "23.43.04"
  "23.43.16"
  "23.43.30"
  "23.43.36"
  "23.43.43"
  "23.43.50"
)

mkdir -p public/gallery

index=1
for stamp in "${sources[@]}"; do
  src="media-source/moments/Ekran Resmi 2026-08-15 ${stamp}.png"
  out=$(printf "public/gallery/moment-%02d.jpg" "$index")
  sips -Z 1400 -s format jpeg -s formatOptions 70 "$src" --out "$out" >/dev/null
  index=$((index + 1))
done
