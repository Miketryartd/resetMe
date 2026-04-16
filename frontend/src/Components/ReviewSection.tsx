import { useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../Config/API";

function ReviewSection() {

    const [review, setReview] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const nav = useNavigate();

    const handleReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!review.trim()) return; 

        try {
            setLoading(true);
            const reviewData = { review };
            const token = sessionStorage.getItem("token");

            if (!token) {
                nav('/Signin');
                return;
            }

            const url = `${API_BASE_URL}/api/user/me/review`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(reviewData)
            });

            const data = await res.json();
            setReview(data);

            if (res.ok) {
                setSuccess(true);
                setReview(""); 
                setTimeout(() => setSuccess(false), 3000); 
            }

        } catch (error) {
            console.error('Error adding review:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full py-14 px-6 bg-gradient-to-br from-slate-100 via-blue-50 to-blue-500/50 relative overflow-hidden">

        
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center mb-8">
                <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">Your Voice Matters</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-black">
                    Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">experience</span>
                </h2>
                <p className="text-slate-400 mt-2 text-sm">
                    Let others know what you think. Your review helps the community.
                </p>
            </div>

           
            <div className="relative z-10 max-w-2xl mx-auto">
                <form
                    onSubmit={handleReview}
                    className="flex items-center gap-3 bg-white border border-black/10 rounded-2xl p-3 backdrop-blur-md shadow-xl shadow-yellow/30 focus-within:border-cyan-400/50 transition-all duration-300"
                >
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="flex-1 bg-transparent text-black placeholder-slate-500  outline-none px-3 py-2 text-sm"
                        placeholder="Write your thoughts here..."
                    />

                    <button
                        type="submit"
                        disabled={loading || !review.trim()}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                    >
                        {loading ? (
                       
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                        
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
                                </svg>
                                Submit
                            </>
                        )}
                    </button>
                </form>

          
                {success && (
                    <p className="text-center text-cyan-400 text-sm mt-4 animate-pulse">
              Thanks! Your review has been submitted.
                    </p>
                )}
            </div>
        </section>
    );
}

export default ReviewSection;