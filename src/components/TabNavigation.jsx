"use client";
import { useTheme } from "../context/ThemeContext";
import ToastButton from "./ui/ToastButton";

const TabNavigation = ({
  currentTab,
  setCurrentTab,
  handleAIExplain,
  handleYouTubeSearch,
  isLoadingAI,
  isLoadingYT,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-1 py-1">
          <button
            onClick={() => setCurrentTab("description")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
              currentTab === "description"
                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-b-2 border-green-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
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
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center whitespace-nowrap transition-colors ${
              currentTab === "aiExplanation"
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-b-2 border-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <span className="mr-1.5 text-base">🧠</span>
            <span>AI Explanation</span>
            {isLoadingAI && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></span>
            )}
          </button>

          <button
            onClick={handleYouTubeSearch}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center whitespace-nowrap transition-colors ${
              currentTab === "youtubeVideos"
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-b-2 border-red-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750"
            }`}
          >
            <span className="mr-1.5 text-base">📺</span>
            <span>YouTube Solutions</span>
            {isLoadingYT && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></span>
            )}
          </button>

          <ToastButton
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750`}
            message="Solutions feature coming soon!"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
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
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-750`}
            message="Discussion feature coming soon!"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
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
              Discussion
            </div>
          </ToastButton>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
