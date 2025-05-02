// Check if API keys are set
export const isGeminiApiKeySet = () => {
    return !!import.meta.env.VITE_GEMINI_API_KEY;
};

export const isYoutubeApiKeySet = () => {
    return !!import.meta.env.VITE_YOUTUBE_API_KEY;
};

export const getGeminiApiKey = () => {
    return import.meta.env.VITE_GEMINI_API_KEY || 'API_KEY_MISSING';
};

export const getYoutubeApiKey = () => {
    return import.meta.env.VITE_YOUTUBE_API_KEY || 'API_KEY_MISSING';
};

export const geminiApiKeyInstructions = `AI explanation feature unavailable. Set up your API key in settings.`;

export const youtubeApiKeyInstructions = `YouTube solutions feature unavailable. Set up your API key in settings.`; 