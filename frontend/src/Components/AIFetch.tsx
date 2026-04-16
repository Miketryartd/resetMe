import { useEffect, useState } from "react";
import type { UserPrompt, Stats } from "../Types/Interface";
import logo from "../images/logo.png";

interface AIFetchProps {
    onClose?: () => void;
    onSelectPrompt: (prompt: UserPrompt) => void;
    selectedPromptId?: string;
}

function AIFetch({ onClose, onSelectPrompt, selectedPromptId }: AIFetchProps) {
    const [prompts, setPrompts] = useState<UserPrompt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPromptHistory();
    }, []);

    const fetchPromptHistory = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            if (!token) { alert("User not logged in"); setLoading(false); return; }
            const res = await fetch(`http://localhost:3000/api/user/me/get/ai/history`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setPrompts(data.prompts || []);
            setError(null);
        } catch (error) {
            console.error("Error fetching ai prompt history", error);
            setError("Failed to load prompt history");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Invalid date";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const truncateText = (text: string | undefined, maxLength: number = 50) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
    };

    const getStats = (statsSnapshot: Stats[] | undefined): Stats | null => {
        if (!statsSnapshot || statsSnapshot.length === 0) return null;
        return statsSnapshot[0];
    };

    return (
        <div className="flex flex-col h-full w-full">

            {/* Header */}
            <div className="relative p-4 border-b border-gray-200 bg-gray-100 flex-shrink-0">
                <button
                    onClick={onClose}
                    className="lg:hidden absolute right-3 top-3 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-600 transition-colors cursor-pointer"
                >
                    ✕
                </button>
                <div className="flex justify-center">
                    <img className="h-32 w-32 object-cover" src={logo} alt="Logo" />
                </div>
                <p className="text-blue-500 text-xs sm:text-sm mt-1 text-center">
                    Your previous conversations with AI
                </p>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                {loading && (
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600 text-sm">{error}</p>
                        <button onClick={fetchPromptHistory} className="mt-2 text-sm text-red-500 hover:text-red-700 underline cursor-pointer">Try again</button>
                    </div>
                )}
                {!loading && !error && prompts.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-3">💬</div>
                        <p className="text-gray-500 text-sm">No prompts yet</p>
                        <p className="text-gray-400 text-xs mt-1">Your conversations with AI will appear here</p>
                    </div>
                )}
                {!loading && !error && prompts.length > 0 && (
                    <div className="space-y-3">
                        {prompts.map((prompt, index) => {
                            const stats = getStats(prompt.stats_snapshot);
                            return (
                                <div
                                    key={prompt._id || index.toString()}
                                    onClick={() => onSelectPrompt(prompt)}
                                    className={`bg-gray-50 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md border-l-4 ${
                                        selectedPromptId === prompt._id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{truncateText(prompt.prompt_text, 40)}</p>
                                            <p className="text-xs text-gray-500 mt-1">{formatDate(prompt.created_at || "")}</p>
                                            {stats && (
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                                                    <span className="text-xs text-green-600">✅ {stats.totalCompletions}</span>
                                                    <span className="text-xs text-red-600">❌ {stats.totalMisses}</span>
                                                    <span className="text-xs text-blue-600">📊 {stats.averageSuccessRate}%</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-gray-400 text-xs">💬</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Refresh footer */}
            {prompts.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <button onClick={fetchPromptHistory} className="w-full text-sm text-blue-500 hover:text-blue-700 flex items-center justify-center gap-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg> Refresh
                    </button>
                </div>
            )}
        </div>
    );
}

export default AIFetch;