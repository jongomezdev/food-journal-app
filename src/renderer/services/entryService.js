// Data service layer for database operations
const entryService = {
  async getAllEntries() {
    return await window.api.getAllEntries();
  },

  async getEntriesByDateRange(startDate, endDate) {
    return await window.api.getEntriesByDateRange(startDate, endDate);
  },

  async getEntriesByMealType(mealType) {
    return await window.api.getEntriesByMealType(mealType);
  },

  async addEntry(entry) {
    return await window.api.addEntry(entry);
  },

  async updateEntry(id, entry) {
    return await window.api.updateEntry(id, entry);
  },

  async deleteEntry(id) {
    return await window.api.deleteEntry(id);
  },

  async exportData(format) {
    return await window.api.exportData(format);
  },
};

export default entryService;
