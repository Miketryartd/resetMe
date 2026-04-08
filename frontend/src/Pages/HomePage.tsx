import { useState, useEffect } from "react";
import { Link } from "react-router";
import hero_img from "../images/logo.png";
import logo from "../images/logg.png";
import HomeFooter from "../Components/HomeFooter";
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
    <div className="bg-blue-50 min-h-screen overflow-x-hidden [font-family:'DM_Sans',sans-serif]">

   

   
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? "bg-slate-50/85 backdrop-blur-xl border-b border-stone-200/60 shadow-sm py-2"
            : "bg-transparent py-3"
        }`}
      >
        <img src={logo} alt="BrewSense" className="h-14 md:h-20 w-auto object-contain" />

   
        <nav className="hidden md:flex items-center gap-1">
          <a href="https://www.linkedin.com/in/michael-oliver-m-lea%C3%B1o-jr-42617938a/" className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-amber-600 transition-colors duration-200">
            LinkedIn
          </a>
          <a href="https://github.com/Miketryartd" className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-amber-600 transition-colors duration-200">
            Github
          </a>
          <Link
            to="/dashboard"
            className="ml-3 px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold tracking-wide rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-200"
            style={{ animation: "pulseGlow 2.4s ease-in-out infinite" }}
          >
            Get Started →
          </Link>
        </nav>

    
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-full h-0.5 bg-stone-700 rounded transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-full h-0.5 bg-stone-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-full h-0.5 bg-stone-700 rounded transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

 
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-orange-50/95 backdrop-blur-xl flex flex-col gap-2 px-8 pb-8 pt-24 shadow-xl transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <Link to="/faq" onClick={() => setMenuOpen(false)} className="py-3.5 border-b border-stone-200 text-sm font-bold tracking-widest uppercase text-stone-500">FAQ</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)} className="py-3.5 border-b border-stone-200 text-sm font-bold tracking-widest uppercase text-stone-500">About</Link>
        <Link
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
          className="mt-3 text-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm rounded-full shadow-md transition-all duration-200"
        >
          Get Started →
        </Link>
      </div>

 
      <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-2 items-center gap-10 px-6 sm:px-10 md:px-16 pt-28 md:pt-32 pb-12 overflow-hidden">

      
        <div className="absolute -top-20 -right-20 w-[80vw] md:w-[52vw] h-[80vw] md:h-[52vw] bg-amber-300 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-16 w-[60vw] md:w-[38vw] h-[60vw] md:h-[38vw] bg-orange-300 opacity-15 rounded-full blur-3xl pointer-events-none" />

  
        <div
          className="relative z-10 flex flex-col gap-5 items-center text-center md:items-start md:text-left"
          style={{ animation: "fadeUp 0.8s ease both" }}
        >
       
          <div className="flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-700 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <span>✦</span> AI-Powered habit tracker
          </div>

       
          <h1
            className="[font-family:'Playfair_Display',serif] text-5xl sm:text-6xl font-black leading-[1.06] text-stone-800 tracking-tight"
            style={{ animation: "fadeUp 0.8s 0.15s ease both" }}
          >
            Run Your Life<br />
            <span className="italic text-amber-500">Smarter,</span><br />
            Not Harder.
          </h1>

      
          <p
            className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md font-light"
            style={{ animation: "fadeUp 0.8s 0.3s ease both" }}
          >
            resetMe gives your life{" "}
            <span className="font-semibold text-stone-700">AI-driven insights</span>{" "}
            — know what habits, what's slowing, and exactly what to do next.
          </p>

        
          <div
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            style={{ animation: "fadeUp 0.8s 0.42s ease both" }}
          >
            <Link
              to="/dashboard"
              className="w-full sm:w-auto text-center px-7 py-3.5 bg-blue-800 hover:bg-blue-700 text-white font-bold text-base rounded-full shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              Change your life now
            </Link>
          
          </div>

      
          <div
            className="flex items-center gap-3"
            style={{ animation: "fadeUp 0.8s 0.52s ease both" }}
          >
            <div className="flex">
              {[
                { init: "JR", bg: "bg-orange-400" },
                { init: "MA", bg: "bg-blue-400" },
                { init: "KL", bg: "bg-green-500" },
              ].map(({ init, bg }, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-orange-50 flex items-center justify-center text-white text-xs font-bold ${bg} ${i > 0 ? "-ml-2" : ""}`}
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 text-left">
              <span className="font-semibold text-stone-600">50+ users</span><br className="sm:hidden" /> already growing with us
            </p>
          </div>
        </div>


        <div
          className="relative z-10 flex justify-center items-center w-full"
          style={{ animation: "fadeUp 0.8s 0.2s ease both" }}
        >
        
          <div
            className="relative rounded-3xl overflow-hidden h-120 shadow-2xl shadow-blue-300/70 w-full max-w-xs sm:max-w-sm md:max-w-lg bg-blue-50 transition-[transform] duration-500 hover:[transform:perspective(900px)_rotateY(-1deg)_rotateX(0deg)_translateY(-6px)]"
            style={{ transform: "perspective(900px) rotateY(-5deg) rotateX(2deg)" }}
          >
            <img src={hero_img} alt="BrewSense Dashboard" className="w-full h-auto block" />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 to-transparent pointer-events-none" />
          </div>

        
          <div
            className="hidden sm:flex absolute -left-4 md:-left-8 top-[14%] bg-white rounded-2xl px-3 md:px-4 py-2 md:py-2.5 shadow-lg items-center gap-2 text-xs md:text-sm font-semibold text-green-600 whitespace-nowrap border border-green-100"
            style={{ animation: "floatY 4s ease-in-out infinite" }}
          >
            <span>📉 </span>Lower Cortisol Levels
          </div>

      
          <div
            className="hidden sm:flex absolute -right-2 md:-right-6 bottom-[16%] bg-white rounded-2xl px-3 md:px-4 py-2 md:py-2.5 shadow-lg items-center gap-2 text-xs md:text-sm font-semibold text-stone-700 whitespace-nowrap border border-stone-100"
            style={{ animation: "floatY 5.5s 1.4s ease-in-out infinite" }}
          >
            <span>🤖</span> New AI insight ready
          </div>
        </div>



      

        
 
      </section>

      <ImageCarousel/>
  <div className="flex flex-col mt-20 ">
      

    <Reviews/>
       <ReviewSection/>
      <HomeFooter/>
      </div>

    </div>
  );
}

export default HomePage;