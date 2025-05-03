import React from "react";

const ProblemDescription = ({ problem }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{problem.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Examples</h2>
        {problem.examples.map((example, index) => (
          <div key={index} className="mb-4 bg-gray-50 p-3 rounded">
            <div className="mb-1">
              <strong>Input:</strong> {example.input}
            </div>
            <div className="mb-1">
              <strong>Output:</strong> {example.output}
            </div>
            {example.explanation && (
              <div className="text-gray-600">
                <strong>Explanation:</strong> {example.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Constraints</h2>
        <ul className="list-disc pl-5">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-gray-700">
              {constraint}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProblemDescription;
