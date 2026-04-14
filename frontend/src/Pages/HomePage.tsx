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
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon text-green-400 icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" /></svg>), title: "Smart Dashboard", desc: "See all your habits, streaks, and scores in one clean view. No clutter, just clarity.", color: "bg-blue-50 border-blue-200" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler text-yellow-400 icons-tabler-filled icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 19a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /><path d="M3 11a5 5 0 0 0 5 -5c0 -1.333 2 -1.333 2 0a5 5 0 0 0 5 5c1.333 0 1.333 2 0 2a5 5 0 0 0 -5 5a1 1 0 0 1 -2 0a5 5 0 0 0 -5 -5c-1.333 0 -1.333 -2 0 -2" /><path d="M16 7a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /></svg>), title: "AI Insights", desc: "Get personalized recommendations based on your actual behavior patterns — not generic advice.", color: "bg-green-50 border-green-200" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler text-red-400 icons-tabler-filled icon-tabler-flame"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78" /></svg>), title: "Streak Tracking", desc: "Stay consistent with daily streak counters that make building habits feel like a game.", color: "bg-orange-50 border-orange-100" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler text-blue-400 icons-tabler-filled icon-tabler-calendar-event"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 8h-14v8.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16zm-9 4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z" /></svg>), title: "Habit Scheduling", desc: "Set start and end dates, categories, and goals for every habit you want to build.", color: "bg-blue-50 border-blue-200" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler text-purple-400 icons-tabler-filled icon-tabler-graph"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12zm-2.293 6.293a1 1 0 0 0 -1.414 0l-2.293 2.292l-1.293 -1.292a1 1 0 0 0 -1.414 0l-3 3a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.292l1.293 1.292a1 1 0 0 0 1.414 -1.414l-2 -2z" /></svg>), title: "Progress Reports", desc: "Weekly summaries that show where you're improving and where you're falling short.", color: "bg-green-50 border-green-200" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler text-orange-400 icons-tabler-filled icon-tabler-shield-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z" /></svg>), title: "Secure & Private", desc: "Your data stays yours. End-to-end encrypted, never sold, never shared with anyone.", color: "bg-blue-50 border-blue-200" },
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