import { Context } from 'hono'
import { SurahService } from '../services/surahService'
import { createSuccessResponse } from '../utils/helpers'

export class TafsirController {
  static async getTafsir(c: Context) {
    const number = c.req.param('number')
    const tafsir = await SurahService.getTafsir(number)
    if (!tafsir) {
      return c.json(
        { success: false, message: 'Tafsir not found' },
        { status: 404 }
      )
    }
    return c.json(
      createSuccessResponse(tafsir, 'Tafsir retrieved successfully'),
      { status: 200 }
    )
  }
}