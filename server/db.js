import pg from 'pg';

const { Pool } = pg;

const url = process.env.DATABASE_URL || '';
const useSSL = process.env.DATABASE_SSL !== 'false' && !/localhost|127\.0\.0\.1/.test(url);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

const initTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        text VARCHAR(300) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
};

export { pool, initTable };
