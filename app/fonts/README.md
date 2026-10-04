# Font yang dihost sendiri

Semua font di folder ini (dan di `app/api/og/fonts`) berlisensi SIL Open Font License 1.1. Font diambil dari Google Fonts.

| Berkas | Keluarga | Sumber |
|---|---|---|
| `newsreader-500-opsz.woff2`, `newsreader-500-italic.woff2` | Newsreader (Production Type) | https://fonts.google.com/specimen/Newsreader |
| `../api/og/fonts/SchibstedGrotesk-*.ttf` | Schibsted Grotesk | https://fonts.google.com/specimen/Schibsted+Grotesk |
| `../api/og/fonts/IBMPlexMono-*.ttf` | IBM Plex Mono | https://fonts.google.com/specimen/IBM+Plex+Mono |

Teks lisensi: https://openfontlicense.org/open-font-license-official-text/

Newsreader dihost sendiri karena `next/font/google` tidak bisa memuat berat tetap (500) sekaligus sumbu optical size. Schibsted Grotesk dan IBM Plex Mono dimuat lewat `next/font/google` di `app/[lang]/layout.tsx`.
