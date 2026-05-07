import React from "react";
import { HiMoon, HiSun, HiPlus, HiDownload } from "react-icons/hi";

function Header({
  darkMode,
  onToggleDarkMode,
  onAddEntry,
  onExport,
  mealFilter,
  onFilterChange,
}) {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Food Journal
          </h1>

          <div className="flex items-center gap-2">
            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Export data"
              >
                <HiDownload className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>

              {exportMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setExportMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-20">
                    <button
                      onClick={() => {
                        onExport("json");
                        setExportMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-t-lg"
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => {
                        onExport("csv");
                        setExportMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-b-lg"
                    >
                      Export CSV
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <HiSun className="w-5 h-5 text-amber-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Add Entry Button */}
            <button
              onClick={onAddEntry}
              className="btn-primary flex items-center gap-2"
            >
              <HiPlus className="w-5 h-5" />
              Add Entry
            </button>
          </div>
        </div>

        {/* Meal Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {["all", "breakfast", "lunch", "dinner", "snack", "other"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  mealFilter === filter
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
