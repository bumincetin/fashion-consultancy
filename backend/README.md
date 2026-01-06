# Fashion Consultancy Backend API

Backend server for Gülizar Ermiş Fashion Consultancy booking system with Google Calendar and email integration.

## Features

- ✅ Google Calendar API integration (availability checking, event creation)
- ✅ SendGrid email service integration
- ✅ Booking request/response system
- ✅ RESTful API endpoints

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Calendar API credentials (Service Account)
- SendGrid API key (for email functionality)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Google Calendar API

#### Option A: Service Account Key File (Recommended)

1. Download your service account JSON key file from Google Cloud Console
2. Save it as `config/service-account-key.json` in the backend directory
3. Share your calendar with the service account email:
   - Open Google Calendar
   - Go to Settings → Settings for my calendars
   - Select your calendar (gulizarermis20@gmail.com)
   - Under "Share with specific people", add the service account email
   - Grant "Make changes to events" permission

#### Option B: Environment Variables

1. Copy the service account credentials JSON
2. Add it to `.env` as `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` (as a JSON string)

### 3. Configure SendGrid

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key with "Mail Send" permissions
3. Add it to `.env` as `SENDGRID_API_KEY`
4. Verify your sender email (gulizarermis20@gmail.com) in SendGrid

### 4. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your credentials:
   ```env
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   BASE_URL=http://localhost:3001
   
   GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./config/service-account-key.json
   GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com
   
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   FROM_EMAIL=gulizarermis20@gmail.com
   ```

### 5. Create Config Directory

```bash
mkdir -p config
# Place your service-account-key.json file here
```

### 6. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

## API Endpoints

### Calendar Endpoints

- `POST /api/calendar/check-availability` - Check if a time slot is available
- `POST /api/calendar/create-event` - Create a calendar event
- `POST /api/calendar/available-slots` - Get available time slots for a date
- `PUT /api/calendar/update-event/:eventId` - Update an existing event
- `DELETE /api/calendar/delete-event/:eventId` - Delete an event

### Email Endpoints

- `POST /api/email/send-booking-request` - Send booking request to Gülizar
- `POST /api/email/send-customer-confirmation` - Send confirmation to customer
- `POST /api/email/send-booking-response` - Send booking response to customer

### Booking Endpoints

- `GET /api/booking/respond` - Handle booking response (accept/reject/change)
- `POST /api/booking/store` - Store booking data
- `GET /api/booking/:bookingId` - Get booking details

## Testing

### Test Calendar Availability

```bash
curl -X POST http://localhost:3001/api/calendar/check-availability \
  -H "Content-Type: application/json" \
  -d '{
    "timeMin": "2024-12-20T14:00:00",
    "timeMax": "2024-12-20T18:00:00"
  }'
```

### Test Email Sending

```bash
curl -X POST http://localhost:3001/api/email/send-booking-request \
  -H "Content-Type: application/json" \
  -d '{
    "to": "gulizarermis20@gmail.com",
    "subject": "Test Booking Request",
    "bookingData": {
      "customerName": "Test Customer",
      "customerEmail": "test@example.com",
      "serviceName": "Luxury Shopping Tour",
      "serviceDescription": "Test description",
      "date": "Monday, December 20, 2024",
      "time": "2:00 PM",
      "duration": "4 hours",
      "bookingId": "TEST-123"
    }
  }'
```

## Frontend Integration

Update your frontend API calls to point to the backend:

```javascript
// In your frontend code, update the base URL
const API_BASE_URL = 'http://localhost:3001';

// Example: Check availability
fetch(`${API_BASE_URL}/api/calendar/check-availability`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ timeMin, timeMax })
});
```

## Production Deployment

1. **Use a production database** instead of in-memory storage
2. **Set up environment variables** on your hosting platform
3. **Use HTTPS** for all API endpoints
4. **Configure CORS** properly for your domain
5. **Set up monitoring** and error logging
6. **Use a process manager** like PM2

### Example PM2 Setup

```bash
npm install -g pm2
pm2 start server.js --name fashion-consultancy-api
pm2 save
pm2 startup
```

## Troubleshooting

### Calendar API Errors

- **"Calendar not found"**: Verify the calendar ID is correct
- **"Insufficient permissions"**: Ensure service account has access to the calendar
- **"Invalid credentials"**: Check your service account key file path

### Email Errors

- **"Email not sending"**: Verify SendGrid API key and sender email verification
- **"Rate limit exceeded"**: Check SendGrid account limits
- **"Invalid sender"**: Verify sender email in SendGrid dashboard

## Security Notes

- Never commit `.env` file or service account keys to git
- Use environment variables for all sensitive data
- Implement rate limiting for production
- Validate and sanitize all input data
- Use HTTPS in production

## Support

For issues or questions:
- Check the main project README
- Review Google Calendar API documentation
- Review SendGrid API documentation

