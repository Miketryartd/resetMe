import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthSideBar from "../Components/AuthSideBar";

function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();

  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) { setError('Please enter your full name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/create`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();
      if (res.status === 409 || data?.message?.toLowerCase().includes('exist') || data?.error?.toLowerCase().includes('exist')) {
        setError('An account with this email already exists. Try signing in.'); return;
      }
      if (!res.ok) { setError(data?.message || data?.error || 'Something went wrong. Please try again.'); return; }
      nav('/Signin');
    } catch (err) {
      console.error("Error signing up", err);
      setError('Could not connect to the server. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex w-full h-screen [font-family:'DM_Sans',sans-serif]">
      <AuthSideBar variant="signup" />

      <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16 overflow-y-auto">
        <div className="w-full max-w-md py-10">

          <div className="mb-8">
            <h1 className="[font-family:'Sora',sans-serif] text-3xl font-black text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm">You're one step away from building better habits!</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <span className="mt-0.5 text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={createAccount} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} required type="text" placeholder="Michael Oliver M."
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" placeholder="juan@example.com"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} required type="password" placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200" />
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 1 ? 'bg-red-400' : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 4 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 6 ? 'bg-green-600' : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 10 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {password.length < 4 ? 'Weak' : password.length < 6 ? 'Fair' : password.length < 10 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white [font-family:'Sora',sans-serif] font-bold text-sm rounded-lg shadow-md transition-all duration-200 cursor-pointer">
              {loading ? 'Creating account...' : 'Create account →'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <Link to="/Signin" className="text-center py-3 border border-blue-500 text-blue-500 [font-family:'Sora',sans-serif] font-bold text-sm rounded-lg hover:bg-blue-50 transition-all duration-200">
              Sign in instead
            </Link>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link className="text-blue-500 font-semibold hover:underline" to="/Signin">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;