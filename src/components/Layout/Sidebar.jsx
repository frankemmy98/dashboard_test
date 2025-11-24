import * as Icons from "lucide-react";
import { LogOut, Search } from "lucide-react";
import { menuItems } from "../../data/menuItems";

const Sidebar = ({ collapsed, currentPage, onPageChange }) => {
  return (
    <div
      className={`${collapsed ? "w-30" : "md:w-80 lg:w-90"}  
      md:h-1/2 px-6 md:px-8 py-4 md:py-10 transition-all duration-300 ease-in-out
      bg-white text-black dark:bg-black dark:text-white border-gray-400
      border-r dark:border-gray-700 backdrop-blur-xl flex flex-col relative z-10`}
    >
      {/* Logo */}
      <div className="md:pb-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/Logomark.svg" className="h-14 w-14" alt="logo" />
          {!collapsed && (
            <h1 className="font-logoFont text-2xl font-black ml-2">slothui</h1>
          )}
        </div>

        <button className="md:hidden text-gray-800 dark:text-gray-300">
          <Icons.Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Search */}
      {collapsed ? null : (
        <form className="hidden  md:flex justify-center">
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

      {/* Navigation */}
      <nav className="hidden md:block flex-1 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = Icons[item.icon];

          return (
            <button
              key={item.id}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition
              ${
                currentPage === item.id || item.active
                  ? "bg-gray-300 dark:bg-gray-800"
                  : "hover:bg-gray-300 dark:hover:bg-gray-800"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-6 h-6 text-brand1/50 dark:text-gray-400" />
                {!collapsed && <span className="font-bold">{item.label}</span>}
              </div>

              {!collapsed && item.count && (
                <span className="px-3 py-2 text-xs bg-brand1/10 dark:bg-gray-100 text-brand1 dark:text-black border border-brand1/20 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Subscription */}
      {collapsed ? null : (
        <div className="hidden md:flex flex-col rounded-3xl mt-10 mb-6 space-y-5 p-6 bg-brand4 dark:bg-gray-800">
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

      {/* Profile */}
      {!collapsed && (
        <div className="hidden md:flex pt-3 border-t border-gray-300 dark:border-gray-700">
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

            <LogOut className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
