import express from 'express';
import { getCalendarClient, getCalendarId } from '../config/googleCalendar.js';

const router = express.Router();
const calendarId = getCalendarId();

// In-memory storage for bookings (replace with database in production)
const bookings = new Map();

/**
 * GET /api/booking/respond
 * Handle booking response (accept/reject/request-change)
 * This is called when Gülizar clicks the action links in her email
 */
router.get('/respond', async (req, res) => {
  try {
    const { bookingId, action, message } = req.query;

    if (!bookingId || !action) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1>Invalid Request</h1>
            <p>Booking ID and action are required.</p>
          </body>
        </html>
      `);
    }

    if (!['accept', 'reject', 'request-change'].includes(action)) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1>Invalid Action</h1>
            <p>Action must be: accept, reject, or request-change</p>
          </body>
        </html>
      `);
    }

    // Get booking from storage (in production, use database)
    const booking = bookings.get(bookingId);

    if (!booking) {
      return res.status(404).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1>Booking Not Found</h1>
            <p>The booking with ID ${bookingId} was not found.</p>
          </body>
        </html>
      `);
    }

    // Update booking status
    booking.status = action;
    booking.updatedAt = new Date().toISOString();
    bookings.set(bookingId, booking);

    // If accepted, create/update calendar event
    if (action === 'accept') {
      try {
        const calendar = getCalendarClient();
        
        // Remove [PENDING] prefix if it exists
        const summary = booking.eventSummary?.replace('[PENDING] ', '') || 
                       `${booking.serviceName} - ${booking.customerName}`;

        const eventData = {
          summary,
          description: booking.eventDescription || `Service: ${booking.serviceName}\nClient: ${booking.customerName}\nEmail: ${booking.customerEmail}\nDuration: ${booking.duration}\nBooking ID: ${bookingId}\nStatus: Confirmed`,
          start: {
            dateTime: booking.startDateTime,
            timeZone: 'Europe/Rome'
          },
          end: {
            dateTime: booking.endDateTime,
            timeZone: 'Europe/Rome'
          },
          attendees: [
            {
              email: 'vestilizamilano@gmail.com',
              displayName: 'Gülizar Ermiş',
              organizer: true
            },
            {
              email: booking.customerEmail,
              displayName: booking.customerName
            }
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 }, // 1 day before
              { method: 'popup', minutes: 60 }       // 1 hour before
            ]
          },
          // Send email notifications to attendees
          sendUpdates: 'all'
        };

        // If event already exists, update it; otherwise create new
        if (booking.eventId) {
          await calendar.events.update({
            calendarId,
            eventId: booking.eventId,
            requestBody: eventData
          });
        } else {
          const eventResponse = await calendar.events.insert({
            calendarId,
            requestBody: eventData
          });
          booking.eventId = eventResponse.data.id;
          bookings.set(bookingId, booking);
        }
      } catch (calendarError) {
        console.error('Error updating calendar event:', calendarError);
        // Continue even if calendar update fails
      }
    }

    // Send response email to customer
    try {
      const response = {
        bookingId,
        action,
        message: message || undefined
      };

      // Call email service to send response
      const emailResponse = await fetch(`${process.env.BASE_URL || 'http://localhost:3001'}/api/email/send-booking-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: booking.customerEmail,
          subject: `Booking ${action === 'accept' ? 'Confirmed' : action === 'reject' ? 'Declined' : 'Update Request'} - Gülizar Ermiş Fashion Consultancy`,
          customerName: booking.customerName,
          response,
          bookingData: {
            serviceName: booking.serviceName,
            date: booking.date,
            time: booking.time,
            duration: booking.duration,
            bookingId
          }
        })
      });

      if (!emailResponse.ok) {
        console.error('Failed to send response email');
      }
    } catch (emailError) {
      console.error('Error sending response email:', emailError);
      // Continue even if email fails
    }

    // Show confirmation page
    const actionText = {
      'accept': 'accepted',
      'reject': 'rejected',
      'request-change': 'marked for changes'
    };

    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: 'Georgia', serif;
              background: #FAF8F5;
              padding: 40px;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #2C2825; }
            .success { color: #C4A484; font-size: 48px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✓</div>
            <h1>Booking ${actionText[action]}</h1>
            <p>The booking has been ${actionText[action]} successfully.</p>
            <p>The customer has been notified via email.</p>
            <p style="margin-top: 30px; color: #8C847A; font-size: 14px;">
              Booking ID: ${bookingId}
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error processing booking response:', error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
          <p>${error.message}</p>
        </body>
      </html>
    `);
  }
});

/**
 * POST /api/booking/store
 * Store booking data (called from frontend when booking is submitted)
 * In production, this should be a database operation
 */
router.post('/store', (req, res) => {
  try {
    const booking = req.body;
    
    if (!booking.bookingId) {
      return res.status(400).json({
        success: false,
        message: 'bookingId is required'
      });
    }

    bookings.set(booking.bookingId, {
      ...booking,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Booking stored successfully'
    });
  } catch (error) {
    console.error('Error storing booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to store booking'
    });
  }
});

/**
 * GET /api/booking/:bookingId
 * Get booking details
 */
router.get('/:bookingId', (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = bookings.get(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get booking'
    });
  }
});

export { router as bookingRoutes, bookings };

