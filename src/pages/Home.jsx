import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { problems } from '../data/problems';

const Home = () => {
  const [difficulty, setDifficulty] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter problems based on selected filters
  const filteredProblems = problems.filter(problem => {
    // Filter by difficulty
    if (difficulty !== 'all' && problem.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Filter area */}
        <div className="border-b p-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-xl font-semibold">Problems</h1>
          
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems"
                className="pl-8 pr-3 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select 
              className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            
            <select 
              className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <div className="grid grid-cols-10 bg-gray-50 text-left py-3 px-6 border-b">
          <div className="col-span-1 text-gray-500 text-xs font-medium uppercase tracking-wider">Status</div>
          <div className="col-span-1 text-gray-500 text-xs font-medium uppercase tracking-wider">#</div>
          <div className="col-span-5 text-gray-500 text-xs font-medium uppercase tracking-wider">Title</div>
          <div className="col-span-2 text-gray-500 text-xs font-medium uppercase tracking-wider">Difficulty</div>
          <div className="col-span-1 text-gray-500 text-xs font-medium uppercase tracking-wider">Acceptance</div>
        </div>
        
        {/* Problem rows */}
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="grid grid-cols-10 py-4 px-6 border-b hover:bg-gray-50 transition-colors">
            <div className="col-span-1 flex items-center">
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                {/* Empty circle for "not attempted" status */}
              </span>
            </div>
            <div className="col-span-1 font-medium text-gray-500">{problem.id}</div>
            <div className="col-span-5">
              <Link to={`/problem/${problem.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                {problem.title}
              </Link>
            </div>
            <div className="col-span-2">
              <span 
                className={`px-2.5 py-1 text-xs font-semibold rounded-full 
                  ${problem.difficulty === 'Easy' 
                    ? 'bg-green-100 text-green-800' 
                    : problem.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <div className="col-span-1 text-gray-500 text-sm">
              {problem.acceptance}
            </div>
          </div>
        ))}
        
        {filteredProblems.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No problems found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
