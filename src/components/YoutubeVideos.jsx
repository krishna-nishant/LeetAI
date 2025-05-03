"use client";
import { useTheme } from "../context/ThemeContext";
import React, { useState } from "react";

const VideoPopup = ({ video, onClose }) => {
  if (!video) return null;

  const videoId = video.id;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold z-10"
        >
          ×
        </button>
        <div className="p-1 pb-0">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-t-lg">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="absolute top-0 left-0 w-full h-full"
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">{video.title}</h3>
          <p className="text-sm text-gray-600">{video.channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

const YoutubeVideos = ({
  youtubeVideos,
  tutorFilter,
  setTutorFilter,
  languageFilter,
  setLanguageFilter,
  isLoadingYT,
  isSearchingYT,
  handleYoutubeFiltersSubmit,
}) => {
  const { isDarkMode } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
          Find YouTube Solutions
        </h3>
        <form onSubmit={handleYoutubeFiltersSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Tutor/Channel
              </label>
              <input
                type="text"
                placeholder="e.g., NeetCode, Tech Interview Pro"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={tutorFilter}
                onChange={(e) => setTutorFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Programming Language
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <option value="">Any Language</option>
                <option value="c++">C++</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSearchingYT}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isSearchingYT ? "Searching..." : "Search YouTube"}
          </button>
        </form>
      </div>

      {isLoadingYT && youtubeVideos.length === 0 ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : youtubeVideos.length > 0 ? (
        <div className="space-y-4">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-40 sm:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="p-4 sm:w-2/3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {video.channelTitle}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">
                      •
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {video.viewCount ? `${video.viewCount} views` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700 dark:text-gray-300">
            {isSearchingYT
              ? "Searching for videos..."
              : tutorFilter || languageFilter !== "c++"
              ? "No videos found matching your search criteria. Try adjusting your filters."
              : "Search for YouTube tutorials using the filters above."}
          </p>
        </div>
      )}

      {selectedVideo && (
        <VideoPopup
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default YoutubeVideos;
