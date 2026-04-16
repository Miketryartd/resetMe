import { useState, useEffect } from "react";
import type { UserStat } from "../Types/Interface";
import RenderedHabits from "../Components/RenderedHabits";
import UserCalendar from "../Components/UserCalendar";
import Sidebar from "../Components/Sidebar"; 
import Statistics from "../Components/Statistics";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<UserStat>({
    habit: "", category: "", kept: undefined,
    startDate: "", endDate: "", notes: "", goal: "", progress: []
  });
  const [habits, setHabits] = useState<UserStat[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAdd = async () => {
    if (!formData.habit) return;
    setIsSubmitting(true);
    setHabits([...habits, formData]);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("User is not logged in");
      const res = await fetch(`http://localhost:3000/api/user/stat/habits`, {
        method: "POST",
        headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Server saved", data);
      setFormData({ habit: "", category: "", kept: undefined, startDate: "", endDate: "", notes: "", goal: "", progress: [] });
    } catch (error) {
      console.error('Something went wrong', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) return alert("user not logged in");
      const res = await fetch(`http://localhost:3000/api/user/stat/me/habits`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHabits(); }, []);
  const refreshedHabits = () => fetchHabits();

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 min-w-0">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-700">
                <h2 className="text-xl font-semibold text-white">Add New Habit</h2>
                <p className="text-green-100 text-sm mt-1">Create a new habit to track</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
                    <input value={formData.habit} onChange={(e) => setFormData({...formData, habit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg  outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="text" placeholder="e.g., Meditation" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2  outline-none focus:ring-blue-500 focus:border-blue-500"
                      type="text" placeholder="e.g., Health" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2  outline-none focus:ring-blue-500 focus:border-blue-500"
                      type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2  outline-none focus:ring-blue-500 focus:border-blue-500"
                      type="date" />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                    <input value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      type="text" className="w-full p-3 border border-gray-300 rounded-lg  outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Meditate daily for 30 days" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleAdd} disabled={isSubmitting || !formData.habit}
                    className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all ${(isSubmitting || !formData.habit) && 'opacity-50 cursor-not-allowed'}`}>
                    {isSubmitting ? 'Adding...' : 'Add Habit'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <RenderedHabits habits={habits} onRefresh={refreshedHabits} />
          <UserCalendar habits={habits} />
          <Statistics habits={habits} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;