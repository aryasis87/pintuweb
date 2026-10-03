import { notFound } from 'next/navigation'

// Path yang tidak dikenal di bawah bahasa mana pun -> halaman 404 berbahasa sesuai URL.
export default function CatchAll() {
  notFound()
}
