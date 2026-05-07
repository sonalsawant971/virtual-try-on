const APP_ID = import.meta.env.VITE_APP_ID;
const API_URL = 'https://api-integrations.appmedo.com/app-7xi695mybpj5/api-Xa6JZ58oPMEa/v1beta/models/gemini-3-pro-image-preview:generateContent';

interface TryOnRequest {
  userImageBase64: string;
  productImageBase64: string;
  prompt: string;
}

interface TryOnResponse {
  status: number;
  msg: string;
  candidates?: Array<{
    content: {
      role: string;
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    safetyRatings: unknown[];
  }>;
}

export async function generateVirtualTryOn(request: TryOnRequest): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': APP_ID,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: request.userImageBase64,
                },
              },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: request.productImageBase64,
                },
              },
              {
                text: request.prompt,
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(300000),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: TryOnResponse = await response.json();

    if (data.status !== 0) {
      if (data.status === 999) {
        throw new Error(data.msg);
      }
      throw new Error(`API error: ${data.msg}`);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No result generated');
    }

    const resultText = data.candidates[0].content.parts[0].text;
    const imageMatch = resultText.match(/!\[image\]\((data:image\/[^)]+)\)/);

    if (!imageMatch) {
      throw new Error('No image found in response');
    }

    return imageMatch[1];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate virtual try-on');
  }
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function urlToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const base64 = dataURL.split(',')[1];
      resolve(base64);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}
