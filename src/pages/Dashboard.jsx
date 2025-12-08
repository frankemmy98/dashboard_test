import { useContext, useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { headerNav } from "../data/headerNav";
import { ThemeContext } from "../context/ThemeContextProvider";

import ByTotalTasks from "./DashboardSections/ByTotalTasks";
import ByStatus from "./DashboardSections/ByStatus";
import TasksCompleted from "./DashboardSections/TasksCompleted";
import TasksDue from "./DashboardSections/TasksDue";
import ExtraTasks from "./DashboardSections/ExtraTasks";
import { dashboardData as initialData } from "../data/dashboardData";

const Dashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Determine section based on URL
  const section = location.pathname.split("/")[2] || "by-total";

  // Live total count for "By Total Tasks"
  const [data, setData] = useState(
    initialData.map((col) => ({ ...col, count: col.cards.length }))
  );
  const totalColumnCount = useMemo(
    () => data.reduce((sum, col) => sum + col.cards.length, 0),
    [data]
  );

  const renderContent = () => {
    switch (section) {
      case "by-status":
        return <ByStatus />;
      case "by-total":
        return <ByTotalTasks data={data} setData={setData} />;
      case "tasks-due":
        return <TasksDue />;
      case "extra-tasks":
        return <ExtraTasks />;
      case "tasks-completed":
        return <TasksCompleted />;
      default:
        return <ByTotalTasks data={data} setData={setData} />;
    }
  };

  return (
    <div className="md:flex-1 md:flex md:flex-col md:overflow-hidden">
      {/* Header */}
      <div className="flex flex-col bg-brand4 dark:bg-gray-900 backdrop-blur-xl space-y-9 px-8 pt-6 border-b border-gray-400 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">
            Kanban Dashboard 🃏
          </h1>

          <div className="flex items-center max-w-md space-x-3">
            <Icons.Search className="text-gray-700 dark:text-gray-300" />
            <button className="flex space-x-2 bg-brand1 text-white font-bold px-5 py-3 rounded-full hover:bg-brand1/80 transition">
              <p>Share</p>
              <Icons.Share2 />
            </button>
            <div className="w-10 h-10 p-2 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
              <Icons.HardDriveUpload className="text-gray-700 dark:text-gray-300" />
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
              <Icons.Plus className="text-gray-700 dark:text-gray-300" />
            </div>
            <button
              className="hidden md:block p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Icons.Moon className="w-5 h-5" />
              ) : (
                <Icons.Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Header Nav */}
        <nav className="flex flex-wrap space-x-6 mt-4">
          {headerNav.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center pb-1 md:pb-2 font-bold border-b-4 ${
                  isActive
                    ? "border-brand1 text-black dark:text-white font-black"
                    : "border-transparent text-gray-600 dark:text-gray-300"
                }`
              }
            >
              {item.label}

              {/* Only "By Total Tasks" shows live total */}
              {item.id === "By Total Tasks" && (
                <span className="px-2.5 py-1.5 ml-2 text-xs bg-brand1/10 dark:bg-white border border-brand1/30 text-brand1 dark:text-black font-bold rounded-full">
                  {totalColumnCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
