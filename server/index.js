/**
 * Phase 1: Backend shell
 *
 * This file is the single Node process that:
 * 1. Serves your built React app (static files from dist/)
 * 2. Will later serve API routes (e.g. /api/chat) from this same process
 *
 * Why one process? On Railway you have one "service"; it runs one start command.
 * So the same server that hosts the site also handles API requests.
 */

import path from 'path';
import { fileURLToPath } from 'url';

// ESM doesn't have __dirname by default. This gives us the directory of this file
// so we can build paths like "dist/index.html" relative to the project root.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env and .env.local so process.env has PORT, etc. (optional for Phase 1, needed later)
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import express from 'express';

const app = express();

// Port: Railway sets PORT in production. Locally we default to 3000 so it doesn't clash with Vite (5173).
const PORT = process.env.PORT ?? 3000;

// --- Middleware ---

// Parse JSON request bodies. Needed when we add POST /api/chat (Phase 4).
// Without this, req.body would be undefined for JSON payloads.
app.use(express.json());

// --- Static files (your built React app) ---

// express.static serves files from a folder. Requests like GET /assets/index-xxx.js
// or GET /Portfolio.io.png are served from the dist/ folder.
// The build output is in dist/ because vite.config.js has outDir: 'dist'.
app.use(express.static(path.join(__dirname, '..', 'dist')));

// --- SPA fallback ---

// React Router uses client-side routes (e.g. /forgeeks). If someone visits
// https://yoursite.com/forgeeks directly or refreshes, the server gets GET /forgeeks.
// There is no file at dist/forgeeks, so we send dist/index.html and let the
// client router render the right page.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// --- Start the server ---

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
