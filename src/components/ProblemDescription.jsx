"use client";
import { useTheme } from "../context/ThemeContext";

const ProblemDescription = ({ problem }) => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {problem.description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Examples
        </h2>
        {problem.examples.map((example, index) => (
          <div
            key={index}
            className="mb-4 bg-gray-50 dark:bg-gray-750 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div className="mb-1 font-mono">
              <strong className="text-gray-700 dark:text-gray-300">
                Input:
              </strong>{" "}
              <span className="text-gray-800 dark:text-gray-200">
                {example.input}
              </span>
            </div>
            <div className="mb-1 font-mono">
              <strong className="text-gray-700 dark:text-gray-300">
                Output:
              </strong>{" "}
              <span className="text-gray-800 dark:text-gray-200">
                {example.output}
              </span>
            </div>
            {example.explanation && (
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Explanation:</strong> {example.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Constraints
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {constraint}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProblemDescription;
