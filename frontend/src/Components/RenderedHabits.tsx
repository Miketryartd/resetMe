import { useState } from "react";
import type { UserStat } from "../Types/Interface";
import { UserKept } from "../Types/Interface";

interface RenderedHabitsProps {
  habits: UserStat[];
  onRefresh: () => void;
}

function RenderedHabits({ habits, onRefresh }: RenderedHabitsProps) {
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const updateKept = async (index: number, value: UserKept) => {
    try {
      setUpdating(true);
      const token = sessionStorage.getItem("token");
      if (!token) return alert("User is not logged in");
      const habitId = habits[index]._id;
      const res = await fetch(`http://localhost:3000/api/user/stat/habits/progress/${habitId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ kept: value, date: new Date().toISOString().split("T")[0] })
      });
      if (res.ok) onRefresh();
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setUpdating(false);
    }
  };

  const updateNotes = async (index: number, value: string) => {
    try {
      setUpdating(true);
      const token = sessionStorage.getItem("token");
      if (!token) return alert("User is not logged in");
      const habitId = habits[index]._id;
      const res = await fetch(`http://localhost:3000/api/user/stat/habits/notes/${habitId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ notes: value })
      });
      if (res.ok) { onRefresh(); setEditingNote(null); }
    } catch (error) {
      console.error('Error updating notes', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700">
          <h2 className="text-xl font-semibold text-white">My Habits</h2>
          <p className="text-purple-100 text-sm mt-1">Track and manage your daily habits</p>
          {updating && <span className="ml-4 text-xs text-purple-200">Updating...</span>}
        </div>

        {/* DESKTOP TABLE  */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Habit', 'Category', 'Status', 'Start Date', 'End Date', 'Notes', 'Goal'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habits.map((habit, idx) => (
                <tr key={habit._id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{habit.habit || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {habit.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button onClick={() => updateKept(idx, UserKept.YES)} disabled={updating}
                        className={`cursor-pointer x-3 py-1 p-5 rounded-md text-xs font-medium transition-all ${habit.kept === UserKept.YES ? 'bg-green-500 text-white shadow-md' : 'bg-green-100 text-green-700 hover:bg-green-200'} disabled:opacity-50`}>
                        Kept
                      </button>
                      <button onClick={() => updateKept(idx, UserKept.NO)} disabled={updating}
                        className={`cursor-pointer px-3 py-1 rounded-md text-xs font-medium transition-all ${habit.kept === UserKept.NO ? 'bg-red-500 text-white shadow-md' : 'bg-red-100 text-red-700 hover:bg-red-200'} disabled:opacity-50`}>
                        Missed
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {habit.startDate ? new Date(habit.startDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {habit.endDate ? new Date(habit.endDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {editingNote === idx ? (
                      <input type="text" value={habit.notes || ''} onChange={(e) => updateNotes(idx, e.target.value)}
                        onBlur={() => setEditingNote(null)} onKeyPress={(e) => e.key === 'Enter' && setEditingNote(null)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" autoFocus disabled={updating} />
                    ) : (
                      <div onClick={() => !updating && setEditingNote(idx)} className="cursor-text p-2 hover:bg-gray-100 rounded-md transition-colors">
                        {habit.notes || <span className="text-gray-400">Add note...</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{habit.goal || '-'}</td>
                </tr>
              ))}
              {habits.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">No habits found. Start by adding some habits!</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS  */}
        <div className="md:hidden divide-y divide-gray-200">
          {habits.length === 0 && (
            <p className="px-6 py-12 text-center text-gray-500">No habits found. Start by adding some habits!</p>
          )}
          {habits.map((habit, idx) => (
            <div key={habit._id || idx} className="p-4 space-y-3">
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">#{idx + 1}</span>
                  <span className="text-sm font-semibold text-gray-900">{habit.habit || '-'}</span>
                </div>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {habit.category || 'Uncategorized'}
                </span>
              </div>

              {/* Dates */}
              <div className="flex gap-4 text-xs text-gray-500">
                <span>📅 Start: {habit.startDate ? new Date(habit.startDate).toLocaleDateString() : '-'}</span>
                <span>🏁 End: {habit.endDate ? new Date(habit.endDate).toLocaleDateString() : '-'}</span>
              </div>

              {/* Goal */}
              {habit.goal && (
                <p className="text-xs text-gray-500">🎯 <span className="font-medium">Goal:</span> {habit.goal}</p>
              )}

              {/* Notes */}
              <div>
                {editingNote === idx ? (
                  <input type="text" value={habit.notes || ''} onChange={(e) => updateNotes(idx, e.target.value)}
                    onBlur={() => setEditingNote(null)} onKeyPress={(e) => e.key === 'Enter' && setEditingNote(null)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500" autoFocus disabled={updating} />
                ) : (
                  <div onClick={() => !updating && setEditingNote(idx)}
                    className="text-xs text-gray-500 cursor-text p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    📝 {habit.notes || <span className="text-gray-400">Tap to add note...</span>}
                  </div>
                )}
              </div>

              {/* Status buttons */}
              <div className="flex gap-2">
                <button onClick={() => updateKept(idx, UserKept.YES)} disabled={updating}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${habit.kept === UserKept.YES ? 'bg-green-500 text-white shadow-md' : 'bg-green-100 text-green-700 hover:bg-green-200'} disabled:opacity-50`}>
                   Kept
                </button>
                <button onClick={() => updateKept(idx, UserKept.NO)} disabled={updating}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${habit.kept === UserKept.NO ? 'bg-red-500 text-white shadow-md' : 'bg-red-100 text-red-700 hover:bg-red-200'} disabled:opacity-50`}>
                   Missed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderedHabits;