import { useEffect, useState } from "react"
import type { Review } from "../Types/Interface";
import { Link } from "react-router";
import { API_BASE_URL } from "../Config/API";

function Reviews() {

    const [review, setReview] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const url = `${API_BASE_URL}/api/user/me/reviews?limit=8`;
                const headers: HeadersInit = token
                    ? { Authorization: `Bearer ${token}` }
                    : {};
                const res = await fetch(url, { method: "GET", headers });
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    setReview(data);
                } else {
                    setReview([]);
                }
            } catch (error) {
                console.error('Error fetching user reviews', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <section className="w-full py-16 px-6 bg-gradient-to-br from-blue-500/50 via-blue-50  relative overflow-hidden">

         
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 mb-10 text-center">
                <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">Testimonials</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
                    What our users <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">think</span>
                </h2>
                <p className="text-slate-400 mt-3 text-base max-w-md mx-auto">
                    Real words from real people who love what we built.
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
                {review.length > 0 ? (
                    review.map((rev, idx) => (
                      
                        <div
                            key={idx}
                            className="group flex flex-col justify-between bg-white  border border-black/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1"
                        >
                      
                            <div className="text-cyan-500 text-3xl font-serif leading-none mb-3 select-none">"</div>

                         
                            <p className="text-black text-sm leading-relaxed flex-1 mb-4">
                                {rev.review}
                            </p>

                            <div className="border-t border-white/10 pt-3 flex flex-col gap-1">
                                <span className="text-black font-semibold text-sm truncate">
                                    {rev.user?.email}
                                </span>
                                <span className="text-slate-400 text-xs">
                                    {new Date(rev.reviewedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-slate-400 text-base italic">No reviews yet. Be the first! 🌟</p>
                    </div>
                )}
            </div>

            <div className="relative z-10 flex items-center justify-center mt-10">
                <Link
                    to="/Reviews"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-200 ease-in-out"
                >
                    Load more reviews
                    <span className="text-lg">→</span>
                </Link>
            </div>
        </section>
    );
}

export default Reviews;