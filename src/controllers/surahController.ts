import { Context } from 'hono'
import { SurahService } from '../services/surahService'
import { createSuccessResponse } from '../utils/helpers'

export class SurahController {
  static async getAllSurahs(c: Context) {
    const surahs = await SurahService.getAllSurahs()
    return c.json(
      createSuccessResponse(surahs, 'Surah list retrieved successfully'),
      { status: 200 }
    )
  }

  static async getSurahDetail(c: Context) {
    const number = c.req.param('number')
    const surahDetail = await SurahService.getSurahDetail(number)
    if (!surahDetail) {
      return c.json(
        { success: false, message: 'Surah not found' },
        { status: 404 }
      )
    }
    return c.json(
      createSuccessResponse(surahDetail, 'Surah detail retrieved successfully'),
      { status: 200 }
    )
  }
}
