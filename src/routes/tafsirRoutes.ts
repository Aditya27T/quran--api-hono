import { Hono } from 'hono';
import { SurahController } from '../controllers/surahController';

const surahRoutes = new Hono();

surahRoutes.get('/', SurahController.getAllSurahs);
surahRoutes.get('/:number', SurahController.getSurahDetail);

export default surahRoutes;