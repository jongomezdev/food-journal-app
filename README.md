# Food Journal

A sleek, modern food journal application built with Electron, React, and SQLite. Track your daily meals with a beautiful dark-mode interface and powerful local-first data storage.

![Food Journal App](https://img.shields.io/badge/Electron-34.3.0-47848F?style=flat&logo=electron)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css)

## Features

- ✅ **Timeline View** - Chronological display of food entries grouped by date
- ✅ **Meal Categorization** - Tag entries as breakfast, lunch, dinner, snack, or other
- ✅ **Smart Filtering** - Filter entries by meal type
- ✅ **Dark Mode** - Beautiful dark theme with system preference detection
- ✅ **Data Export** - Export your food journal as JSON or CSV
- ✅ **Local Storage** - SQLite database for fast, private, local-first data
- ✅ **Add/Edit/Delete** - Full CRUD operations for managing entries

## Screenshots

_Add screenshots here when available_

## Installation

### Prerequisites

- Node.js 16+ and npm
- macOS, Windows, or Linux

### Setup

```bash
# Clone the repository
git clone https://github.com/jongomezdev/food-journal-app.git
cd food-journal-app

# Install dependencies
npm install

# Rebuild native modules for Electron
npx electron-rebuild -f -w better-sqlite3

# Start the app in development mode
npm start
```

## Usage

### Adding an Entry

1. Click the **"Add Entry"** button in the top right
2. Fill in the date and time
3. Select a meal type (optional)
4. Add one or more food items
5. Add notes if desired
6. Click **"Add Entry"** to save

### Filtering Entries

Use the filter buttons at the top to view entries by meal type:

- All
- Breakfast
- Lunch
- Dinner
- Snack
- Other

### Exporting Data

1. Click the download icon in the header
2. Choose **JSON** or **CSV** format
3. Your data will be downloaded to your Downloads folder

### Dark Mode

Click the sun/moon icon in the header to toggle between light and dark mode. Your preference is saved automatically.

## Tech Stack

**Frontend:**

- React 18.3 - UI framework
- Tailwind CSS 3.x - Styling
- date-fns - Date formatting
- react-icons - Icon library

**Backend:**

- Electron 34.3 - Desktop app framework
- better-sqlite3 - Local SQLite database
- Node.js - Runtime

**Build Tools:**

- Electron Forge - Packaging and distribution
- Webpack 5 - Module bundling
- Babel - JavaScript transpilation

## Database Schema

```sql
-- Entries table
CREATE TABLE entries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  meal_type TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food items table
CREATE TABLE food_items (
  id TEXT PRIMARY KEY,
  entry_id TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
);
```

## Project Structure

```
electron-app/
├── src/
│   ├── main/
│   │   ├── main.js         # Electron main process
│   │   ├── database.js     # SQLite database management
│   │   └── preload.js      # IPC bridge
│   └── renderer/
│       ├── App.jsx         # Main React component
│       ├── index.jsx       # React entry point
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── TimelineView.jsx
│       │   ├── EntryCard.jsx
│       │   └── EntryForm.jsx
│       ├── services/
│       │   └── entryService.js
│       └── styles/
│           └── globals.css
├── forge.config.js         # Electron Forge configuration
├── webpack.*.config.js     # Webpack configurations
└── package.json
```

## Building for Production

```bash
# Package the app for your current platform
npm run package

# Create distributable installers
npm run make
```

The built app will be in the `out` directory.

## Data Location

Your food journal data is stored locally at:

- **macOS**: `~/Library/Application Support/food-journal/food-journal.db`
- **Windows**: `%APPDATA%/food-journal/food-journal.db`
- **Linux**: `~/.config/food-journal/food-journal.db`

## Future Enhancements

- [ ] Calendar view option
- [ ] Nutrition tracking (calories, macros)
- [ ] Photo attachments for meals
- [ ] Search functionality
- [ ] Cloud sync (Supabase/MongoDB integration)
- [ ] Recipe management
- [ ] Data visualization and analytics
- [ ] Multi-device sync

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Built by [jongomezdev](https://github.com/jongomezdev)

---

Made with ❤️ using Electron, React, and Tailwind CSS
