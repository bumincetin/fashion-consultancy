import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize Google Calendar API client
 * Supports OAuth2 authentication with refresh token
 */
export function getCalendarClient() {
  // Try OAuth2 first (for user calendar access)
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/oauth/callback'
    );

        // Set refresh token if available
        if (process.env.GOOGLE_REFRESH_TOKEN) {
          oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
          });
        } else {
          throw new Error('GOOGLE_REFRESH_TOKEN not found in environment variables. Please complete OAuth setup.');
        }

        return google.calendar({ version: 'v3', auth: oauth2Client });
  }

  // Try loading from client_secret.json file
  const clientSecretPath = path.join(__dirname, 'client_secret.json');
  if (fs.existsSync(clientSecretPath)) {
    try {
      const credentials = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8'));
      const { client_id, client_secret } = credentials.web || credentials.installed || {};
      
      if (client_id && client_secret) {
        const oauth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/oauth/callback'
        );

        // Set refresh token if available
        if (process.env.GOOGLE_REFRESH_TOKEN) {
          oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
          });
        } else {
          throw new Error('GOOGLE_REFRESH_TOKEN not found in environment variables. Please complete OAuth setup.');
        }

        return google.calendar({ version: 'v3', auth: oauth2Client });
      }
    } catch (error) {
      console.error('Error loading client secret file:', error);
    }
  }

  // Fallback to service account if configured
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || './config/service-account-key.json',
      credentials: process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS 
        ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)
        : undefined,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ],
    });

    return google.calendar({ version: 'v3', auth });
  }

  throw new Error('No Google Calendar authentication configured. Please set up OAuth2 credentials or service account.');
}

/**
 * Get the calendar ID
 */
export function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'gulizarermis20@gmail.com';
}

