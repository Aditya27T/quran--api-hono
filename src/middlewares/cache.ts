import { Context, Next } from 'hono'
import { CACHE_DURATION } from '../utils/constants'

export async function cacheMiddleware(c: Context, next: Next) {
  // Set cache headers
  c.header('Cache-Control', `public, max-age=${CACHE_DURATION}`)
  c.header('Vary', 'Accept-Encoding')
  
  // Set ETag based on URL
  const etag = `"${Buffer.from(c.req.url).toString('base64')}"`;
  c.header('ETag', etag)
  
  // Check if client has valid cache
  const ifNoneMatch = c.req.header('If-None-Match')
  if (ifNoneMatch === etag) {
    return new Response(null, { status: 304 })
  }
  
  await next()
}