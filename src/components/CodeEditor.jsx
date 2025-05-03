"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { useTheme } from "../context/ThemeContext";
import ToastButton from "./ui/ToastButton";

const CodeEditor = ({ code, setCode }) => {
  const { isDarkMode } = useTheme();
  const [language, setLanguage] = useState("C++");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "C++":
        return cpp();
      case "JavaScript":
        return javascript();
      default:
        return cpp();
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <select
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm rounded-md px-3 py-1.5 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2cbb5d]"
            value={language}
            onChange={handleLanguageChange}
          >
            <option>C++</option>
            <option>Python</option>
            <option>Java</option>
            <option>JavaScript</option>
          </select>
          <div className="flex space-x-2">
            <ToastButton 
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              message="Format feature coming soon!"
            >
              Format
            </ToastButton>
            <ToastButton 
              className="bg-[#2cbb5d] text-white px-3 py-1.5 text-sm rounded-md hover:bg-[#28a955] transition-colors"
              message="Run code feature coming soon!"
            >
              Run
            </ToastButton>
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <CodeMirror
            value={code}
            height="550px"
            extensions={[getLanguageExtension()]}
            onChange={(value) => setCode(value)}
            theme={isDarkMode ? "dark" : "light"}
            className="text-sm font-mono"
            style={{
              fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
            }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              0ms
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              0MB
            </span>
          </div>
          <ToastButton 
            className="bg-[#2cbb5d] text-white px-4 py-2 rounded-md hover:bg-[#28a955] transition-colors font-medium"
            message="Submit feature coming soon!"
          >
            Submit
          </ToastButton>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
