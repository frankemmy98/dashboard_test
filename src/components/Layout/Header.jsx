import { useRef, useEffect, useState, useContext } from "react";
import * as Icons from "lucide-react";
import {
  HardDriveUpload,
  Menu,
  Moon,
  Plus,
  Search,
  Share2,
  Sun,
} from "lucide-react";
import { headerNav } from "../../data/headerNav";
import { ThemeContext } from "../../context/ThemeContextProvider";

const Header = ({ collapsedSidebar, onToggleSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [activeIndex, setActiveIndex] = useState(
    headerNav.findIndex((section) => section.active) || 0
  );
  const activeButtonRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (activeButtonRef.current) {
      const { offsetLeft, offsetWidth } = activeButtonRef.current;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col bg-brand4 dark:bg-gray-900 backdrop-blur-xl space-y-9 px-8 pt-6 border-b border-gray-400 dark:border-gray-700">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
        {/* Left */}
        <div className="flex items-center space-x-4">
          {/* Menu Icon */}
          {/* <button className="hidden md:block rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
            <Menu className="w-5 h-5" onClick={onToggleSidebar} />
          </button> */}

          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">
              Kanban Dashboard 🃏
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center max-w-md space-x-3">
          <Search className="text-gray-700 dark:text-gray-300" />

          <button className="flex space-x-2 bg-brand1 text-white font-bold px-5 py-3 rounded-full hover:bg-brand1/80 transition">
            <p>Share</p>
            <Share2 />
          </button>

          <div className="w-10 h-10 p-2 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
            <HardDriveUpload className="text-gray-700 dark:text-gray-300" />
          </div>

          <div className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
            <Plus className="text-gray-700 dark:text-gray-300" />
          </div>

          {/* Theme Toggle (Icon switches correctly) */}
          {/* <button
            className="hidden md:block p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button> */}
        </div>
      </div>

      {/* Header Navigation */}
      <nav className="relative overflow-x-auto whitespace-nowrap flex items-center md:justify-between space-x-6 scrollbar-none mt-4">
        <div className="flex space-x-6">
          {headerNav.map((section, idx) => (
            <button
              key={section.id}
              className="relative flex items-center pb-1 md:pb-2"
              ref={idx === activeIndex ? activeButtonRef : null}
              onClick={() => setActiveIndex(idx)}
            >
              <h3 className="font-bold text-lg text-gray-600 dark:text-gray-300">
                {section.label}
              </h3>

              {section.count && (
                <span className="px-2.5 py-1.5 ml-2 text-xs bg-brand1/10 dark:bg-white border border-brand1/30 text-brand1 dark:text-black font-bold rounded-full">
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2 ml-4 pb-1">
          <span className="font-bold">Sort By</span>
          <span className="flex space-x-1 border rounded-full border-gray-400 dark:border-gray-700 text-gray-500 dark:text-gray-300 px-2.5 py-1 font-bold">
            <p>Newest</p>
            <Icons.ChevronDown />
          </span>
        </div>

        {/* Indicator */}
        {activeButtonRef.current && (
          <span
            className="absolute bottom-0 h-[3px] bg-brand1 transition-all duration-200"
            style={indicatorStyle}
          ></span>
        )}
      </nav>
    </div>
  );
};

export default Header;
