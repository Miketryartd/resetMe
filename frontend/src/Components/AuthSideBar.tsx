import { Link } from "react-router";
import logo from "../images/logg.png";
import type { AuthSideBarProps } from "../Types/Interface";


function AuthSideBar({ variant = "signup" }: AuthSideBarProps) {
  const isSignin = variant === "signin";

  return (
    <div className="hidden md:flex w-2/5 bg-blue-500 flex-col justify-between p-10 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-600 opacity-15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-16 w-64 h-64 bg-blue-700 opacity-20 rounded-full blur-3xl pointer-events-none" />

      <Link to="/" className="[font-family:'Sora',sans-serif] font-black text-2xl text-white relative z-10 w-fit">
        <img src={logo } className="h-12 md:h-14 w-auto object-contain"/>reset<span className="text-green-300">Me</span>
      </Link>

      <div className="relative z-10">
        {!isSignin && (
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
            Free forever plan
          </div>
        )}
        <h2 className="[font-family:'Sora',sans-serif] text-3xl font-black text-white leading-tight mb-3">
          {isSignin ? (
            <>Welcome<br />back. </>
          ) : (
            <>Build habits that<br />actually stick.</>
          )}
        </h2>
        <p className="text-white/55 text-sm leading-relaxed">
          {isSignin
            ? "Your habits are waiting. Let's pick up where you left off."
            : "Join 50+ users already building better lives with AI-powered insights."}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
      {(isSignin
          ? [
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="orange" className="icon icon-tabler icons-tabler-filled icon-tabler-flame"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78" /></svg>), text: "Your streaks are still alive" },
              { icon: (<img className="h-7 w-7 object-cover" src={logo}/>), text: "New AI insights ready" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon text-green-400 icon-tabler icons-tabler-outline icon-tabler-progress"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /></svg>), text: "Progress report updated" },
            ]
          : [
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon text-purple-700 icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" /></svg>), text: "Smart habit dashboard" },
              { icon:(<img className="h-7 w-7 object-cover" src={logo}/>), text: "Personalized AI insights" },
              { icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon text-sky-300 icon-tabler icons-tabler-filled icon-tabler-shield-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z" /></svg>), text: "Secure & private, always" },
            ]
        ).map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">
              {icon}
            </div>
            <p className="text-white/70 text-sm font-medium">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthSideBar;