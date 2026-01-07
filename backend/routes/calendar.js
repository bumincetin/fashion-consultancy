import express from 'express';
import { getCalendarClient, getCalendarId } from '../config/googleCalendar.js';

const router = express.Router();
const calendarId = getCalendarId();

/**
 * GET /api/calendar/test
 * Test calendar connection and authentication
 */
router.get('/test', async (req, res) => {
  try {
    const calendar = getCalendarClient();
    
    // Try to get calendar metadata to test connection
    const response = await calendar.calendars.get({
      calendarId: 'primary'
    });
    
    res.json({
      success: true,
      message: 'Calendar connection successful',
      calendar: {
        id: response.data.id,
        summary: response.data.summary,
        timeZone: response.data.timeZone
      }
    });
  } catch (error) {
    console.error('Calendar test error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to connect to calendar',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        details: error.response?.data
      } : undefined
    });
  }
});

/**
 * POST /api/calendar/check-availability
 * Check if a time slot is available
 */
router.post('/check-availability', async (req, res) => {
  try {
    const { timeMin, timeMax } = req.body;

    if (!timeMin || !timeMax) {
      return res.status(400).json({
        available: false,
        message: 'timeMin and timeMax are required'
      });
    }

    // Ensure dates are in RFC3339 format with timezone
    // Google Calendar requires ISO 8601 format with timezone (e.g., 2024-12-20T14:00:00+01:00)
    let formattedTimeMin = timeMin.trim();
    let formattedTimeMax = timeMax.trim();
    
    // Helper to check if date has timezone
    const hasTimezone = (str) => {
      return str.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(str);
    };
    
    // If timezone is missing, add Europe/Rome timezone offset
    // For simplicity, use +01:00 (winter time) - adjust if needed for DST
    if (!hasTimezone(formattedTimeMin)) {
      // Validate the date format first
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(formattedTimeMin)) {
        return res.status(400).json({
          available: false,
          message: `Invalid timeMin format: "${formattedTimeMin}". Expected: 2024-12-20T14:00:00+01:00 or 2024-12-20T14:00:00`
        });
      }
      // Add Europe/Rome timezone (UTC+1 in winter, UTC+2 in summer)
      // For now, use +01:00 - you can make this dynamic based on date if needed
      formattedTimeMin += '+01:00';
    }
    
    if (!hasTimezone(formattedTimeMax)) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(formattedTimeMax)) {
        return res.status(400).json({
          available: false,
          message: `Invalid timeMax format: "${formattedTimeMax}". Expected: 2024-12-20T18:00:00+01:00 or 2024-12-20T18:00:00`
        });
      }
      formattedTimeMax += '+01:00';
    }

    console.log('Checking availability:', { 
      original: { timeMin, timeMax },
      formatted: { timeMin: formattedTimeMin, timeMax: formattedTimeMax },
      calendarId 
    });

    const calendar = getCalendarClient();

    // Use Freebusy API to check availability
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: formattedTimeMin,
        timeMax: formattedTimeMax,
        items: [{ id: calendarId }]
      }
    });

    const busy = response.data.calendars[calendarId]?.busy || [];
    const available = busy.length === 0;

    res.json({
      available,
      message: available 
        ? 'Time slot is available' 
        : 'Time slot is busy',
      busySlots: busy
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });
    
    // Provide more helpful error messages
    let errorMessage = 'Failed to check availability';
    let statusCode = 500;
    
    if (error.message?.includes('No Google Calendar authentication')) {
      errorMessage = 'Google Calendar not configured. Please complete OAuth setup (see SETUP.md)';
      statusCode = 500;
    } else if (error.message?.includes('Invalid grant') || error.message?.includes('Token expired') || error.code === 401) {
      errorMessage = 'OAuth token expired or invalid. Please re-authorize (visit /api/oauth/auth)';
      statusCode = 401;
    } else if (error.message?.includes('Calendar not found') || error.code === 404) {
      errorMessage = `Calendar not found: ${calendarId}. Please check GOOGLE_CALENDAR_ID in .env`;
      statusCode = 404;
    } else if (error.code === 400) {
      const googleError = error.response?.data?.error;
      errorMessage = googleError?.message || 'Bad request to Google Calendar API';
      if (googleError?.errors) {
        errorMessage += `. Details: ${JSON.stringify(googleError.errors)}`;
      }
      statusCode = 400;
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    res.status(statusCode).json({
      available: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        details: error.response?.data
      } : undefined
    });
  }
});

