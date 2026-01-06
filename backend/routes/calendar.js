import express from 'express';
import { getCalendarClient, getCalendarId } from '../config/googleCalendar.js';

const router = express.Router();
const calendarId = getCalendarId();

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

    const calendar = getCalendarClient();

    // Use Freebusy API to check availability
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
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
    res.status(500).json({
      available: false,
      message: error.message || 'Failed to check availability'
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

