import React from "react";
import { format, parseISO, isToday, isYesterday, isSameDay } from "date-fns";
import EntryCard from "./EntryCard";

function TimelineView({ entries, onEdit, onDelete }) {
  // Group entries by date
  const groupedEntries = React.useMemo(() => {
    const groups = {};

    entries.forEach((entry) => {
      if (!groups[entry.date]) {
        groups[entry.date] = [];
      }
      groups[entry.date].push(entry);
    });

    // Sort entries within each group by time
    Object.keys(groups).forEach((date) => {
      groups[date].sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
    });

    return groups;
  }, [entries]);

  const formatDateHeader = (dateStr) => {
    try {
      const date = parseISO(dateStr);

      if (isToday(date)) {
        return "Today";
      } else if (isYesterday(date)) {
        return "Yesterday";
      } else {
        return format(date, "EEEE, MMMM d, yyyy");
      }
    } catch {
      return dateStr;
    }
  };

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          No entries yet
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Start tracking your meals by clicking "Add Entry" above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((date) => (
        <div key={date}>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sticky top-20 bg-slate-50 dark:bg-slate-950 py-2 z-5">
            {formatDateHeader(date)}
          </h2>
          <div className="space-y-3">
            {groupedEntries[date].map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onEdit={() => onEdit(entry)}
                onDelete={() => onDelete(entry.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineView;
