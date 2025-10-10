import { storage } from '../utils/storage.js';

const connectDB = async () => {
  try {
    console.log(`✅ Using JSON file storage system`);
    console.log(`📊 Storage initialized - queries will be saved to farmers_data.json`);
    
    // Test storage by getting current queries
    const queries = storage.getQueries();
    console.log(`📈 Current stats: ${queries.length} total queries stored`);
    
    return true;
  } catch (error) {
    console.error('❌ Storage setup failed:', error);
    process.exit(1);
  }
};

export default connectDB;