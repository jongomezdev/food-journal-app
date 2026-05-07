const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('./database');

// Declare mainWindow at module scope
let mainWindow;
let db;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundColor: '#0f172a', // slate-900 for dark mode
    titleBarStyle: 'hiddenInset',
  });

  // Load the index.html from a url in development or file in production
  if (MAIN_WINDOW_WEBPACK_ENTRY) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }

  // Open DevTools in development
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// Initialize database
app.whenReady().then(() => {
  db = new Database();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (db) {
      db.close();
    }
    app.quit();
  }
});

// Database IPC handlers
ipcMain.handle('db:getAllEntries', async () => {
  return db.getAllEntries();
});

ipcMain.handle('db:getEntriesByDateRange', async (event, startDate, endDate) => {
  return db.getEntriesByDateRange(startDate, endDate);
});

ipcMain.handle('db:getEntriesByMealType', async (event, mealType) => {
  return db.getEntriesByMealType(mealType);
});

ipcMain.handle('db:addEntry', async (event, entry) => {
  return db.addEntry(entry);
});

ipcMain.handle('db:updateEntry', async (event, id, entry) => {
  return db.updateEntry(id, entry);
});

ipcMain.handle('db:deleteEntry', async (event, id) => {
  return db.deleteEntry(id);
});

ipcMain.handle('db:exportData', async (event, format) => {
  const entries = db.getAllEntries();
  return { entries, format };
});
