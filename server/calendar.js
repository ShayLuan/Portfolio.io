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
}
