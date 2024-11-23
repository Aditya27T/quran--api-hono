import { ApiService } from './apiService';
import type { Surah, Verse, TafsirVerse } from '../types';

export class SurahService {
  static transformSurah(rawData: any): Surah {
    return {
      number: rawData.nomor,
      name: {
        arabic: rawData.nama,
        latin: rawData.namaLatin,
        translation: rawData.arti
      },
      numberOfVerses: rawData.jumlahAyat,
      revelationPlace: rawData.tempatTurun,
      description: rawData.deskripsi,
      audio: {
        primary: rawData.audioFull['05'],
        alternates: {
          abdullah: rawData.audioFull['01'],
          abdulMuhsin: rawData.audioFull['02'],
          sudais: rawData.audioFull['03'],
          dossari: rawData.audioFull['04']
        }
      }
    };
  }

  static transformVerse(rawVerse: any): Verse {
    return {
      number: rawVerse.nomorAyat,
      text: {
        arabic: rawVerse.teksArab,
        latin: rawVerse.teksLatin,
        translation: rawVerse.teksIndonesia
      },
      audio: {
        primary: rawVerse.audio['05'],
        alternates: {
          abdullah: rawVerse.audio['01'],
          abdulMuhsin: rawVerse.audio['02'],
          sudais: rawVerse.audio['03'],
          dossari: rawVerse.audio['04']
        }
      }
    };
  }

  static async getAllSurahs(): Promise<Surah[]> {
    const response = await ApiService.fetch<any>('/surat');
    return response.data.map(this.transformSurah);
  }

  static async getSurahDetail(number: string): Promise<{
    surahInfo: Surah;
    verses: Verse[];
    navigation: any;
  }> {
    const response = await ApiService.fetch<any>(`/surat/${number}`);
    return {
      surahInfo: this.transformSurah(response.data),
      verses: response.data.ayat.map(this.transformVerse),
      navigation: {
        next: response.data.suratSelanjutnya,
        previous: response.data.suratSebelumnya
      }
    };
  }

  static async getTafsir(number: string): Promise<TafsirVerse[]> {
    const response = await ApiService.fetch<any>(`/tafsir/${number}`);
    return response.data.tafsir.map((item: any) => ({
      verseNumber: item.ayat,
      text: item.teks
    }));
  }
}
