import { useState } from "react";
import type { UserStat } from "../Utils/Interface";

interface UserCalendarProps {
  habits: UserStat[];  
}

function UserCalendar({ habits }: UserCalendarProps) {
  const [isLoading] = useState<boolean>(false); 

  const getWeekdayIndex = (dateStr: string) => {
    const date = new Date(dateStr);
    return (date.getDay() + 6) % 7; 
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const handlePreviousDate =  () => {
     setCurrentWeek(prev => prev - 1);
  };

  const handleCurrentDate = () => {
    setCurrentWeek(0);
  }

  const getStartOfWeek = () => {
    const today = new Date();
    const day = (today.getDay() + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - day + currentWeek * 7);
    monday.setHours(0,0,0,0);
    return monday;
  }

  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-5 m-2 flex-wrap">
        <button className="bg-gray-100 rounded-md shadow-md p-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 min-w-[100px]" onClick={handlePreviousDate}>Previous</button>
        <button className="bg-gray-100 rounded-md p-2 shadow-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 min-w-[100px]" onClick={handleCurrentDate}>Current</button>
      </div>

      <div className="flex justify-center items-center w-full mt-5 md:mt-10 px-2 sm:px-4 overflow-x-auto">
        <div className="w-full max-w-full md:max-w-5xl">
          <div className="overflow-x-auto shadow-xl/5 shadow-blue-500">
            <table className="border border-gray-400 border-collapse text-center w-full min-w-[600px] md:min-w-full">
              <thead className="bg-gray-100">
                <tr className="border border-gray-300">
                  <th className="border border-gray-300 px-1 sm:px-2 py-2 md:py-3 text-xs sm:text-sm md:text-base sticky left-0 bg-gray-100 z-10">Habit</th>
                  {weekDays.map((day) => (
                    <th key={day} className="border border-gray-300 px-1 sm:px-2 py-2 md:py-3 text-xs sm:text-sm md:text-base">{day}</th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-center">
                {habits.map((habit) => {
                  const weekProgress = new Array(7).fill("-");

                  habit.progress?.forEach((p) => {
                    const progressDate = new Date(p.date);
                    if (progressDate < startOfWeek || progressDate >= endOfWeek) return;
                    const dayIndex = getWeekdayIndex(p.date);
                    weekProgress[dayIndex] = p.kept === "yes" ? (
                      <div className="flex justify-center items-center w-full">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="icon text-green-500 mx-auto sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M20.707 6.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 1.414 -1.414l4.293 4.293l9.293 -9.293a1 1 0 0 1 1.414 0" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="icon text-red-500 mx-auto sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </div>
                    );
                  });

                  return (
                    <tr className="border border-gray-300" key={habit._id}>
                      <td className="border border-gray-300 px-1 sm:px-2 py-2 md:py-3 align-middle font-medium text-xs sm:text-sm md:text-base sticky left-0 bg-white z-10">
                        {habit.habit}
                      </td>
                      {weekProgress.map((status, idx) => (
                        <td key={idx} className="border border-gray-300 p-1 sm:p-2 align-middle">
                          {status}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {habits.length === 0 && (
                  <tr>
                    <td colSpan={8} className="border border-gray-300 p-4 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
                      No habits to display. Add some habits to see your calendar!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCalendar;