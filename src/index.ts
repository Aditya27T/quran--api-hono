import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { errorHandler } from './middlewares/errorHandler'
import { cacheMiddleware } from './middlewares/cache'
import surahRoutes from './routes/surahRoutes'
import tafsirRoutes from './routes/tafsirRoutes'

const app = new Hono()

// Global middlewares
app.use('*', cors())
app.use('*', logger())
app.use('*', errorHandler)
app.use('*', cacheMiddleware)

// Routes
app.route('/surahs', surahRoutes)
app.route('/tafsir', tafsirRoutes)

// Root endpoint
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Welcome to Quran API',
    endpoints: {
      getAllSurah: '/surahs',
      getSurahDetail: '/surahs/:number',
      getTafsir: '/tafsir/:number'
    }
  })
})

// Not Found handler
app.notFound((c) => {
    return c.json(
      {
        success: false,
        error: {
          status: 404,
          message: 'Endpoint tidak ditemukan'
        }
      },
      { status: 404 }
    )
})

// Start the server
serve(app)
console.log('Server started at http://localhost:3000')

export default app