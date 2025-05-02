import { isYoutubeApiKeySet, youtubeApiKeyInstructions } from "../utils/config";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const getYouTubeVideos = async (problem, filters = {}) => {
  try {
    if (!isYoutubeApiKeySet()) {
      console.error("YouTube API key is missing");
      return [];
    }

    let searchQuery = `LeetCode ${problem.title} solution`;
    
    if (filters.language && filters.language.trim() !== '') {
      searchQuery += ` ${filters.language}`;
    }
    
    if (filters.tutor && filters.tutor.trim() !== '') {
      searchQuery += ` ${filters.tutor}`;
    }
    
    const url = new URL(`${BASE_URL}/search`);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('maxResults', '10');
    url.searchParams.append('q', searchQuery);
    url.searchParams.append('type', 'video');
    url.searchParams.append('videoDefinition', 'high');
    url.searchParams.append('key', API_KEY);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube API error:', errorData);
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
    
    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}; 