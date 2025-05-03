import React from "react";
import * as marked from "marked";

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
  return (
    <div>
      <div className="flex mb-4 border-b">
        <button
          onClick={() => handleAiOptionChange("approach")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "approach"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          Discuss Approach
        </button>
        <button
          onClick={() => handleAiOptionChange("hints")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "hints"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          Give Hints
        </button>
        <button
          onClick={() => handleAiOptionChange("solution")}
          className={`px-4 py-2 font-medium text-sm ${
            aiOption === "solution"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-purple-600"
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
          <p className="text-gray-700 mb-4">
            Select an option above to get help with this problem.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div
              onClick={() => handleAiOptionChange("approach")}
              className="border rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 hover:border-purple-200"
            >
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-medium">Approach</h3>
              <p className="text-xs text-gray-500">Understand strategies</p>
            </div>
            <div
              onClick={() => handleAiOptionChange("hints")}
              className="border rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 hover:border-purple-200"
            >
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-medium">Hints</h3>
              <p className="text-xs text-gray-500">Step-by-step help</p>
            </div>
            <div
              onClick={() => handleAiOptionChange("solution")}
              className="border rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 hover:border-purple-200"
            >
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-medium">Solution</h3>
              <p className="text-xs text-gray-500">Complete answer</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {aiOption === "approach" && (
            <div className="prose max-w-none">
              {approachExplanation ? (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(approachExplanation),
                  }}
                />
              ) : (
                <p>No explanation available. Please try again later.</p>
              )}
            </div>
          )}

          {aiOption === "hints" && hints.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">
                Hint {hintIndex + 1}/{hints.length}
              </h3>
              <p className="text-gray-800 mb-4">{hints[hintIndex]}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setHintIndex(Math.max(0, hintIndex - 1))}
                  disabled={hintIndex === 0}
                  className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Hint
                </button>
                {hintIndex < hints.length - 1 ? (
                  <button
                    onClick={() =>
                      setHintIndex(Math.min(hints.length - 1, hintIndex + 1))
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Next Hint
                  </button>
                ) : (
                  <button
                    onClick={() => handleAiOptionChange("solution")}
                    className="px-3 py-1 bg-purple-600 text-white rounded"
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
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
                  <p className="mb-4 text-gray-700">
                    It's recommended to solve the problem yourself first.
                    Viewing the solution directly might reduce the learning
                    experience.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleAiOptionChange("hints")}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Try Hints First
                    </button>
                    <button
                      onClick={() => setShowSolutionConfirm(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Show Solution
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  {solution ? (
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(solution),
                      }}
                    />
                  ) : (
                    <p>Loading solution...</p>
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
