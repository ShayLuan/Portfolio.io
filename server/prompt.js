/**
 * Phase 3: Context file and system prompt
 *
 * Reads content/agent-context.md and builds the system prompt for the chatbot.
 * The system prompt is sent to the LLM once per conversation (or with every
 * request in stateless chat) and tells the model who it is and what it can say.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTEXT_PATH = path.join(__dirname, '..', 'content', 'agent-context.md');

let cachedPrompt = null;

/**
 * Returns the full system prompt: instructions + context from agent-context.md.
 * Cached after first read so we don't hit the disk on every chat message.
 */
export function getSystemPrompt() {
  if (cachedPrompt !== null) return cachedPrompt;

  let contextContent = '';
  try {
    contextContent = fs.readFileSync(CONTEXT_PATH, 'utf8');
  } catch (err) {
    console.warn('Could not read content/agent-context.md:', err.message);
    contextContent = '(No context file found. Add content/agent-context.md with your CV summary and instructions.)';
  }

  const systemPrompt = `You are the portfolio assistant for the person who owns this site. Your job is to help recruiters and employers learn about them.

Use ONLY the following information to answer questions. Do not make up details, roles, or skills. If something isn't in the context, say you don't have that information and suggest they reach out directly.

If the user proposes an interview time or asks about scheduling, say you can help schedule it (scheduling will be available soon).

--- Context (from content/agent-context.md) ---

${contextContent}

--- End of context ---`;

  cachedPrompt = systemPrompt;
  return cachedPrompt;
}

/**
 * Clear the cached prompt (e.g. so the next request re-reads the file).
 * Useful if you edit agent-context.md and don't want to restart the server.
 */
export function clearPromptCache() {
  cachedPrompt = null;
}
