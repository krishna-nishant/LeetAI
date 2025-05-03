"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useTheme } from "../context/ThemeContext";
import ToastButton from "./ui/ToastButton";

const CodeEditor = ({ code, setCode }) => {
  const { isDarkMode } = useTheme();
  const [language, setLanguage] = useState("JavaScript");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <select
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm rounded-md px-3 py-1.5 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="bg-green-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-green-700 transition-colors"
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
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
            theme={isDarkMode ? "dark" : "light"}
            className="text-sm"
          />
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Time: 0ms
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Memory: 0MB
            </span>
          </div>
          <ToastButton 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
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
