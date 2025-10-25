
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function fetchPlaceDescription(placeName: string): Promise<string> {
  try {
    const prompt = `Agis comme un guide touristique passionné. Décris le lieu suivant en Guyane française : "${placeName}". Rédige une description détaillée, engageante et informative pour un touriste. Mets en avant les points d'intérêt principaux, l'histoire fascinante et les activités incontournables. Le texte doit être exclusivement en français et formaté en Markdown pour une excellente lisibilité (utilise des titres avec #, des listes à puces avec *, et des sauts de ligne pour aérer le texte).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching description from Gemini API:", error);
    throw new Error("Impossible de récupérer la description depuis le service. Veuillez réessayer plus tard.");
  }
}
