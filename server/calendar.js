/**
 * Google Calendar API client. Uses GOOGLE_CALENDAR_REFRESH_TOKEN (and client id/secret)
 * to obtain access tokens and call the Calendar API. Used to verify "connect calendar"
 * and will later power chat tools (check_availability, create_calendar_event).
 */

import { google } from 'googleapis';

function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl.replace(/\/$/, '')}/api/auth/google/callback`;
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

/**
 * Returns a Calendar API client authenticated as the user who connected their calendar,
 * or null if credentials are not configured.
 */
export function getCalendarClient() {
  const auth = getOAuth2Client();
  if (!auth) return null;
  return google.calendar({ version: 'v3', auth });
}

/**
 * List events in a time range (ISO 8601 strings). Returns { events, error }.
 */
export async function listEvents(timeMin, timeMax, maxResults = 10) {
  const calendar = getCalendarClient();
  if (!calendar) {
    return { events: [], error: 'Calendar not connected (missing credentials).' };
  }
  try {
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return { events: data.items || [], error: null };
  } catch (err) {
    return { events: [], error: err.message || 'Failed to list events.' };
  }
}

/**
 * Find free slots between timeMin and timeMax that are at least durationMinutes long.
 * Returns { slots, error }, where slots is an array of { start, end } ISO strings.
 */
export async function findFreeSlots(timeMin, timeMax, durationMinutes = 30, maxSlots = 5) {
  const { events, error } = await listEvents(timeMin, timeMax, 100);
  if (error) return { slots: [], error };

  const start = new Date(timeMin);
  const end = new Date(timeMax);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return { slots: [], error: 'Invalid time range.' };
  }

  const busy = events
    .map((e) => {
      const s = new Date(e.start?.dateTime || e.start?.date || '');
      const eTime = new Date(e.end?.dateTime || e.end?.date || '');
      return { start: s, end: eTime };
    })
    .filter((b) => !Number.isNaN(b.start.getTime()) && !Number.isNaN(b.end.getTime()))
    .sort((a, b) => a.start - b.start);

  const slots = [];
  const minMs = durationMinutes * 60 * 1000;

  let cursor = new Date(start);
  for (const block of busy) {
    if (block.end <= cursor) continue;
    if (block.start > cursor && block.start - cursor >= minMs) {
      slots.push({
        start: cursor.toISOString(),
        end: new Date(cursor.getTime() + minMs).toISOString(),
      });
      if (slots.length >= maxSlots) return { slots, error: null };
    }
    if (block.end > cursor) {
      cursor = new Date(block.end);
      if (cursor >= end) break;
    }
  }

  if (end - cursor >= minMs && slots.length < maxSlots) {
    slots.push({
      start: cursor.toISOString(),
      end: new Date(cursor.getTime() + minMs).toISOString(),
    });
  }

  return { slots: slots.slice(0, maxSlots), error: null };
}

/**
 * Create a calendar event on the primary calendar. Returns { event, error } where
 * event contains summary, start, end, and htmlLink when available.
 */
export async function createCalendarEvent({ start, end, summary, attendeeEmail }) {
  const calendar = getCalendarClient();
  if (!calendar) {
    return { event: null, error: 'Calendar not connected (missing credentials).' };
  }

  try {
    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: summary || 'Interview',
        start: { dateTime: start },
        end: { dateTime: end },
        attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      },
      sendUpdates: 'all',
    });

    return {
      event: {
        id: data.id,
        summary: data.summary,
        start: data.start?.dateTime || data.start?.date,
        end: data.end?.dateTime || data.end?.date,
        htmlLink: data.htmlLink,
      },
      error: null,
    };
  } catch (err) {
    return { event: null, error: err.message || 'Failed to create event.' };
  }
}

/**
 * Register calendar API routes (e.g. status) on the Express app.
 */
export function registerCalendarRoutes(app) {
  app.get('/api/calendar/status', async (_req, res) => {
    const calendar = getCalendarClient();
    if (!calendar) {
      return res.json({
        connected: false,
        message: 'Calendar not connected. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALENDAR_REFRESH_TOKEN, or complete the flow at /api/auth/google.',
      });
    }

    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const { events, error } = await listEvents(now.toISOString(), nextWeek.toISOString(), 5);

    if (error) {
      return res.json({
        connected: false,
        message: 'Credentials present but API call failed.',
        error,
      });
    }

    const summary = events.map((e) => ({
      summary: e.summary || '(no title)',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
    }));

    res.json({
      connected: true,
      message: 'Calendar connected. Backend can read your calendar.',
      nextEvents: summary,
    });
  });

  // Simple debug endpoint: show a few free 30-minute slots in the next 7 days.
  app.get('/api/calendar/free-slots', async (_req, res) => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const { slots, error } = await findFreeSlots(now.toISOString(), nextWeek.toISOString(), 30, 5);

    if (error) {
      return res.status(500).json({ slots: [], error });
    }

    res.json({ slots });
  });
}
