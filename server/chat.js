/**
 * Phase 4: First real chat — Anthropic API
 *
 * POST /api/chat
 * Body: { messages: [{ role: 'user' | 'assistant', content: string }] }
 * Returns: { content: string } or { error: string }
 */

import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from './prompt.js';

// Create the client lazily so process.env is already populated (dotenv runs in index.js after imports).
function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

const MODEL = 'claude-3-5-sonnet-latest';
const MAX_TOKENS = 1024;

/**
 * Convert our message format to Anthropic's. They want { role, content } with content as string.
 */
function toAnthropicMessages(messages) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : '' }));
}

export function registerChatRoutes(app) {
  app.post('/api/chat', async (req, res) => {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Chat not configured (missing ANTHROPIC_API_KEY).' });
    }

    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Request body must include messages array.' });
    }

    const anthropicMessages = toAnthropicMessages(messages);
    if (anthropicMessages.length === 0) {
      return res.status(400).json({ error: 'At least one user or assistant message required.' });
    }

    const systemPrompt = getSystemPrompt();

    try {
      const response = await getAnthropic().messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: anthropicMessages,
      });

      // response.content is an array of blocks (e.g. { type: 'text', text: '...' })
      const textBlock = response.content?.find((b) => b.type === 'text');
      const content = textBlock?.text ?? '';

      res.json({ content });
    } catch (err) {
      console.error('Anthropic API error:', err.message);
      res.status(500).json({
        error: err.message || 'Failed to get reply from assistant.',
      });
    }
  });
}
