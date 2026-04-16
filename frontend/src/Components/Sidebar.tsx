import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import type { User } from "../Types/Interface";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return alert("User is not logged in.");
        const res = await fetch(`http://localhost:3000/api/users/user/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching api', error);
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { path: '/Dashboard', icon: 'M4 6h16M4 12h16M4 18h16', label: 'Overview' },
    { path: '/AI-insights', icon: 'M15 5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M7 5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M7 19a1 1 0 1 0 2 0 1 1 0 0 0-2 0M16 12h.01M8 12h.01M16 19h.01', label: 'AI Insights' },
    {path: '/Add-Review', icon: 'M4 6h16M4 12h16M4 18h16', label: 'Share your thoughts' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`
      fixed left-0 top-0 h-screen w-72 z-30
      bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-2xl
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      <div className="flex flex-col h-full">

        {/* Close button — mobile  */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={onClose} className="p-2 rounded-lg text-blue-200 hover:bg-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-8 border-b border-blue-400">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-blue-400 flex items-center justify-center mb-4 shadow-lg ring-4 ring-gray-700">
              <span className="text-4xl font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{user?.username || 'User'}</h3>
            <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'text-gray-300 hover:bg-blue-700 hover:text-white'
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {item.icon.split(' ').map((d, i) => (
                  <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                ))}
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-400 space-y-2">
          <button onClick={() => { sessionStorage.removeItem("token"); nav('/'); }}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;