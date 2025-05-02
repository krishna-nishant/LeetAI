import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-white">
                LeetCode
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-200 hover:text-white">
                  Problems
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
