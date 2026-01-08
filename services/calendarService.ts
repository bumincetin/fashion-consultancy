/**
 * Google Calendar Service
 * Handles availability checking and event creation for gulizarermis20@gmail.com
 * 
 * NOTE: This service requires a backend API endpoint to securely handle Google Calendar API calls.
 * The backend should use service account credentials or OAuth2 to access the calendar.
 */

export interface TimeSlot {
  start: string; // ISO 8601 format
  end: string;   // ISO 8601 format
}

export interface AvailabilityCheck {
  date: string;      // YYYY-MM-DD
  time: string;      // HH:MM
  duration: number;  // Duration in minutes
}

export interface CalendarEvent {
  summary: string;
  description: string;
  start: string;     // ISO 8601 format
  end: string;       // ISO 8601 format
  attendeeEmail: string;
  attendeeName: string;
}

export interface ServiceDuration {
  shopping: number;   // 4 hours = 240 minutes
  wardrobe: number;   // 6 hours = 360 minutes
  cityTour: number;   // 8 hours = 480 minutes
  vip: number;        // 3-7 days, default to 1 day = 1440 minutes
  virtual: number;    // 60 minutes
}

// Service durations in minutes
export const SERVICE_DURATIONS: ServiceDuration = {
  shopping: 240,    // 4 hours
  wardrobe: 360,    // 6 hours
  cityTour: 480,    // 8 hours (full day)
  vip: 1440,        // 1 day (default, can be customized)
  virtual: 60       // 60 minutes
};

/**
 * Convert date and time strings to ISO 8601 format
 */
export function createDateTime(date: string, time: string): string {
  // date format: YYYY-MM-DD
  // time format: HH:MM
  return `${date}T${time}:00`;
}

/**
 * Add minutes to a datetime string
 */
export function addMinutes(datetime: string, minutes: number): string {
  const date = new Date(datetime);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

/**
 * Check if a time slot is available
 * This calls a backend API endpoint that uses Google Calendar Freebusy API
 */
export async function checkAvailability(
  date: string,
  time: string,
  duration: number
): Promise<{ available: boolean; message?: string }> {
  try {
    const startTime = createDateTime(date, time);
    const endTime = addMinutes(startTime, duration);

    // Call backend API endpoint
    // Use environment variable for production, fallback to deployed backend URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fashion-consultancy-backend-1078526273206.europe-west1.run.app';
    const response = await fetch(`${API_BASE_URL}/api/calendar/check-availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: startTime,
        timeMax: endTime,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to check availability');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking availability:', error);
    // For development, return available if API is not set up
    // In production, this should handle errors properly
    return {
      available: false,
      message: 'Unable to check availability. Please contact us directly.',
    };
  }
}

/**
 * Create a calendar event
 * This calls a backend API endpoint that uses Google Calendar API
 */
export async function createCalendarEvent(
  event: CalendarEvent
): Promise<{ success: boolean; eventId?: string; message?: string }> {
  try {
    // Call backend API endpoint
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fashion-consultancy-backend-1078526273206.europe-west1.run.app';
    const response = await fetch(`${API_BASE_URL}/api/calendar/create-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          summary: event.summary,
          description: event.description,
          start: {
            dateTime: event.start,
            timeZone: 'Europe/Rome',
          },
          end: {
            dateTime: event.end,
            timeZone: 'Europe/Rome',
          },
          attendees: [
            {
              email: 'vestilizamilano@gmail.com',
              displayName: 'Gülizar Ermiş',
              organizer: true,
            },
            {
              email: event.attendeeEmail,
              displayName: event.attendeeName,
            },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 }, // 1 day before
              { method: 'popup', minutes: 60 },       // 1 hour before
            ],
          },
          sendUpdates: 'all', // Send email notifications to attendees
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create calendar event');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      message: 'Failed to create calendar event. Please contact us directly.',
    };
  }
}

/**
 * Get available time slots for a given date
 * This can be used to show available times in a time picker
 */
export async function getAvailableTimeSlots(
  date: string,
  duration: number
): Promise<string[]> {
  try {
    // Get start and end of day in ISO format
    const dayStart = `${date}T09:00:00`; // 9 AM
    const dayEnd = `${date}T18:00:00`;   // 6 PM

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fashion-consultancy-backend-1078526273206.europe-west1.run.app';
    const response = await fetch(`${API_BASE_URL}/api/calendar/available-slots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        duration,
        timeMin: dayStart,
        timeMax: dayEnd,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get available time slots');
    }

    const data = await response.json();
    return data.timeSlots || [];
  } catch (error) {
    console.error('Error getting available time slots:', error);
    // Return default time slots for development
    return [
      '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00'
    ];
  }
}

