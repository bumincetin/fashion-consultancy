# Google Calendar Integration Setup Guide

This guide explains how to set up the backend API endpoints required for Google Calendar integration with the booking system.

## Overview

The frontend booking modal uses Google Calendar API to:
1. Check availability for selected date/time slots
2. Create calendar events when bookings are confirmed

Since Google Calendar API requires authentication, these operations must be performed through backend API endpoints.

## Required Backend Endpoints

### 1. Check Availability Endpoint

**Endpoint:** `POST /api/calendar/check-availability`

**Request Body:**
```json
{
  "calendarId": "vestilizamilano@gmail.com",
  "timeMin": "2024-12-20T14:00:00",
  "timeMax": "2024-12-20T18:00:00"
}
```

**Response:**
```json
{
  "available": true,
  "message": "Time slot is available"
}
```

**Implementation Notes:**
- Use Google Calendar Freebusy API to check if the time slot is free
- Return `available: false` if there are any conflicts
- Handle timezone conversion (Europe/Rome)

### 2. Create Calendar Event Endpoint

**Endpoint:** `POST /api/calendar/create-event`

**Request Body:**
```json
{
  "calendarId": "vestilizamilano@gmail.com",
  "event": {
    "summary": "Luxury Shopping Tour - John Doe",
    "description": "Service: Luxury Shopping Tour\nClient: John Doe\nEmail: john@example.com\nDuration: 4 hours",
    "start": {
      "dateTime": "2024-12-20T14:00:00",
      "timeZone": "Europe/Rome"
    },
    "end": {
      "dateTime": "2024-12-20T18:00:00",
      "timeZone": "Europe/Rome"
    },
    "attendees": [
      {
        "email": "client@example.com",
        "displayName": "John Doe"
      }
    ],
    "reminders": {
      "useDefault": false,
      "overrides": [
        { "method": "email", "minutes": 1440 },
        { "method": "popup", "minutes": 60 }
      ]
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "abc123xyz",
  "message": "Event created successfully"
}
```

### 3. Get Available Time Slots (Optional)

**Endpoint:** `POST /api/calendar/available-slots`

**Request Body:**
```json
{
  "calendarId": "vestilizamilano@gmail.com",
  "date": "2024-12-20",
  "duration": 240,
  "timeMin": "2024-12-20T09:00:00",
  "timeMax": "2024-12-20T18:00:00"
}
```

**Response:**
```json
{
  "timeSlots": ["09:00", "10:00", "11:00", "14:00", "15:00"]
}
```

## Google Calendar API Setup

### Option 1: Service Account (Recommended for Production)

1. **Create a Service Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Calendar API
   - Create a Service Account
   - Download the JSON key file

2. **Share Calendar with Service Account:**
   - Open Google Calendar
   - Go to Settings → Settings for my calendars
   - Select the calendar (vestilizamilano@gmail.com)
   - Under "Share with specific people", add the service account email
   - Grant "Make changes to events" permission

3. **Backend Implementation (Node.js/Express example):**
```javascript
const { google } = require('googleapis');
const serviceAccount = require('./path-to-service-account-key.json');

const auth = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/calendar']
);

const calendar = google.calendar({ version: 'v3', auth });

// Check availability
app.post('/api/calendar/check-availability', async (req, res) => {
  try {
    const { calendarId, timeMin, timeMax } = req.body;
    
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }]
      }
    });
    
    const busy = response.data.calendars[calendarId].busy;
    const available = busy.length === 0;
    
    res.json({ available, message: available ? 'Time slot is available' : 'Time slot is busy' });
  } catch (error) {
    res.status(500).json({ available: false, message: error.message });
  }
});

// Create event
app.post('/api/calendar/create-event', async (req, res) => {
  try {
    const { calendarId, event } = req.body;
    
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event
    });
    
    res.json({ 
      success: true, 
      eventId: response.data.id,
      message: 'Event created successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

### Option 2: OAuth 2.0 (For User Authentication)

1. **Set up OAuth 2.0:**
   - Create OAuth 2.0 credentials in Google Cloud Console
   - Configure authorized redirect URIs
   - Use OAuth flow to get access tokens

2. **Store Refresh Token:**
   - Exchange authorization code for refresh token
   - Store refresh token securely
   - Use refresh token to get access tokens

## Environment Variables

Create a `.env` file in your backend:

```env
GOOGLE_CALENDAR_ID=vestilizamilano@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id
```

## Testing

1. **Test Availability Check:**
   - Select a date and time in the booking modal
   - Check browser console for API calls
   - Verify availability response

2. **Test Event Creation:**
   - Complete a booking
   - Check Google Calendar for the new event
   - Verify event details and attendees

## Security Considerations

1. **Never expose API keys in frontend code**
2. **Use HTTPS for all API endpoints**
3. **Validate and sanitize all input data**
4. **Implement rate limiting**
5. **Use environment variables for sensitive data**
6. **Implement proper error handling**

## Troubleshooting

### "Calendar not found" error
- Verify the calendar ID is correct
- Ensure the service account has access to the calendar

### "Insufficient permissions" error
- Check service account permissions
- Verify calendar sharing settings

### Events not appearing
- Check timezone settings (should be Europe/Rome)
- Verify event creation response
- Check calendar visibility settings

## Support

For issues or questions, refer to:
- [Google Calendar API Documentation](https://developers.google.com/calendar/api/v3/reference)
- [Google Calendar API Node.js Client](https://github.com/googleapis/google-api-nodejs-client)

