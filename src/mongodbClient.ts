import { MongoClient, Db } from 'mongodb';
import { env } from '@/common/utils/envConfig';
import { logger } from '@/server';

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  try {
    const client = new MongoClient(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(env.DATABASE_NAME);
    logger.info('Connected to MongoDB');
    return db;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};
