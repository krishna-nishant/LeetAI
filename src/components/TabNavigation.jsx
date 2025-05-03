import React from "react";

const TabNavigation = ({
  currentTab,
  setCurrentTab,
  handleAIExplain,
  handleYouTubeSearch,
  isLoadingAI,
  isLoadingYT,
}) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          <button
            onClick={() => setCurrentTab("description")}
            className={`px-4 py-3 font-medium text-sm ${
              currentTab === "description"
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Description
          </button>
          <button
            onClick={handleAIExplain}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              currentTab === "aiExplanation"
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <span className="mr-1">🧠</span> AI Explanation
            {isLoadingAI && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></span>
            )}
          </button>
          <button
            onClick={handleYouTubeSearch}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              currentTab === "youtubeVideos"
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <span className="mr-1">📺</span> YouTube Solutions
            {isLoadingYT && (
              <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
