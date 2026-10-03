// /llms-full.txt — versi lengkap: ringkasan + seluruh FAQ + ringkasan tiap artikel.
import { llmsDoc } from '../content/llms'

export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsDoc(true), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
