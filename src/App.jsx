import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import ToastButton from "./components/ui/ToastButton";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto py-3 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-8">
                  <Link
                    to="/"
                    className="text-xl font-bold text-gray-800 dark:text-white flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-green-500"
                    >
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="m14.5 4-5 16"></path>
                    </svg>
                    LeetAI
                  </Link>
                  <nav className="hidden md:flex space-x-4">
                    <Link
                      to="/"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                    >
                      Problems
                    </Link>
                    <ToastButton
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      message="Explore feature coming soon!"
                    >
                      Explore
                    </ToastButton>
                    <ToastButton
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      message="Contests feature coming soon!"
                    >
                      Contests
                    </ToastButton>
                    <ToastButton
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      message="Discussion feature coming soon!"
                    >
                      Discuss
                    </ToastButton>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <ToastButton 
                    className="hidden md:block px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                    message="Sign in feature coming soon!"
                  >
                    Sign In
                  </ToastButton>
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
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
