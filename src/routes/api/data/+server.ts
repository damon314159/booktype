import { json, type RequestHandler } from '@sveltejs/kit'

import english from './english.json'

const GET: RequestHandler = ({ url }: { url: URL }): Response => {
  const limit = Number(url.searchParams.get('limit'))
  const words = english.words.slice(0, limit).sort(() => 0.5 - Math.random())
  return json(words)
}

export default GET
