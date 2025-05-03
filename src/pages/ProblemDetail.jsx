"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { problems } from "../data/problems"
import { getApproachExplanation, getHints, getSolution } from "../services/geminiService"
import { getYouTubeVideos } from "../services/youtubeService"
import { useTheme } from "../context/ThemeContext"

// Import components
import ProblemHeader from "../components/ProblemHeader"
import TabNavigation from "../components/TabNavigation"
import ProblemDescription from "../components/ProblemDescription"
import AiExplanation from "../components/AiExplanation"
import YoutubeVideos from "../components/YoutubeVideos"
import CodeEditor from "../components/CodeEditor"
import ToastButton from "../components/ui/ToastButton"

const ProblemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState("")

  // AI explanation states
  const [approachExplanation, setApproachExplanation] = useState("")
  const [aiOption, setAiOption] = useState(null)
  const [hints, setHints] = useState([])
  const [hintIndex, setHintIndex] = useState(0)
  const [solution, setSolution] = useState("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false)

  // YouTube states
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [tutorFilter, setTutorFilter] = useState("")
  const [languageFilter, setLanguageFilter] = useState("c++")
  const [isLoadingYT, setIsLoadingYT] = useState(false)
  const [isSearchingYT, setIsSearchingYT] = useState(false)

  const [currentTab, setCurrentTab] = useState("description")
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    const selectedProblem = problems.find((p) => p.id === Number.parseInt(id))
    if (selectedProblem) {
      setProblem(selectedProblem)
      setCode(selectedProblem.cppCode || "// C++ code not available for this problem")
    } else {
      navigate("/")
    }
  }, [id, navigate])

  const handleAIExplain = async () => {
    if (currentTab === "aiExplanation") return
    setCurrentTab("aiExplanation")
    setAiOption(null)
  }

  const fetchApproachExplanation = async () => {
    if (approachExplanation) return

    setIsLoadingAI(true)
    setApiError(null)

    try {
      const explanation = await getApproachExplanation(problem)
      setApproachExplanation(explanation)
    } catch (error) {
      console.error("Error getting approach explanation:", error)
      setApiError("Failed to get approach explanation. Please try again later.")
      setApproachExplanation("Failed to get approach explanation. Please check the console for more details.")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const fetchHints = async () => {
    if (hints.length > 0) return

    setIsLoadingAI(true)
    setApiError(null)

    try {
      const hintsList = await getHints(problem)
      setHints(hintsList)
      setHintIndex(0)
    } catch (error) {
      console.error("Error getting hints:", error)
      setApiError("Failed to get hints. Please try again later.")
      setHints(["Failed to get hints. Please try again later."])
    } finally {
      setIsLoadingAI(false)
    }
  }

  const fetchSolution = async () => {
    if (solution) {
      setShowSolutionConfirm(true)
      return
    }

    setIsLoadingAI(true)
    setApiError(null)

    try {
      const solutionText = await getSolution(problem)
      setSolution(solutionText)
      setShowSolutionConfirm(true)
    } catch (error) {
      console.error("Error getting solution:", error)
      setApiError("Failed to get solution. Please try again later.")
      setSolution("Failed to get solution. Please try again later.")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleAiOptionChange = async (option) => {
    setAiOption(option)

    if (option === "approach") {
      await fetchApproachExplanation()
    } else if (option === "hints") {
      await fetchHints()
    } else if (option === "solution") {
      await fetchSolution()
    }
  }

  const handleYouTubeSearch = async () => {
    if (currentTab === "youtubeVideos") return

    setCurrentTab("youtubeVideos")

    if (youtubeVideos.length === 0) {
      await fetchYouTubeVideos({ language: "c++" })
    }
  }

  const fetchYouTubeVideos = async (filters = {}) => {
    setIsLoadingYT(true)
    setIsSearchingYT(true)
    setApiError(null)

    try {
      const videos = await getYouTubeVideos(problem, filters)

      if (videos.length === 0) {
        setApiError("No videos found. Try different search terms or check your API key configuration.")
      }

      setYoutubeVideos(videos)
    } catch (error) {
      console.error("Error fetching YouTube videos:", error)
      setApiError("Failed to fetch YouTube videos. Please try again later.")
      setYoutubeVideos([])
    } finally {
      setIsLoadingYT(false)
      setIsSearchingYT(false)
    }
  }

  const handleYoutubeFiltersSubmit = (e) => {
    e.preventDefault()
    fetchYouTubeVideos({
      tutor: tutorFilter,
      language: languageFilter,
    })
  }

  if (!problem) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ProblemHeader problem={problem} />
      
      <div className="flex">
        {/* Navigation Sidebar */}
        <div className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-64px)] shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-medium text-gray-900 dark:text-white">Navigation</h2>
          </div>
          
          <div className="flex flex-col py-2">
            <button
              onClick={() => setCurrentTab("description")}
              className={`px-4 py-3 text-left flex items-center space-x-3 ${
                currentTab === "description"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-4 border-green-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Description</span>
            </button>
            
            <button
              onClick={handleAIExplain}
              className={`px-4 py-3 text-left flex items-center space-x-3 ${
                currentTab === "aiExplanation"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-l-4 border-purple-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              <span className="text-xl">🧠</span>
              <span>AI Explanation</span>
              {isLoadingAI && <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></span>}
            </button>
            
            <button
              onClick={handleYouTubeSearch}
              className={`px-4 py-3 text-left flex items-center space-x-3 ${
                currentTab === "youtubeVideos"
                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              <span className="text-xl">📺</span>
              <span>YouTube Solutions</span>
              {isLoadingYT && <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></span>}
            </button>
            
            <ToastButton
              className="px-4 py-3 text-left flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              message="Solutions feature coming soon!"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Solutions</span>
            </ToastButton>
            
            <ToastButton
              className="px-4 py-3 text-left flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              message="Discussion feature coming soon!"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>Discussion</span>
            </ToastButton>
          </div>
        </div>
        
        {/* Mobile Tab Navigation - Only visible on smaller screens */}
        <div className="md:hidden">
          <TabNavigation
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            handleAIExplain={handleAIExplain}
            handleYouTubeSearch={handleYouTubeSearch}
            isLoadingAI={isLoadingAI}
            isLoadingYT={isLoadingYT}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-[calc(100vh-64px)]">
          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Panel */}
              <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="p-6 h-[calc(100vh-160px)] overflow-y-auto">
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
  )
}

export default ProblemDetail
