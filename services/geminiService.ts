
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, StyleGuide, Language } from "../types";

// Helper to get AI instance safely
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePersonalizedGuide(prefs: UserPreferences, lang: Language = 'en'): Promise<StyleGuide> {
  const ai = getAI();
  const languageInstructions = {
    en: "The guide should be sophisticated and professional in English.",
    tr: "Rehber tamamen Türkçe dilinde, sofistike ve profesyonel bir üslupla yazılmalıdır.",
    it: "La guida deve essere scritta interamente in lingua italiana, con uno stile sofisticato e professionale."
  };

  const prompt = `
    As a world-class Milanese Fashion Consultant and Stylist, create a personalized "Milan Style Guide" for a client with the following preferences:
    - Target Gender/Identity: ${prefs.gender}
    - Style Vibe: ${prefs.vibe}
    - Budget Level: ${prefs.budget}
    - Main Occasion/Reason for Milan visit: ${prefs.occasion}
    
    ${languageInstructions[lang]}
    Reflect the "Milano Lifestyle". 
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          mustVisitStores: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestedOutfits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "summary", "recommendations", "mustVisitStores", "suggestedOutfits"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function getQuickFashionTip(query: string, lang: Language = 'en'): Promise<string> {
  const ai = getAI();
  const instructions = {
    en: "Answer the following question briefly and chicly in English:",
    tr: "Aşağıdaki soruyu kısa, şık ve samimi bir şekilde Türkçe cevapla:",
    it: "Rispondi alla seguente domanda in modo breve ed elegante in lingua italiana:"
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${instructions[lang]} ${query}`,
    config: {
      systemInstruction: `You are a Milan-based fashion influencer. You are chic, helpful, and an expert in Milanese lifestyle. You speak ${lang === 'tr' ? 'Turkish' : lang === 'it' ? 'Italian' : 'English'}.`
    }
  });
  return response.text || '';
}

export async function generateConfirmationEmail(details: { service: string, date: string, email: string }, lang: Language = 'en'): Promise<string> {
  const ai = getAI();
  const instructions = {
    en: "Write a high-end boutique confirmation email in English.",
    tr: "Üst segment butik tarzında profesyonel bir onay e-postasını Türkçe dilinde yaz.",
    it: "Scrivi un'e-mail di conferma professionale in stile boutique di lusso in lingua italiana."
  };

  const prompt = `
    ${instructions[lang]}
    Details:
    - Service: ${details.service}
    - Date: ${details.date}
    - Client Email: ${details.email}
    
    The tone should be professional and exciting. 
    Mention that "I'm already preparing a curated itinerary for our day in Milan."
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a luxury fashion consultant in Milan."
    }
  });

  return response.text || '';
}
