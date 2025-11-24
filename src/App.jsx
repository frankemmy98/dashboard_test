import React, { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import ThemeContextProvider from "./context/ThemeContextProvider";

const App = () => {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <ThemeContextProvider>
      <div className="min-h-screen font-brandFont dark:bg-black dark:text-white overflow-x-hidden">
        <div className="flex flex-col md:flex-row">
          <Sidebar
            collapsed={collapsedSidebar}
            onToggle={() => setCollapsedSidebar(!collapsedSidebar)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <div className="md:flex-1 md:flex md:flex-col md:overflow-hidden">
            <Header
              collapsedSidebar={collapsedSidebar}
              onToggleSidebar={() => setCollapsedSidebar(!collapsedSidebar)}
            />
            <Dashboard />
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default App;
