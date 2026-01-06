import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initialize Google Calendar API client
 * Supports both Service Account and OAuth2 authentication
 */
export function getCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    // If using service account, provide the key file path or credentials
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || './config/service-account-key.json',
    // Or provide credentials directly from environment variables
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

/**
 * Get the calendar ID
 */
export function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'gulizarermis20@gmail.com';
}

