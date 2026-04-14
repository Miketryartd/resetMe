import { useState, useEffect } from "react";
import { Link } from "react-router";
import logo from "../images/logg.png";
import ImageCarousel from "../Components/ImageCarousel";
import ReviewSection from "../Components/ReviewSection";
import Reviews from "../Components/Reviews";

function HomePage() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white [font-family:'DM_Sans',sans-serif]">

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm py-3" : "bg-transparent py-5"}`}>
        <img src={logo} alt="resetMe" className="h-12 md:h-14 w-auto object-contain" />

        <nav className="hidden md:flex items-center gap-2">
          <a href="https://www.linkedin.com/in/michael-oliver-m-lea%C3%B1o-jr-42617938a/" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors duration-200">
            LinkedIn
          </a>
          <a href="https://github.com/Miketryartd" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors duration-200">
            Github
          </a>
          <Link to="/Signin" className="px-5 py-2.5 text-sm font-semibold text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition-all duration-200">
            Sign in
          </Link>
          <Link to="/Signup" className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-200">
            Get Started →
          </Link>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1" aria-label="Toggle menu">
          <span className={`block w-full h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-full h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-white flex flex-col gap-2 px-8 pb-8 pt-24 shadow-xl border-b border-gray-100 transition-all duration-300 md:hidden ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <a href="https://www.linkedin.com/in/michael-oliver-m-lea%C3%B1o-jr-42617938a/" onClick={() => setMenuOpen(false)} className="py-3.5 border-b border-gray-100 text-sm font-semibold text-gray-600">LinkedIn</a>
        <a href="https://github.com/Miketryartd" onClick={() => setMenuOpen(false)} className="py-3.5 border-b border-gray-100 text-sm font-semibold text-gray-600">Github</a>
        <Link to="/Signin" onClick={() => setMenuOpen(false)} className="py-3.5 border-b border-gray-100 text-sm font-semibold text-blue-500">Sign in</Link>
        <Link to="/Signup" onClick={() => setMenuOpen(false)} className="mt-3 text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-full transition-all duration-200">
          Get Started →
        </Link>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 pt-24 pb-16 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-500 opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-600 opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6">

          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-500 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            AI-Powered Habit Tracker
          </div>

          <h1 className="[font-family:'Sora',sans-serif] text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-gray-900 tracking-tight">
            Build habits that<br />
            <span className="text-blue-500">actually</span>{" "}
            <span className="text-green-600">stick.</span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            resetMe uses{" "}
            <span className="font-semibold text-gray-800">AI-driven insights</span>{" "}
            to track your habits, analyze your patterns, and tell you exactly what's working — and what isn't.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link to="/Signup" className="w-full sm:w-auto text-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white [font-family:'Sora',sans-serif] font-bold text-base rounded-full shadow-lg hover:-translate-y-1 transition-all duration-200">
              Start for free →
            </Link>
            <Link to="/Signin" className="w-full sm:w-auto text-center px-8 py-4 bg-white border border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-700 [font-family:'Sora',sans-serif] font-semibold text-base rounded-full hover:-translate-y-1 transition-all duration-200">
              Log in
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <div className="flex">
              {[
                { init: "JR", bg: "bg-blue-500" },
                { init: "MA", bg: "bg-green-600" },
                { init: "KL", bg: "bg-blue-400" },
                { init: "RP", bg: "bg-green-500" },
              ].map(({ init, bg }, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${bg} ${i > 0 ? "-ml-2" : ""}`}>
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-gray-700">50+ users</span> already growing with us
            </p>
          </div>
        </div>

        {/* Hero dashboard mockup */}
        <div className="relative z-10 mt-14 w-full max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-200">

     
            <div className="bg-blue-500 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <span className="ml-2 text-white/60 text-xs font-medium">resetMe — Dashboard</span>
            </div>

          
            <div className="bg-gray-50 flex">

          
              <div className="hidden sm:flex w-44 bg-blue-500 flex-col p-4 gap-3 min-h-[320px]">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold mb-2">E</div>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-white text-xs font-semibold">Overview</div>
                <div className="px-3 py-2 text-white/60 text-xs font-medium">AI Insights</div>
                <div className="px-3 py-2 text-white/60 text-xs font-medium">Calendar</div>
                <div className="px-3 py-2 text-white/60 text-xs font-medium">Statistics</div>
                <div className="mt-auto px-3 py-2 text-white/60 text-xs font-medium">Logout</div>
              </div>

              <div className="flex-1 p-4 flex flex-col gap-3">

             
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2.5">
                    <p className="text-white text-xs font-semibold">Add New Habit</p>
                    <p className="text-green-100 text-xs">Create a new habit to track</p>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-400">e.g., Meditation</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-400">e.g., Health</div>
                    <div className="col-span-2 flex justify-end">
                      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Add Habit</div>
                    </div>
                  </div>
                </div>

                
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2.5">
                    <p className="text-white text-xs font-semibold">My Habits</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      { name: "Workout", cat: "Health", kept: true },
                      { name: "Reading", cat: "Growth", kept: true },
                      { name: "Meditation", cat: "Wellness", kept: false },
                    ].map(({ name, cat, kept }) => (
                      <div key={name} className="flex items-center justify-between px-4 py-2">
                        <span className="text-xs font-medium text-gray-700">{name}</span>
                        <span className="text-xs text-gray-400">{cat}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kept ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {kept ? "Kept" : "Missed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

   
          <div className="hidden sm:flex absolute -left-6 top-[20%] bg-white rounded-2xl px-4 py-2.5 shadow-lg items-center gap-2 text-sm font-semibold text-green-600 whitespace-nowrap border border-green-100">
            <span className="text-base">📉</span> Lower Cortisol Levels
          </div>
          <div className="hidden sm:flex absolute -right-6 bottom-[20%] bg-white rounded-2xl px-4 py-2.5 shadow-lg items-center gap-2 text-sm font-semibold text-blue-500 whitespace-nowrap border border-blue-100">
            <span className="text-base">🤖</span> New AI insight ready
          </div>
          <div className="hidden md:flex absolute -right-4 top-[20%] bg-white rounded-2xl px-4 py-2.5 shadow-lg items-center gap-2 text-sm font-semibold text-orange-500 whitespace-nowrap border border-orange-100">
            <span className="text-base">🔥</span> 14-day streak!
          </div>
        </div>
      </section>


      <section className="bg-blue-500 py-10 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "50+", label: "Active Users" },
            { val: "1,200+", label: "Habits Tracked" },
            { val: "87%", label: "Avg. Consistency" },
            { val: "4.9★", label: "User Rating" },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="[font-family:'Sora',sans-serif] text-3xl font-black text-white">{val}</p>
              <p className="text-white/60 text-sm mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">Why resetMe</span>
            <h2 className="[font-family:'Sora',sans-serif] text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Everything you need to level up
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Smart Dashboard", desc: "See all your habits, streaks, and scores in one clean view. No clutter, just clarity.", color: "bg-blue-50 border-blue-200" },
              { icon: "🤖", title: "AI Insights", desc: "Get personalized recommendations based on your actual behavior patterns — not generic advice.", color: "bg-green-50 border-green-200" },
              { icon: "🔥", title: "Streak Tracking", desc: "Stay consistent with daily streak counters that make building habits feel like a game.", color: "bg-orange-50 border-orange-100" },
              { icon: "📅", title: "Habit Scheduling", desc: "Set start and end dates, categories, and goals for every habit you want to build.", color: "bg-blue-50 border-blue-200" },
              { icon: "📈", title: "Progress Reports", desc: "Weekly summaries that show where you're improving and where you're falling short.", color: "bg-green-50 border-green-200" },
              { icon: "🔒", title: "Secure & Private", desc: "Your data stays yours. End-to-end encrypted, never sold, never shared with anyone.", color: "bg-blue-50 border-blue-200" },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className={`${color} border rounded-2xl p-6`}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="[font-family:'Sora',sans-serif] text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageCarousel />

      {/* CTA BANNER */}
      <section className="bg-green-600 py-16 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="[font-family:'Sora',sans-serif] text-3xl md:text-4xl font-black text-white mb-4">
            Ready to reset your habits?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join 50+ users already building better lives with resetMe.
          </p>
          <Link to="/Signup" className="inline-block px-10 py-4 bg-white text-green-700 [font-family:'Sora',sans-serif] font-black text-base rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
            Create your free account →
          </Link>
        </div>
      </section>

      <div className="flex flex-col">
        <Reviews />
        <ReviewSection />
      </div>

    </div>
  );
}

export default HomePage;