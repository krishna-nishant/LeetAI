"use client";
import { useTheme } from "../context/ThemeContext";
import ToastButton from "./ui/ToastButton";

const Navigation = ({
  currentTab,
  setCurrentTab,
  handleAIExplain,
  handleYouTubeSearch,
  isLoadingAI,
  isLoadingYT,
  toggleMaximize,
  mode = "sidebar", // 'sidebar' or 'tabs'
}) => {
  const { isDarkMode } = useTheme();

  // Sidebar mode (desktop)
  if (mode === "sidebar") {
    return (
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-64px)] shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-medium text-gray-900 dark:text-white">
            Navigation
          </h2>
          {toggleMaximize && (
            <button
              onClick={toggleMaximize}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Maximize"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-col py-2">
          <button
            onClick={() => setCurrentTab("description")}
            className={`px-4 py-3 text-left flex items-center space-x-3 ${
              currentTab === "description"
                ? "bg-[#2cbb5d]/10 text-[#2cbb5d] border-l-4 border-[#2cbb5d]"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Description</span>
          </button>

          <button
            onClick={handleAIExplain}
            className={`px-4 py-3 text-left flex items-center space-x-3 ${
              currentTab === "aiExplanation"
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-l-4 border-purple-500"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            }`}
          >
            <span className="text-xl">🧠</span>
            <span>AI Explanation</span>
            {isLoadingAI && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></span>
            )}
          </button>

          <button
            onClick={handleYouTubeSearch}
            className={`px-4 py-3 text-left flex items-center space-x-3 ${
              currentTab === "youtubeVideos"
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-500"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            }`}
          >
            <span className="text-xl">📺</span>
            <span>YouTube Solutions</span>
            {isLoadingYT && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></span>
            )}
          </button>

          <ToastButton
            className="px-4 py-3 text-left flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            message="Solutions feature coming soon!"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span>Solutions</span>
          </ToastButton>

          <ToastButton
            className="px-4 py-3 text-left flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            message="Discussion feature coming soon!"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>Discussion</span>
          </ToastButton>
        </div>
      </div>
    );
  }

  // Tab mode (mobile)
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap gap-0.5 py-1">
          <button
            onClick={() => setCurrentTab("description")}
            className={`px-3 py-2 rounded-t-lg font-medium text-xs whitespace-nowrap transition-colors ${
              currentTab === "description"
                ? "bg-[#2cbb5d]/10 text-[#2cbb5d] border-b-2 border-[#2cbb5d]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Description
            </div>
          </button>

          <button
            onClick={handleAIExplain}
            className={`px-3 py-2 rounded-t-lg font-medium text-xs flex items-center whitespace-nowrap transition-colors ${
              currentTab === "aiExplanation"
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-b-2 border-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <span className="mr-1 text-sm">🧠</span>
            <span>AI Explanation</span>
            {isLoadingAI && (
              <span className="ml-1 inline-block h-3 w-3 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></span>
            )}
          </button>

          <button
            onClick={handleYouTubeSearch}
            className={`px-3 py-2 rounded-t-lg font-medium text-xs flex items-center whitespace-nowrap transition-colors ${
              currentTab === "youtubeVideos"
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-b-2 border-red-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <span className="mr-1 text-sm">📺</span>
            <span>YouTube</span>
            {isLoadingYT && (
              <span className="ml-1 inline-block h-3 w-3 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></span>
            )}
          </button>

          <ToastButton
            className={`px-3 py-2 rounded-t-lg font-medium text-xs whitespace-nowrap transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750`}
            message="Solutions feature coming soon!"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Solutions
            </div>
          </ToastButton>

          <ToastButton
            className={`px-3 py-2 rounded-t-lg font-medium text-xs whitespace-nowrap transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750`}
            message="Discussion feature coming soon!"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Discuss
            </div>
          </ToastButton>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
