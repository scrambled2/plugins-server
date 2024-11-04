const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./mongodbClient');

router.post('/query', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const query = req.body.query || {};
    const projection = req.body.projection || {};
    const results = await collection.find(query).project(projection).toArray();
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
