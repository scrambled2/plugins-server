const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(process.env.DATABASE_NAME);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  return db;
}

module.exports = { connectToDatabase };
