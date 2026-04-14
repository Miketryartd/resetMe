import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { ReviewProps } from "../Types/Interface";

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
  } catch {
    return "—";
  }
}

const avatarColors = [
  "bg-blue-500", "bg-green-600", "bg-blue-400",
  "bg-green-500", "bg-blue-600", "bg-green-700",
];

function AllReviews() {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/user/me/allReviews`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching all reviews", err);
        setError("Could not load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 [font-family:'DM_Sans',sans-serif]">

      {/* NAVBAR */}
      <header className="bg-blue-500 px-6 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="[font-family:'Sora',sans-serif] font-black text-2xl text-white">
          reset<span className="text-green-300">Me</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/Signin" className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200">
            Sign in
          </Link>
          <Link to="/Signup" className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-full transition-all duration-200">
            Get Started →
          </Link>
        </div>
      </header>

      {/* HERO STRIP */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 md:px-16 py-12 text-center">
        <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-3">What people are saying</p>
        <h1 className="[font-family:'Sora',sans-serif] text-3xl md:text-5xl font-black text-white mb-4">
          Real users. Real results.
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
          Don't take our word for it — here's what the resetMe community has to say.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-center min-w-[110px]">
            <p className="[font-family:'Sora',sans-serif] text-2xl font-black text-white">
              {loading ? "—" : reviews.length}
            </p>
            <p className="text-white/60 text-xs font-medium mt-0.5">Total Reviews</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-center min-w-[110px]">
            <p className="[font-family:'Sora',sans-serif] text-2xl font-black text-white">50+</p>
            <p className="text-white/60 text-xs font-medium mt-0.5">Active Users</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-center min-w-[110px]">
            <p className="[font-family:'Sora',sans-serif] text-2xl font-black text-white">100%</p>
            <p className="text-white/60 text-xs font-medium mt-0.5">Would recommend</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 md:px-16 py-14">

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm font-medium">Loading reviews...</p>
          </div>
        )}


        {!loading && error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4 max-w-md mx-auto">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

     
        {!loading && !error && reviews.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="[font-family:'Sora',sans-serif] text-xl font-black text-gray-800 mb-2">No reviews yet</h3>
            <p className="text-gray-400 text-sm">Be the first to leave one!</p>
          </div>
        )}

        {/* Reviews grid */}
        {!loading && !error && reviews.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="[font-family:'Sora',sans-serif] text-xl font-black text-gray-900">
                All Reviews{" "}
                <span className="text-gray-400 font-medium text-base ml-1">({reviews.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <div
                  key={review._id ?? i}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                >
           
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{review.user}</p>
                      <p className="text-xs text-gray-400">{formatDate(review.reviewedAt)}</p>
                    </div>
                  </div>

    
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    "{review.review ?? "No review provided."}"
                  </p>

             
                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      Verified user
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

   
        {!loading && (
          <div className="mt-16 bg-blue-500 rounded-2xl p-10 text-center">
            <h3 className="[font-family:'Sora',sans-serif] text-2xl font-black text-white mb-2">
              Ready to write your own success story?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Join the community and start building habits that actually stick.
            </p>
            <Link
              to="/Signup"
              className="inline-block px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white [font-family:'Sora',sans-serif] font-black text-sm rounded-full shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              Create your free account →
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

export default AllReviews;