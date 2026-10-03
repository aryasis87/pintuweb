// /llms.txt — ringkasan situs untuk asisten AI (format llmstxt.org). Semua angka dari packages.ts & site.ts.
// Catatan jujur: Google menyatakan tidak memakai file ini; berkas ini murah dan tidak merugikan.
import { llmsDoc } from '../content/llms'

export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsDoc(false), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
