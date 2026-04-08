
import type { StatisticsProps } from "../Utils/Interface";


function Statistics({ habits }: StatisticsProps) {

  const getTodayCompleted = () => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter(habit => {
      return habit.progress?.some(p => 
        p.date === today && p.kept === 'yes'
      );
    }).length;
  };

  const todayCompleted = getTodayCompleted();



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gradient-to-r from-sky-600 to-purple-700">
          <h2 className="text-xl font-semibold text-white">Statistics</h2>
          <p className="text-purple-100 text-sm mt-1">Your habit tracking insights</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {habits.length}
              </div>
              <div className="text-sm text-gray-600">Total Habits</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {todayCompleted}
              </div>
              <div className="text-sm text-gray-600">Completed Today</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {habits.length > 0 
                  ? Math.round((todayCompleted / habits.length) * 100) 
                  : 0}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Additional Stats */}
          {habits.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Most Consistent Habits</h3>
                <div className="space-y-2">
                  {habits.slice(0, 3).map((habit, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{habit.habit}</span>
                      <span className="text-sm font-medium text-green-600">
                        {habit.progress?.filter(p => p.kept === 'yes').length || 0} days
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Categories Breakdown</h3>
                <div className="space-y-2">
                  {Array.from(new Set(habits.map(h => h.category))).map((category, idx) => {
                    const count = habits.filter(h => h.category === category).length;
                    return (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{category || 'Uncategorized'}</span>
                        <span className="text-sm font-medium text-purple-600">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {habits.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No habits to display statistics yet.</p>
              <p className="text-sm text-gray-400 mt-1">Add some habits to see your progress!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;