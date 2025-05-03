import React from "react";
import Navigation from "./Navigation";

const MaximizedNavigationHeader = ({
  toggleMaximize,
  ...navigationProps
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center">
        <button
          onClick={toggleMaximize}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2 mr-2"
          title="Minimize"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        <div className="flex-1">
          <Navigation mode="tabs" {...navigationProps} />
        </div>
      </div>
    </div>
  );
};

export default MaximizedNavigationHeader;
