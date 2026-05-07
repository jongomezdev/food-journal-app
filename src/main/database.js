const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const { v4: uuidv4 } = require('uuid');

class FoodJournalDatabase {
  constructor() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'food-journal.db');
    
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    this.initializeTables();
  }

  initializeTables() {
    // Create entries table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        meal_type TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create food_items table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS food_items (
        id TEXT PRIMARY KEY,
        entry_id TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
      );
    `);

    // Create indexes
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date DESC);
      CREATE INDEX IF NOT EXISTS idx_entries_datetime ON entries(date DESC, time DESC);
      CREATE INDEX IF NOT EXISTS idx_items_entry ON food_items(entry_id);
    `);
  }

  getAllEntries() {
    const entries = this.db.prepare(`
      SELECT * FROM entries
      ORDER BY date DESC, time DESC
    `).all();

    return entries.map(entry => ({
      ...entry,
      items: this.getItemsForEntry(entry.id)
    }));
  }

  getEntriesByDateRange(startDate, endDate) {
    const entries = this.db.prepare(`
      SELECT * FROM entries
      WHERE date BETWEEN ? AND ?
      ORDER BY date DESC, time DESC
    `).all(startDate, endDate);

    return entries.map(entry => ({
      ...entry,
      items: this.getItemsForEntry(entry.id)
    }));
  }

  getEntriesByMealType(mealType) {
    const entries = this.db.prepare(`
      SELECT * FROM entries
      WHERE meal_type = ?
      ORDER BY date DESC, time DESC
    `).all(mealType);

    return entries.map(entry => ({
      ...entry,
      items: this.getItemsForEntry(entry.id)
    }));
  }

  getItemsForEntry(entryId) {
    return this.db.prepare(`
      SELECT * FROM food_items
      WHERE entry_id = ?
      ORDER BY created_at ASC
    `).all(entryId);
  }

  addEntry(entry) {
    const id = uuidv4();
    
    const insertEntry = this.db.prepare(`
      INSERT INTO entries (id, date, time, meal_type, notes)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertItem = this.db.prepare(`
      INSERT INTO food_items (id, entry_id, description)
      VALUES (?, ?, ?)
    `);

    const transaction = this.db.transaction((entry) => {
      insertEntry.run(id, entry.date, entry.time, entry.meal_type, entry.notes || '');
      
      entry.items.forEach(item => {
        insertItem.run(uuidv4(), id, item.description);
      });
    });

    transaction(entry);

    return this.db.prepare('SELECT * FROM entries WHERE id = ?').get(id);
  }

  updateEntry(id, entry) {
    const updateEntry = this.db.prepare(`
      UPDATE entries
      SET date = ?, time = ?, meal_type = ?, notes = ?
      WHERE id = ?
    `);

    const deleteItems = this.db.prepare(`
      DELETE FROM food_items WHERE entry_id = ?
    `);

    const insertItem = this.db.prepare(`
      INSERT INTO food_items (id, entry_id, description)
      VALUES (?, ?, ?)
    `);

    const transaction = this.db.transaction((id, entry) => {
      updateEntry.run(entry.date, entry.time, entry.meal_type, entry.notes || '', id);
      deleteItems.run(id);
      
      entry.items.forEach(item => {
        insertItem.run(uuidv4(), id, item.description);
      });
    });

    transaction(id, entry);

    return this.db.prepare('SELECT * FROM entries WHERE id = ?').get(id);
  }

  deleteEntry(id) {
    const deleteEntry = this.db.prepare('DELETE FROM entries WHERE id = ?');
    const result = deleteEntry.run(id);
    return result.changes > 0;
  }

  close() {
    this.db.close();
  }
}

module.exports = FoodJournalDatabase;
