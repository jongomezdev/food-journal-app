const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Database operations
  getAllEntries: () => ipcRenderer.invoke('db:getAllEntries'),
  getEntriesByDateRange: (startDate, endDate) => 
    ipcRenderer.invoke('db:getEntriesByDateRange', startDate, endDate),
  getEntriesByMealType: (mealType) => 
    ipcRenderer.invoke('db:getEntriesByMealType', mealType),
  addEntry: (entry) => ipcRenderer.invoke('db:addEntry', entry),
  updateEntry: (id, entry) => ipcRenderer.invoke('db:updateEntry', id, entry),
  deleteEntry: (id) => ipcRenderer.invoke('db:deleteEntry', id),
  exportData: (format) => ipcRenderer.invoke('db:exportData', format),
});
