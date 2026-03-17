/**
 * Google OAuth 2.0 routes for one-time "connect calendar" flow.
 * GET /api/auth/google — redirects to Google consent screen.
 * GET /api/auth/google/callback — exchanges code for tokens and shows refresh token to copy into .env.local.
 */

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.freebusy'
];

function getRedirectUri(req) {
  const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost:3000';
  return `${protocol}://${host}/api/auth/google/callback`;
}

function getOAuth2Client(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = getRedirectUri(req);
  if (!clientId || !clientSecret) return null;
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

/**
 * Register auth routes on the Express app.
 */
export function registerAuthRoutes(app) {
  // Start OAuth: redirect user to Google consent screen.
  app.get('/api/auth/google', (req, res) => {
    const oauth2Client = getOAuth2Client(req);
    if (!oauth2Client) {
      return res.status(500).send(
        '<p>Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local.</p>'
      );
    }
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Force consent so we get a refresh token every time.
    });
    res.redirect(authUrl);
  });

  // Callback: exchange code for tokens, show refresh token for user to copy to .env.local.
  app.get('/api/auth/google/callback', async (req, res) => {
    const { code, error } = req.query;
    if (error) {
      return res.status(400).send(
        `<p>Google denied access: ${error}</p><p><a href="/api/auth/google">Try again</a></p>`
      );
    }
    if (!code) {
      return res.status(400).send('<p>Missing authorization code. <a href="/api/auth/google">Start over</a>.</p>');
    }

    const oauth2Client = getOAuth2Client(req);
    if (!oauth2Client) {
      return res.status(500).send('<p>Google OAuth not configured.</p>');
    }

    try {
      const { tokens } = await oauth2Client.getToken(code);
      const refreshToken = tokens.refresh_token;

      if (!refreshToken) {
        return res.send(`
          <p>No refresh token was returned. You may have already authorized this app; revoke access at
          <a href="https://myaccount.google.com/permissions" target="_blank">Google Account permissions</a>
          and try <a href="/api/auth/google">connecting again</a> with prompt=consent.</p>
        `);
      }

      // Show success page with instructions to add refresh token to .env.local.
      res.send(`
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Calendar connected</title></head>
          <body style="font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem;">
            <h1>Calendar connected</h1>
            <p>Add this to your <code>.env.local</code> (and to Railway variables in production), then restart the server:</p>
            <pre style="background: #f4f4f4; padding: 1rem; overflow-x: auto; word-break: break-all;">GOOGLE_CALENDAR_REFRESH_TOKEN=${refreshToken}</pre>
            <p>Do not commit this value to git. After saving, visit <a href="/api/calendar/status">/api/calendar/status</a> to confirm the backend can read your calendar.</p>
            <p><a href="/">Back to portfolio</a></p>
          </body>
        </html>
      `);
    } catch (err) {
      console.error('Google OAuth callback error:', err.message);
      res.status(500).send(
        `<p>Failed to exchange code for tokens: ${err.message}</p><p><a href="/api/auth/google">Try again</a></p>`
      );
    }
  });
}
