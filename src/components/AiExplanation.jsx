"use client";
import * as marked from "marked";
import { useTheme } from "../context/ThemeContext";

const AiExplanation = ({
  aiOption,
  setAiOption,
  isLoadingAI,
  approachExplanation,
  hints,
  hintIndex,
  setHintIndex,
  solution,
  showSolutionConfirm,
  setShowSolutionConfirm,
  handleAiOptionChange,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleAiOptionChange("approach")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "approach"
              ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
              : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
        >
          Discuss Approach
        </button>
        <button
          onClick={() => handleAiOptionChange("hints")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "hints"
              ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
              : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
        >
          Give Hints
        </button>
        <button
          onClick={() => handleAiOptionChange("solution")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "solution"
              ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
              : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
        >
          Full Solution
        </button>
      </div>

      {isLoadingAI ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : aiOption === null ? (
        <div className="text-center py-16">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select an option above to get help with this problem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div
              onClick={() => handleAiOptionChange("approach")}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-750 hover:border-purple-200 dark:hover:border-purple-700 transition-colors"
            >
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Approach
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Understand strategies
              </p>
            </div>
            <div
              onClick={() => handleAiOptionChange("hints")}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-750 hover:border-purple-200 dark:hover:border-purple-700 transition-colors"
            >
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Hints
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Step-by-step help
              </p>
            </div>
            <div
              onClick={() => handleAiOptionChange("solution")}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-750 hover:border-purple-200 dark:hover:border-purple-700 transition-colors"
            >
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Solution
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Complete answer
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {aiOption === "approach" && (
            <div className="prose max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
              {approachExplanation ? (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(approachExplanation),
                  }}
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  No explanation available. Please try again later.
                </p>
              )}
            </div>
          )}

          {aiOption === "hints" && hints.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">
                Hint {hintIndex + 1}/{hints.length}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                {hints[hintIndex]}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setHintIndex(Math.max(0, hintIndex - 1))}
                  disabled={hintIndex === 0}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-blue-700"
                >
                  Previous Hint
                </button>
                {hintIndex < hints.length - 1 ? (
                  <button
                    onClick={() =>
                      setHintIndex(Math.min(hints.length - 1, hintIndex + 1))
                    }
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-700"
                  >
                    Next Hint
                  </button>
                ) : (
                  <button
                    onClick={() => handleAiOptionChange("solution")}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-md transition-colors hover:bg-purple-700"
                  >
                    View Solution
                  </button>
                )}
              </div>
            </div>
          )}

          {aiOption === "solution" && (
            <div>
              {!showSolutionConfirm ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-100 dark:border-yellow-800 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Are you sure?
                  </h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    It's recommended to solve the problem yourself first.
                    Viewing the solution directly might reduce the learning
                    experience.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => handleAiOptionChange("hints")}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Try Hints First
                    </button>
                    <button
                      onClick={() => setShowSolutionConfirm(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Show Solution
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
                  {solution ? (
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(solution),
                      }}
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      Loading solution...
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AiExplanation;
