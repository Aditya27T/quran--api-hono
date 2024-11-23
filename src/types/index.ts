export interface Surah {
    number: number;
    name: {
      arabic: string;
      latin: string;
      translation: string;
    };
    numberOfVerses: number;
    revelationPlace: string;
    description: string;
    audio: {
      primary: string;
      alternates: Record<string, string>;
    };
  }
  
  export interface Verse {
    number: number;
    text: {
      arabic: string;
      latin: string;
      translation: string;
    };
    audio: {
      primary: string;
      alternates: Record<string, string>;
    };
  }
  
  export interface TafsirVerse {
    verseNumber: number;
    text: string;
  }