/**
 * POST /api/calendar/create-event
 * Create a calendar event
 */
router.post('/create-event', async (req, res) => {
  try {
    const { event } = req.body;

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'Event data is required'
      });
    }

    const calendar = getCalendarClient();

    const response = await calendar.events.insert({
      calendarId,
      sendUpdates: 'all', // Send email notifications to all attendees
      requestBody: {
        ...event,
        // Ensure timezone is set
        start: {
          ...event.start,
          timeZone: event.start.timeZone || 'Europe/Rome'
        },
        end: {
          ...event.end,
          timeZone: event.end.timeZone || 'Europe/Rome'
        }
      }
    });

    res.json({
      success: true,
      eventId: response.data.id,
      event: response.data,
      message: 'Event created successfully'
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create calendar event'
    });
  }
});

/**
 * POST /api/calendar/available-slots
 * Get available time slots for a given date
 */
router.post('/available-slots', async (req, res) => {
  try {
    const { date, duration, timeMin, timeMax } = req.body;

    if (!date || !duration) {
      return res.status(400).json({
        success: false,
        message: 'date and duration are required'
      });
    }

    const calendar = getCalendarClient();
    const startOfDay = timeMin || `${date}T09:00:00`;
    const endOfDay = timeMax || `${date}T18:00:00`;

    // Get busy slots for the day
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay,
        timeMax: endOfDay,
        items: [{ id: calendarId }]
      }
    });

    const busy = response.data.calendars[calendarId]?.busy || [];
    
    // Generate all possible time slots (every hour from 9 AM to 6 PM)
    const timeSlots = [];
    for (let hour = 9; hour <= 18; hour++) {
      const slotStart = `${date}T${hour.toString().padStart(2, '0')}:00:00`;
      const slotEnd = new Date(new Date(slotStart).getTime() + duration * 60000).toISOString();
      
      // Check if this slot conflicts with any busy time
      const isAvailable = !busy.some(busySlot => {
        const busyStart = new Date(busySlot.start);
        const busyEnd = new Date(busySlot.end);
        const slotStartDate = new Date(slotStart);
        const slotEndDate = new Date(slotEnd);
        
        // Check for overlap
        return (slotStartDate < busyEnd && slotEndDate > busyStart);
      });

      if (isAvailable) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    }

    res.json({
      success: true,
      timeSlots,
      date
    });
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get available time slots'
    });
  }
});

/**
 * PUT /api/calendar/update-event
 * Update an existing calendar event
 */
router.put('/update-event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { event } = req.body;

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'Event data is required'
      });
    }

    const calendar = getCalendarClient();

    const response = await calendar.events.update({
      calendarId,
      eventId,
      requestBody: {
        ...event,
        start: {
          ...event.start,
          timeZone: event.start.timeZone || 'Europe/Rome'
        },
        end: {
          ...event.end,
          timeZone: event.end.timeZone || 'Europe/Rome'
        }
      }
    });

    res.json({
      success: true,
      eventId: response.data.id,
      event: response.data,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating calendar event:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update calendar event'
    });
  }
});

/**
 * DELETE /api/calendar/delete-event/:eventId
 * Delete a calendar event
 */
router.delete('/delete-event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const calendar = getCalendarClient();

    await calendar.events.delete({
      calendarId,
      eventId
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete calendar event'
    });
  }
});

export { router as calendarRoutes };

