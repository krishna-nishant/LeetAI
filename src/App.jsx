import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function App() {
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  // Listen for custom event from ProblemDetail component
  useEffect(() => {
    const handleMaximizeChange = (event) => {
      setHideNavbar(event.detail.isMaximized);
    };

    window.addEventListener("maximize-change", handleMaximizeChange);

    return () => {
      window.removeEventListener("maximize-change", handleMaximizeChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          {!hideNavbar && <Navbar />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />
            </Routes>
          </main>
          <Analytics />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
