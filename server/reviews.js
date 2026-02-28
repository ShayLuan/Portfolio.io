import { Router } from 'express';
import { pool } from './db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, rating, text FROM reviews ORDER BY created_at DESC'
    );
    res.json(rows.map((r) => ({ ...r, id: String(r.id) })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/', async (req, res) => {
  const { name, rating, text } = req.body ?? {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedText = typeof text === 'string' ? text.trim() : '';
  const r = Number(rating);

  if (!trimmedName || !trimmedText || trimmedText.length > 300) {
    return res.status(400).json({ error: 'Invalid name or text' });
  }
  if (!Number.isInteger(r) || r < 1 || r > 5) {
    return res.status(400).json({ error: 'Rating must be 1–5' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO reviews (name, rating, text) VALUES ($1, $2, $3) RETURNING id, name, rating, text',
      [trimmedName, r, trimmedText]
    );
    const review = rows[0];
    res.status(201).json({ ...review, id: String(review.id) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
