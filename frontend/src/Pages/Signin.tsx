import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthSideBar from "../Components/AuthSideBar";

function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/sign-in`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 404 || data?.message?.toLowerCase().includes("not found") || data?.error?.toLowerCase().includes("not found")) {
        setError("No account found with this email. Want to sign up?"); return;
      }
      if (res.status === 401 || data?.message?.toLowerCase().includes("password") || data?.error?.toLowerCase().includes("password")) {
        setError("Wrong password. Please try again."); return;
      }
      if (!res.ok) { setError(data?.message || data?.error || 'Something went wrong. Please try again.'); return; }
      sessionStorage.setItem('token', data.token);
      nav('/Dashboard');
    } catch (err) {
      console.error("Error signing in", err);
      setError('Could not connect to the server. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex w-full h-screen [font-family:'DM_Sans',sans-serif]">
      <AuthSideBar variant="signin" />

      <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16 overflow-y-auto">
        <div className="w-full max-w-md py-10">

          <div className="mb-8">
            <h1 className="[font-family:'Sora',sans-serif] text-3xl font-black text-gray-900 mb-2">Log in</h1>
            <p className="text-gray-500 text-sm">Good to see you again — let's get back to it.</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <span className="mt-0.5 text-base">⚠️</span>
              <div>
                <span>{error}</span>
                {error.includes('sign up') && (
                  <Link to="/Signup" className="ml-1 font-semibold underline text-blue-500">Sign up here</Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSignin} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" placeholder="michaeloliver@example.com"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200" />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                <a href="#" className="text-xs text-blue-500 font-semibold hover:underline">Forgot password?</a>
              </div>
              <input onChange={(e) => setPassword(e.target.value)} value={password} required type="password" placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200" />
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white [font-family:'Sora',sans-serif] font-bold text-sm rounded-lg shadow-md transition-all duration-200 cursor-pointer">
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <Link to="/Signup" className="text-center py-3 border border-blue-500 text-blue-500 [font-family:'Sora',sans-serif] font-bold text-sm rounded-lg hover:bg-blue-50 transition-all duration-200">
              Create a new account
            </Link>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link className="text-blue-500 font-semibold hover:underline" to="/Signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;