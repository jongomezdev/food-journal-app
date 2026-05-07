import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TimelineView from "./components/TimelineView";
import EntryForm from "./components/EntryForm";
import entryService from "./services/entryService";

function App() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [mealFilter, setMealFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize dark mode
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Filter entries when filter changes
  useEffect(() => {
    if (mealFilter === "all") {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(
        (entry) => entry.meal_type === mealFilter,
      );
      setFilteredEntries(filtered);
    }
  }, [entries, mealFilter]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await entryService.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error("Failed to load entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (entryData) => {
    try {
      await entryService.addEntry(entryData);
      await loadEntries();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add entry:", error);
      alert("Failed to add entry. Please try again.");
    }
  };

  const handleUpdateEntry = async (id, entryData) => {
    try {
      await entryService.updateEntry(id, entryData);
      await loadEntries();
      setEditingEntry(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to update entry:", error);
      alert("Failed to update entry. Please try again.");
    }
  };

  const handleDeleteEntry = async (id) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        await entryService.deleteEntry(id);
        await loadEntries();
      } catch (error) {
        console.error("Failed to delete entry:", error);
        alert("Failed to delete entry. Please try again.");
      }
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleExport = async (format) => {
    try {
      const { entries } = await entryService.exportData(format);

      let content, filename, type;

      if (format === "json") {
        content = JSON.stringify(entries, null, 2);
        filename = `food-journal-${new Date().toISOString().split("T")[0]}.json`;
        type = "application/json";
      } else if (format === "csv") {
        // Convert to CSV
        const headers = ["Date", "Time", "Meal Type", "Food Items", "Notes"];
        const rows = entries.map((entry) => [
          entry.date,
          entry.time,
          entry.meal_type || "",
          entry.items.map((item) => item.description).join("; "),
          entry.notes || "",
        ]);

        const csv = [
          headers.join(","),
          ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        content = csv;
        filename = `food-journal-${new Date().toISOString().split("T")[0]}.csv`;
        type = "text/csv";
      }

      // Create download link
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      alert(`Exported ${entries.length} entries as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Failed to export data:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onAddEntry={() => {
          setEditingEntry(null);
          setIsFormOpen(true);
        }}
        onExport={handleExport}
        mealFilter={mealFilter}
        onFilterChange={setMealFilter}
      />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-slate-500 dark:text-slate-400">
              Loading entries...
            </div>
          </div>
        ) : (
          <TimelineView
            entries={filteredEntries}
            onEdit={handleEdit}
            onDelete={handleDeleteEntry}
          />
        )}
      </main>

      {isFormOpen && (
        <EntryForm
          entry={editingEntry}
          onSubmit={
            editingEntry
              ? (data) => handleUpdateEntry(editingEntry.id, data)
              : handleAddEntry
          }
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEntry(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
