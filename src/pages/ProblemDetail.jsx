"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { problems } from "../data/problems";
import {
  getApproachExplanation,
  getHints,
  getSolution,
} from "../services/geminiService";
import { getYouTubeVideos } from "../services/youtubeService";
import { useTheme } from "../context/ThemeContext";

// Import components
import ProblemHeader from "../components/ProblemHeader";
import Navigation from "../components/Navigation";
import ProblemDescription from "../components/ProblemDescription";
import AiExplanation from "../components/AiExplanation";
import YoutubeVideos from "../components/YoutubeVideos";
import CodeEditor from "../components/CodeEditor";
import MaximizedNavigationHeader from "../components/MaximizedNavigationHeader";

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);

  // AI explanation states
  const [approachExplanation, setApproachExplanation] = useState("");
  const [aiOption, setAiOption] = useState(null);
  const [hints, setHints] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [solution, setSolution] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);

  // YouTube states
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [tutorFilter, setTutorFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("c++");
  const [isLoadingYT, setIsLoadingYT] = useState(false);
  const [isSearchingYT, setIsSearchingYT] = useState(false);

  const [currentTab, setCurrentTab] = useState("description");
  const [apiError, setApiError] = useState(null);

  const toggleMaximize = () => {
    const newMaximizedState = !isMaximized;
    setIsMaximized(newMaximizedState);

    // Dispatch custom event for App component to catch
    const event = new CustomEvent("maximize-change", {
      detail: { isMaximized: newMaximizedState },
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const selectedProblem = problems.find((p) => p.id === Number.parseInt(id));
    if (selectedProblem) {
      setProblem(selectedProblem);
      setCode(
        selectedProblem.cppCode || "// C++ code not available for this problem"
      );
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleAIExplain = async () => {
    if (currentTab === "aiExplanation") return;
    setCurrentTab("aiExplanation");
    setAiOption(null);
  };

  const fetchApproachExplanation = async () => {
    if (approachExplanation) return;

    setIsLoadingAI(true);
    setApiError(null);

    try {
      const explanation = await getApproachExplanation(problem);
      setApproachExplanation(explanation);
    } catch (error) {
      console.error("Error getting approach explanation:", error);
      setApiError(
        "Failed to get approach explanation. Please try again later."
      );
      setApproachExplanation(
        "Failed to get approach explanation. Please check the console for more details."
      );
    } finally {
      setIsLoadingAI(false);
    }
  };

  const fetchHints = async () => {
    if (hints.length > 0) return;

    setIsLoadingAI(true);
    setApiError(null);

    try {
      const hintsList = await getHints(problem);
      setHints(hintsList);
      setHintIndex(0);
    } catch (error) {
      console.error("Error getting hints:", error);
      setApiError("Failed to get hints. Please try again later.");
      setHints(["Failed to get hints. Please try again later."]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const fetchSolution = async () => {
    if (solution) {
      setShowSolutionConfirm(true);
      return;
    }

    setIsLoadingAI(true);
    setApiError(null);

    try {
      const solutionText = await getSolution(problem);
      setSolution(solutionText);
      setShowSolutionConfirm(true);
    } catch (error) {
      console.error("Error getting solution:", error);
      setApiError("Failed to get solution. Please try again later.");
      setSolution("Failed to get solution. Please try again later.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAiOptionChange = async (option) => {
    setAiOption(option);

    if (option === "approach") {
      await fetchApproachExplanation();
    } else if (option === "hints") {
      await fetchHints();
    } else if (option === "solution") {
      await fetchSolution();
    }
  };

  const handleYouTubeSearch = async () => {
    if (currentTab === "youtubeVideos") return;

    setCurrentTab("youtubeVideos");

    if (youtubeVideos.length === 0) {
      await fetchYouTubeVideos({ language: "c++" });
    }
  };

  const fetchYouTubeVideos = async (filters = {}) => {
    setIsLoadingYT(true);
    setIsSearchingYT(true);
    setApiError(null);

    try {
      const videos = await getYouTubeVideos(problem, filters);

      if (videos.length === 0) {
        setApiError(
          "No videos found. Try different search terms or check your API key configuration."
        );
      }

      setYoutubeVideos(videos);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setApiError("Failed to fetch YouTube videos. Please try again later.");
      setYoutubeVideos([]);
    } finally {
      setIsLoadingYT(false);
      setIsSearchingYT(false);
    }
  };

  const handleYoutubeFiltersSubmit = (e) => {
    e.preventDefault();
    fetchYouTubeVideos({
      tutor: tutorFilter,
      language: languageFilter,
    });
  };

  if (!problem) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2cbb5d]"></div>
      </div>
    );
  }

  // Common props for Navigation component
  const navigationProps = {
    currentTab,
    setCurrentTab,
    handleAIExplain,
    handleYouTubeSearch,
    isLoadingAI,
    isLoadingYT
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${isMaximized ? "pt-0" : ""}`}>
      {!isMaximized ? (
        <ProblemHeader problem={problem} />
      ) : (
        <MaximizedNavigationHeader
          toggleMaximize={toggleMaximize}
          {...navigationProps}
        />
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar navigation - Only on desktop and when not maximized */}
        {!isMaximized && (
          <div className="hidden md:block">
            <Navigation
              mode="sidebar"
              toggleMaximize={toggleMaximize}
              {...navigationProps}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Only show tab navigation on mobile when not maximized */}
          {!isMaximized && (
            <div className="md:hidden">
              <Navigation mode="tabs" {...navigationProps} />
            </div>
          )}

          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Panel - Problem Description/AI/YouTube */}
              <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="p-4 md:p-6 h-[calc(100vh-160px)] overflow-y-auto">
                  {currentTab === "description" && <ProblemDescription problem={problem} />}

                  {currentTab === "aiExplanation" && (
                    <AiExplanation
                      aiOption={aiOption}
                      setAiOption={setAiOption}
                      isLoadingAI={isLoadingAI}
                      approachExplanation={approachExplanation}
                      hints={hints}
                      hintIndex={hintIndex}
                      setHintIndex={setHintIndex}
                      solution={solution}
                      showSolutionConfirm={showSolutionConfirm}
                      setShowSolutionConfirm={setShowSolutionConfirm}
                      handleAiOptionChange={handleAiOptionChange}
                    />
                  )}

                  {currentTab === "youtubeVideos" && (
                    <YoutubeVideos
                      youtubeVideos={youtubeVideos}
                      tutorFilter={tutorFilter}
                      setTutorFilter={setTutorFilter}
                      languageFilter={languageFilter}
                      setLanguageFilter={setLanguageFilter}
                      isLoadingYT={isLoadingYT}
                      isSearchingYT={isSearchingYT}
                      handleYoutubeFiltersSubmit={handleYoutubeFiltersSubmit}
                    />
                  )}

                  {apiError && currentTab !== "description" && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800">
                      {apiError}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Code Editor */}
              <div className="w-full lg:w-1/2">
                <CodeEditor code={code} setCode={setCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
