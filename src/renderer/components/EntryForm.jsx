import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { HiX, HiPlus, HiTrash } from "react-icons/hi";

function EntryForm({ entry, onSubmit, onCancel }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mealType, setMealType] = useState("");
  const [items, setItems] = useState([""]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (entry) {
      setDate(entry.date);
      setTime(entry.time);
      setMealType(entry.meal_type || "");
      setItems(entry.items.map((item) => item.description));
      setNotes(entry.notes || "");
    } else {
      // Set defaults for new entry
      const now = new Date();
      setDate(format(now, "yyyy-MM-dd"));
      setTime(format(now, "HH:mm"));
      setMealType("");
      setItems([""]);
      setNotes("");
    }
  }, [entry]);

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!date || !time) {
      alert("Please enter a date and time");
      return;
    }

    const validItems = items.filter((item) => item.trim() !== "");
    if (validItems.length === 0) {
      alert("Please add at least one food item");
      return;
    }

    const entryData = {
      date,
      time,
      meal_type: mealType || null,
      notes: notes.trim(),
      items: validItems.map((description) => ({
        description: description.trim(),
      })),
    };

    onSubmit(entryData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {entry ? "Edit Entry" : "New Entry"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HiX className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Meal Type (optional)
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="input-field"
            >
              <option value="">Select meal type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Food Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Food Items
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <HiPlus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="e.g., Halloumi cheese, Arugula, tomato..."
                    className="input-field"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <HiTrash className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} className="btn-primary">
            {entry ? "Update Entry" : "Add Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
