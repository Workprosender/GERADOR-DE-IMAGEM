import { GoogleGenAI } from "@google/genai";
import { ImageFile, ImageData, ImageModel } from '../types';

const getApiKey = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
}

export const generateOrEditImage = async (prompt: string, image: ImageFile | null | undefined, model: ImageModel): Promise<ImageData> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const parts: any[] = [{ text: prompt }];

  if (image) {
    parts.unshift({
      inlineData: {
        data: image.base64,
        mimeType: image.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return {
        base64: part.inlineData.data,
        mimeType: part.inlineData.mimeType,
      };
    }
  }

  throw new Error("No image data found in the API response.");
};
