# Email Service Setup Guide

This guide explains how to set up the backend email service for the booking system.

## Overview

The booking system sends emails in the following scenarios:
1. **Booking Request to Gülizar**: When a customer submits a booking request
2. **Confirmation to Customer**: Immediately after booking request is submitted
3. **Response to Customer**: When Gülizar accepts, rejects, or requests changes

## Required Backend Endpoints

### 1. Send Booking Request Email to Gülizar

**Endpoint:** `POST /api/email/send-booking-request`

**Request Body:**
```json
{
  "to": "vestilizamilano@gmail.com",
  "subject": "New Booking Request: Luxury Shopping Tour - John Doe",
  "bookingData": {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "serviceName": "Luxury Shopping Tour",
    "serviceDescription": "Curated journey through Milan's most prestigious boutiques...",
    "date": "Monday, December 20, 2024",
    "time": "2:00 PM",
    "duration": "4 hours",
    "bookingId": "BK-1234567890-ABC123XYZ"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### 2. Send Customer Confirmation Email

**Endpoint:** `POST /api/email/send-customer-confirmation`

**Request Body:**
```json
{
  "to": "customer@example.com",
  "subject": "Booking Request Received - Gülizar Ermiş Fashion Consultancy",
  "customerName": "John Doe",
  "bookingData": {
    "customerName": "John Doe",
    "customerEmail": "customer@example.com",
    "serviceName": "Luxury Shopping Tour",
    "date": "Monday, December 20, 2024",
    "time": "2:00 PM",
    "duration": "4 hours",
    "bookingId": "BK-1234567890-ABC123XYZ"
  }
}
```

### 3. Send Booking Response Email to Customer

**Endpoint:** `POST /api/email/send-booking-response`

**Request Body:**
```json
{
  "to": "customer@example.com",
  "subject": "Booking Confirmed - Gülizar Ermiş Fashion Consultancy",
  "customerName": "John Doe",
  "response": {
    "bookingId": "BK-1234567890-ABC123XYZ",
    "action": "accept",
    "message": "Looking forward to our session!"
  }
}
```

**Action Types:**
- `accept`: Booking is confirmed
- `reject`: Booking is declined
- `request-change`: Gülizar wants to discuss changes

### 4. Handle Booking Response (Accept/Reject/Change)

**Endpoint:** `GET /api/booking/respond`

**Query Parameters:**
- `bookingId`: The booking ID
- `action`: `accept`, `reject`, or `request-change`

**Response:**
- Redirects to a confirmation page
- Sends appropriate email to customer
- Updates booking status in database
- Updates calendar event if accepted

## Email Service Options

### Option 1: SendGrid (Recommended)

1. **Sign up for SendGrid:**
   - Go to [SendGrid](https://sendgrid.com/)
   - Create a free account (100 emails/day free tier)

2. **Get API Key:**
   - Navigate to Settings → API Keys
   - Create a new API key with "Full Access" or "Mail Send" permissions
   - Save the API key securely

3. **Backend Implementation (Node.js/Express example):**
```javascript
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/email/send-booking-request', async (req, res) => {
  try {
    const { to, subject, bookingData } = req.body;
    
    // Generate action URLs
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const acceptUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=accept`;
    const rejectUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=reject`;
    const changeUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=request-change`;
    
    const msg = {
      to,
      from: 'vestilizamilano@gmail.com',
      subject,
      html: generateBookingRequestEmailHTML(bookingData, acceptUrl, rejectUrl, changeUrl),
      text: generateBookingRequestEmailText(bookingData, acceptUrl, rejectUrl, changeUrl),
    };
    
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/email/send-customer-confirmation', async (req, res) => {
  try {
    const { to, subject, customerName, bookingData } = req.body;
    
    const msg = {
      to,
      from: 'vestilizamilano@gmail.com',
      subject,
      html: generateCustomerConfirmationEmailHTML(customerName, bookingData),
      text: generateCustomerConfirmationEmailText(customerName, bookingData),
    };
    
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/email/send-booking-response', async (req, res) => {
  try {
    const { to, subject, customerName, response } = req.body;
    
    let html, text;
    if (response.action === 'accept') {
      html = generateBookingAcceptedEmailHTML(customerName, response);
      text = generateBookingAcceptedEmailText(customerName, response);
    } else if (response.action === 'reject') {
      html = generateBookingRejectedEmailHTML(customerName, response);
      text = generateBookingRejectedEmailText(customerName, response);
    } else {
      html = generateBookingChangeRequestEmailHTML(customerName, response);
      text = generateBookingChangeRequestEmailText(customerName, response);
    }
    
    const msg = {
      to,
      from: 'vestilizamilano@gmail.com',
      subject,
      html,
      text,
    };
    
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/booking/respond', async (req, res) => {
  try {
    const { bookingId, action } = req.query;
    
    // Get booking details from database
    const booking = await getBookingById(bookingId);
    if (!booking) {
      return res.status(404).send('Booking not found');
    }
    
    // Update booking status
    await updateBookingStatus(bookingId, action);
    
    // Send response email to customer
    await sendBookingResponseToCustomer(booking.customerEmail, booking.customerName, {
      bookingId,
      action,
      message: req.query.message || undefined,
    });
    
    // If accepted, create/update calendar event
    if (action === 'accept') {
      await createConfirmedCalendarEvent(booking);
    }
    
    // Redirect to confirmation page
    res.redirect(`/booking-response?status=${action}&bookingId=${bookingId}`);
  } catch (error) {
    console.error('Error processing booking response:', error);
    res.status(500).send('Error processing booking response');
  }
});
```

### Option 2: Nodemailer (SMTP)

1. **Set up SMTP:**
   - Use Gmail SMTP or any other email provider
   - For Gmail, you'll need an App Password

2. **Backend Implementation:**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App Password for Gmail
  },
});

