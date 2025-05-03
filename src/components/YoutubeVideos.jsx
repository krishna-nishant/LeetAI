import React from "react";

const YoutubeVideos = ({
  youtubeVideos,
  tutorFilter,
  setTutorFilter,
  languageFilter,
  setLanguageFilter,
  isLoadingYT,
  isSearchingYT,
  handleYoutubeFiltersSubmit,
}) => {
  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Find YouTube Solutions</h3>
        <form onSubmit={handleYoutubeFiltersSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Tutor/Channel</label>
              <input
                type="text"
                placeholder="e.g., NeetCode, Tech Interview Pro"
                className="w-full px-3 py-2 border rounded-md"
                value={tutorFilter}
                onChange={(e) => setTutorFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Programming Language</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <option value="">Any Language</option>
                <option value="c++">C++</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSearchingYT}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isSearchingYT ? "Searching..." : "Search YouTube"}
          </button>
        </form>
      </div>

      {isLoadingYT && youtubeVideos.length === 0 ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : youtubeVideos.length > 0 ? (
        <div className="space-y-4">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row"
              >
                <div className="sm:w-1/3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 sm:h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-600">{video.channelTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700">
            {isSearchingYT
              ? "Searching for videos..."
              : tutorFilter || languageFilter !== "c++"
              ? "No videos found matching your search criteria. Try adjusting your filters."
              : "Search for YouTube tutorials using the filters above."}
          </p>
        </div>
      )}
    </div>
  );
};

export default YoutubeVideos;
