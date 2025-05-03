import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <select className="bg-gray-700 text-white text-sm rounded px-2 py-1">
            <option>C++</option>
            <option>Python</option>
            <option>Java</option>
            <option>JavaScript</option>
          </select>
          <button className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700">
            Run
          </button>
        </div>
        <div className="border border-gray-700 rounded">
          <CodeMirror
            value={code}
            height="550px"
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
            theme="dark"
            className="text-sm"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
