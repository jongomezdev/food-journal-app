import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

function EntryCard({ entry, onEdit, onDelete }) {
  const getMealBadgeColor = (mealType) => {
    const colors = {
      breakfast:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      lunch: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      dinner:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      snack: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      other:
        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400",
    };

    return colors[mealType] || colors.other;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {entry.time}
          </div>
          {entry.meal_type && (
            <span
              className={`meal-badge ${getMealBadgeColor(entry.meal_type)}`}
            >
              {entry.meal_type}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit entry"
          >
            <HiPencil className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete entry"
          >
            <HiTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {entry.items &&
          entry.items.map((item) => (
            <div
              key={item.id}
              className="text-slate-700 dark:text-slate-300 flex items-start"
            >
              <span className="mr-2 text-slate-400">•</span>
              <span>{item.description}</span>
            </div>
          ))}
      </div>

      {entry.notes && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            {entry.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default EntryCard;
