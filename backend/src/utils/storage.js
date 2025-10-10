import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'farmers_data.json');

// Initialize empty data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ queries: [], users: [] }, null, 2));
}

export const storage = {
  // Save query to storage
  saveQuery: (queryData) => {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      data.queries.push({
        id: Date.now(),
        ...queryData,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  // Get all queries (for demo purposes)
  getQueries: () => {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      return data.queries;
    } catch (error) {
      return [];
    }
  }
};
