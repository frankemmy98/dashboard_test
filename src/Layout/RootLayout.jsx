import React, { useEffect, useState } from "react";
import ThemeContextProvider from "../context/ThemeContextProvider";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

const RootLayout = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [collapsedSidebar, setCollapsedSidebar] = useState(
    window.innerWidth >= 768 // only for md+
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        // Only apply collapsedSidebar logic for md+ screens
        setCollapsedSidebar(window.innerWidth < 1280);
        setMobileMenuOpen(false); // close mobile menu if resizing up
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeContextProvider>
      <div className="h-screen overflow-hidden font-brandFont bg-white dark:bg-black dark:text-white overflow-x-hidden">
        <div className="flex flex-col md:flex-row h-full min-h-0">
          <Sidebar
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            collapsed={isMobile ? false : collapsedSidebar} // collapse only on md+
            mobileMenuOpen={mobileMenuOpen} // pass mobileMenuOpen for mobile popup
            setMobileMenuOpen={setMobileMenuOpen} // allow sidebar to toggle
          />
          <Outlet />
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default RootLayout;
