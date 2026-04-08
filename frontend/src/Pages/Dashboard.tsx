import Sidebar from "../Components/Sidebar";
import { useState } from "react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-72">
       
      </div>
    </div>
  );
}

export default Dashboard;