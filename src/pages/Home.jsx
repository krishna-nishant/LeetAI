"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { problems } from "../data/problems";
import { useTheme } from "../context/ThemeContext";
import ToastButton from "../components/ui/ToastButton";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter problems based on selected filters
  const filteredProblems = problems.filter((problem) => {
    // Filter by difficulty
    if (
      difficulty !== "all" &&
      problem.difficulty.toLowerCase() !== difficulty.toLowerCase()
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] dark:from-[#0f172a] dark:to-[#1e293b] rounded-xl overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Master Coding Challenges with{" "}
              <span className="text-[#2cbb5d]">AI</span> Assistance
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Solve problems faster with AI explanations, step-by-step hints,
              and video solutions to ace your technical interviews.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/problem/1"
                className="px-6 py-3 bg-[#2cbb5d] hover:bg-[#28a955] text-white font-medium rounded-md transition-colors shadow-md"
              >
                Start Solving
              </Link>
              <a
                href="#problems"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition-colors backdrop-blur-sm"
              >
                Browse Problems
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#2cbb5d]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-gray-400 text-sm">
                    code-editor.cpp
                  </div>
                </div>
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            AI Explanations
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get detailed explanations of problem-solving approaches and
            algorithms from our AI assistant.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Step-by-Step Hints
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Stuck on a problem? Get progressive hints that guide you toward the
            solution without giving it away.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📺</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Video Solutions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Learn visually with curated YouTube tutorials from top coding
            instructors for each problem.
          </p>
        </div>
      </div>

      {/* Problems Table */}
      <div
        id="problems"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200"
      >
        {/* Filter area */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Problems
          </h2>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems"
                className="pl-8 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2cbb5d] bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2cbb5d] bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2cbb5d] bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-10 bg-gray-50 dark:bg-gray-750 text-left py-3 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="col-span-1 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
            Status
          </div>
          <div className="col-span-1 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
            #
          </div>
          <div className="col-span-5 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
            Title
          </div>
          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
            Difficulty
          </div>
          <div className="col-span-1 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
            Acceptance
          </div>
        </div>

        {/* Problem rows */}
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="grid grid-cols-10 py-4 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          >
            <div className="col-span-1 flex items-center">
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                {/* Empty circle for "not attempted" status */}
              </span>
            </div>
            <div className="col-span-1 font-medium text-gray-500 dark:text-gray-400">
              {problem.id}
            </div>
            <div className="col-span-5">
              <Link
                to={`/problem/${problem.id}`}
                className="text-[#2cbb5d] hover:text-[#28a955] font-medium transition-colors"
              >
                {problem.title}
              </Link>
            </div>
            <div className="col-span-2">
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full 
                  ${
                    problem.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : problem.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                  }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <div className="col-span-1 text-gray-500 dark:text-gray-400 text-sm">
              {problem.acceptance}
            </div>
          </div>
        ))}

        {filteredProblems.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No problems found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