app.post('/api/email/send-booking-request', async (req, res) => {
  try {
    const { to, subject, bookingData } = req.body;
    
    const mailOptions = {
      from: 'vestilizamilano@gmail.com',
      to,
      subject,
      html: generateBookingRequestEmailHTML(bookingData),
      text: generateBookingRequestEmailText(bookingData),
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
```

## Environment Variables

Create a `.env` file in your backend:

```env
# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# OR for Nodemailer (SMTP)
EMAIL_USER=vestilizamilano@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Base URL for action links
BASE_URL=https://yourdomain.com

# Database connection (if storing bookings)
DATABASE_URL=your_database_url
```

## Database Schema (Optional but Recommended)

Store bookings in a database to track status:

```sql
CREATE TABLE bookings (
  id VARCHAR(255) PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration VARCHAR(50) NOT NULL,
  status ENUM('pending', 'accepted', 'rejected', 'change_requested') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Testing

1. **Test Booking Request:**
   - Submit a booking through the frontend
   - Check Gülizar's email inbox
   - Check customer's email inbox

2. **Test Response Actions:**
   - Click accept/reject/change links in Gülizar's email
   - Verify customer receives response email
   - Check calendar event is created/updated

## Security Considerations

1. **Validate booking IDs** before processing responses
2. **Rate limit** email sending endpoints
3. **Sanitize** all user input
4. **Use HTTPS** for all endpoints
5. **Store API keys** securely in environment variables
6. **Implement authentication** for admin endpoints (if creating admin panel)

## Troubleshooting

### Emails not sending
- Check API key/credentials are correct
- Verify sender email is verified (SendGrid requires verification)
- Check spam folder
- Review email service logs

### Action links not working
- Verify BASE_URL is set correctly
- Check booking ID format
- Ensure booking exists in database

### Calendar events not updating
- Verify Google Calendar API is properly configured
- Check calendar permissions
- Review calendar API logs

## Next Steps

1. Set up email service (SendGrid or Nodemailer)
2. Implement backend endpoints
3. Create email templates (see EMAIL_TEMPLATES.md)
4. Set up database (optional)
5. Test email flow end-to-end
6. Deploy backend API

