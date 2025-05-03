import React from "react";

const ProblemHeader = ({ problem }) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">
            {problem.id}. {problem.title}
          </h1>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full 
                ${
                  problem.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {problem.difficulty}
            </span>
            <span className="text-gray-500 text-sm">
              Acceptance: {problem.acceptance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemHeader;
