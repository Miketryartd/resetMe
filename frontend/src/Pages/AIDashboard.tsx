import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import logo from "../images/logg.png";
import type { Stats, UserPrompt } from "../Types/Interface";
import AIFetch from "../Components/AIFetch";

function AIDashboard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<UserPrompt | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handlePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) { alert("Please enter a question"); return; }
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) { alert("User is not logged in"); setLoading(false); return; }
      const res = await fetch(`http://localhost:3000/api/user/me/get/ai/insight`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setInsight(data.insight);
      setStats(data.stats);
    } catch (error) {
      console.error("Error posting prompt to ai", error);
      setInsight("Sorry, I couldn't process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    if (!confirm("Are you sure you want to delete this conversation? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("User is not logged in");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/user/me/get/ai/prompt/${promptId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete prompt");
      }

      const result = await response.json();
      alert(result.message || "Conversation deleted successfully!");
      
   
      setSelectedPrompt(null);
      
      
      window.dispatchEvent(new Event('promptDeleted'));
      
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("Failed to delete conversation. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const showCenteredInput = !insight && !loading;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

  
      <button
        onClick={() => setAiPanelOpen(true)}
        className="lg:hidden fixed right-4 bottom-20 z-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 10h.01M12 10h.01M16 10h.01"/>
        </svg>
      </button>

    
      {aiPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setAiPanelOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 lg:mr-72 min-w-0">

        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="ml-3 text-lg font-semibold text-gray-800">AI Insights</h1>
          </div>
        </div>

        <div className={`flex items-center justify-center flex-col w-full px-4 ${showCenteredInput ? 'min-h-[calc(100vh-80px)]' : ''}`}>

          <div className={`w-full flex justify-center ${!showCenteredInput ? 'mt-8' : ''}`}>
            <form onSubmit={handlePrompt} className="flex flex-row w-full max-w-2xl items-center justify-center gap-2">
              <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 outline-none border border-gray-300 p-3 bg-white rounded-md focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Ask me about your habits..." disabled={loading} />
              <button type="submit" disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3 px-6 cursor-pointer transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2">
                {loading ? "Thinking..." : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {stats && (
            <div className="w-full max-w-6xl mx-auto mt-8 px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 lg:p-6 text-white">
                  <p className="text-blue-100 text-xs uppercase tracking-wide">Total Habits</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalHabits}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-4 lg:p-6 text-white">
                  <p className="text-green-100 text-xs uppercase tracking-wide">Avg Success Rate</p>
                  <p className="text-3xl font-bold mt-2">{stats.averageSuccessRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 lg:p-6 text-white">
                  <p className="text-purple-100 text-xs uppercase tracking-wide">Completed Days</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalCompletions}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-4 lg:p-6 text-white">
                  <p className="text-red-100 text-xs uppercase tracking-wide">Missed Days</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalMisses}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {stats.bestHabit && (
                  <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">🏆 Best Habit</h3>
                    <p className="text-gray-700 font-medium">{stats.bestHabit.habit}</p>
                    <p className="text-green-600 text-sm mt-1">Success Rate: {stats.bestHabit.successRate}%</p>
                  </div>
                )}
                {stats.worstHabit && (
                  <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">⚠️ Needs Improvement</h3>
                    <p className="text-gray-700 font-medium">{stats.worstHabit.habit}</p>
                    <p className="text-red-600 text-sm mt-1">Success Rate: {stats.worstHabit.successRate}%</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {insight && (
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                  <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                    <img src={logo} className="h-20 object-contain w-20" alt="Logo" /> Michael
                  </h2>
                </div>
                <div className="p-6">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {insight.split('\n').map((paragraph, idx) => <p key={idx} className="mb-4">{paragraph}</p>)}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                    <button onClick={() => { navigator.clipboard.writeText(insight); alert("Copied!"); }}
                      className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                      Copy response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && !insight && (
            <div className="w-full max-w-4xl mx-auto mt-8 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <p className="text-gray-500 text-center mt-4">AI is analyzing your habits...</p>
              </div>
            </div>
          )}

          {!insight && !loading && (
            <div className="w-full max-w-4xl mx-auto mt-8 px-4">
              <div className="rounded-lg bg-gray-100 p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img className="h-40 w-40 object-cover" src={logo} alt="Logo" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ask me anything about your habits!</h3>
                <p className="text-gray-500">I can analyze your progress, identify patterns, and give personalized advice.</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* AI Right Panel */}
      <div className={`
        fixed right-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 z-40 flex flex-col
        transition-transform duration-300 ease-in-out
        ${aiPanelOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:w-72
        w-full sm:w-96
      `}>
        <AIFetch
          onClose={() => setAiPanelOpen(false)}
          onSelectPrompt={(p) => setSelectedPrompt(p)}
          selectedPromptId={selectedPrompt?._id}
        />
      </div>

   
      {selectedPrompt && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-3 sm:p-4"
          onClick={() => !deleting && setSelectedPrompt(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h3 className="text-black text-base sm:text-lg font-semibold">Conversation Details</h3>
              <button
                onClick={() => setSelectedPrompt(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                disabled={deleting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
           
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" /></svg></span> Your Question
                </label>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-gray-800 border border-blue-100 text-sm sm:text-base">
                  {selectedPrompt.prompt_text || "No question provided"}
                </div>
              </div>

              {/* AI Response */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <img className="h-8 w-8 object-cover rounded-full" src={logo} alt="Logo" />
                  <span>Michael's Response</span>
                </label>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-gray-800 whitespace-pre-wrap border border-gray-200 text-sm sm:text-base">
                  {selectedPrompt.ai_response || "No response available"}
                </div>
              </div>

              {/* Stats Snapshot */}
              {selectedPrompt.stats_snapshot && selectedPrompt.stats_snapshot.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">📊</span> Stats at that time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-blue-600 font-medium">Total Habits</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-700">{selectedPrompt.stats_snapshot[0].totalHabits}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-green-600 font-medium">Success Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-700">{selectedPrompt.stats_snapshot[0].averageSuccessRate}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-purple-600 font-medium">Completed</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-700">{selectedPrompt.stats_snapshot[0].totalCompletions}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-red-600 font-medium">Missed</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-700">{selectedPrompt.stats_snapshot[0].totalMisses}</p>
                    </div>
                  </div>
                  {selectedPrompt.stats_snapshot[0].bestHabit && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                        <p className="text-xs text-green-600 font-medium">🏆 Best Habit</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{selectedPrompt.stats_snapshot[0].bestHabit.habit}</p>
                        <p className="text-xs text-green-600">{selectedPrompt.stats_snapshot[0].bestHabit.successRate}% success</p>
                      </div>
                      {selectedPrompt.stats_snapshot[0].worstHabit && (
                        <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
                          <p className="text-xs text-red-600 font-medium">⚠️ Needs Improvement</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{selectedPrompt.stats_snapshot[0].worstHabit.habit}</p>
                          <p className="text-xs text-red-600">{selectedPrompt.stats_snapshot[0].worstHabit.successRate}% success</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-gray-400 text-right pt-2 border-t border-gray-100">
                {selectedPrompt.created_at ? new Date(selectedPrompt.created_at).toLocaleString() : "Date not available"}
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
            <button
  onClick={() => selectedPrompt._id && handleDeletePrompt(selectedPrompt._id)}
  disabled={deleting || !selectedPrompt._id}
  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
                {deleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Conversation
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedPrompt(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base cursor-pointer"
                disabled={deleting}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AIDashboard;