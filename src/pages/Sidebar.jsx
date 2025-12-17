import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { LogOut, Search } from "lucide-react";
import { menuItems } from "../data/menuItems";
import { NavLink, Link } from "react-router-dom";

const Sidebar = ({ collapsed, currentPage, onPageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme toggle
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  // Sync state with screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Force expand sidebar if screen is small
      if (width > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call once to set initial state correctly
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* MAIN SIDEBAR (DESKTOP) */}
      <div
        className={`${
          collapsed ? "w-30" : "md:w-80 lg:w-90 2xl:w-100"
        } shrink-0 min-h-0 overflow-y-auto scrollbar-none border-b py-4 px-6 md:px-8 md:py-10 transition-all duration-300 ease-in-out
        bg-white text-black dark:bg-black dark:text-white border-gray-400
        border-r dark:border-gray-700 backdrop-blur-xl flex flex-col relative z-10`}
      >
        {/* Logo */}
        <div className="md:pb-6 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center">
              <img
                src="/images/Logomark.svg"
                className="h-14 w-14"
                alt="brand-logo"
              />
              {!collapsed && (
                <h1 className="font-logoFont text-2xl font-black ml-2 mb-2.5">
                  slothui
                </h1>
              )}
            </div>
          </Link>

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icons.Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Search (Desktop Only) */}
        {!collapsed && (
          <form className="hidden md:flex justify-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder:text-gray-600 dark:placeholder:text-gray-400"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-600 dark:text-gray-400" />
            </div>
          </form>
        )}

        {/* Navigation (Desktop Only) */}
        <nav className="hidden md:block flex-1 py-6 space-y-2 mt-5">
          {menuItems.map((item) => {
            const Icon = Icons[item.icon];

            return (
              <NavLink
                to={item.route}
                key={item.id}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition
                ${
                  currentPage === item.id || item.active
                    ? "bg-gray-300 dark:bg-gray-800"
                    : "hover:bg-gray-300 dark:hover:bg-gray-800"
                }
                `}
                onClick={() => onPageChange(item.id)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-6 h-6 text-brand1/50 dark:text-gray-400" />
                  {!collapsed && (
                    <span className="font-bold">{item.label}</span>
                  )}
                </div>

                {!collapsed && item.count && (
                  <span className="px-3 py-2 text-xs bg-brand1/10 dark:bg-gray-100 text-brand1 dark:text-black border border-brand1/20 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Subscription Card (Desktop Only) */}
        {!collapsed && (
          <div className="hidden md:flex flex-col rounded-3xl mb-6 space-y-5 p-6 bg-brand4 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <Icons.TriangleAlert className="text-gray-700 dark:text-gray-300" />
              </div>
              <Icons.X className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enjoy unlimited access with a small monthly price.
            </p>
            <div className="flex space-x-4 font-bold">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Dismiss
              </span>
              <span className="text-brand1 text-sm">Go Pro</span>
            </div>
          </div>
        )}

        {/* Profile (Desktop Only) */}
        {!collapsed && (
          <div className="hidden md:flex items-center justify-between pt-3 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-3 pt-3">
              <img
                src="/images/ProfileImg.svg"
                className="h-12 w-12"
                alt="profile"
              />

              <div className="flex-1">
                <p className="text-lg font-black text-gray-800 dark:text-white">
                  Azunyan U. Wu
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Basic Member
                </p>
              </div>
            </div>
            <LogOut className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          </div>
        )}
      </div>

      {/* MOBILE POPUP MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
          {/* Popup Sidebar */}
          <div className="w-72 h-full bg-white dark:bg-black p-6 flex flex-col space-y-6 animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="self-end text-gray-600 dark:text-gray-300"
            >
              <Icons.X className="w-7 h-7" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 p-3 rounded-xl bg-gray-200 dark:bg-gray-800"
            >
              <Icons.Sun className="w-6 h-6 block dark:hidden" />
              <Icons.Moon className="w-6 h-6 hidden dark:block" />
              <span className="font-semibold">Toggle Theme</span>
            </button>

            {/* Mobile Navigation */}
            <nav className="space-y-3 overflow-y-auto flex-1">
              {menuItems.map((item) => {
                const Icon = Icons[item.icon];
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition
                      ${
                        currentPage === item.id
                          ? "bg-gray-300 dark:bg-gray-700"
                          : "hover:bg-gray-300 dark:hover:bg-gray-700"
                      }`}
                    onClick={() => {
                      onPageChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-6 h-6" />
                      <span className="font-bold">{item.label}</span>
                    </div>

                    {item.count && (
                      <span className="px-3 py-2 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Clicking outside closes popup */}
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
