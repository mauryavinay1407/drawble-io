import fetch from 'node-fetch';

// Function to recognize image via Google Gemini API
export async function recognizeImageWithGoogleGemini(imageData: string) {
  const GOOGLE_GEMINI_API_URL = 'https://api.google-gemini.com/v1/recognize'; // Example URL
  const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY; // Store API key in .env file

  try {
    const response = await fetch(GOOGLE_GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GOOGLE_GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }), // Send the base64 image
    });

    if (!response.ok) {
      throw new Error(`Error from Google Gemini: ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Assuming the result contains recognition output
  } catch (error) {
    console.error('Error in Google Gemini API call:', error);
    throw error;
  }
}
