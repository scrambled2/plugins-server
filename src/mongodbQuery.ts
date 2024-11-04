import { Router, Request, Response } from 'express';
import { connectToDatabase } from './mongodbClient';
import { logger } from '@/server';

const router = Router();

router.post('/query', async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(env.COLLECTION_NAME);
    const query = req.body.query || {};
    const projection = req.body.projection || {};
    const results = await collection.find(query).project(projection).toArray();
    res.json(results);
  } catch (error) {
    logger.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
