import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import { initTable } from './db.js';
import reviewsRouter from './reviews.js';
import { getSystemPrompt } from './prompt.js';
import { registerChatRoutes } from './chat.js';
import { registerAuthRoutes } from './auth.js';
import { registerCalendarRoutes } from './calendar.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT ?? 3000;

// Parse JSON request bodies for all APIs.
app.use(express.json());

// Reviews API from main branch.
app.use('/api/reviews', reviewsRouter);

// Chat + auth + calendar APIs (must be before static and SPA fallback).
registerAuthRoutes(app);
registerCalendarRoutes(app);
registerChatRoutes(app);

// Static files (built React app).
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Start the server after ensuring the reviews table exists,
// and load the chat context once at startup.
getSystemPrompt();
console.log('Context loaded (content/agent-context.md).');

initTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to init DB:', err);
    process.exit(1);
  });
