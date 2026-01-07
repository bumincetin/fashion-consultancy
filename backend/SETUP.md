# Backend Setup Guide

Complete setup instructions for Google Calendar and Email functionality.

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Google account (gulizarermis20@gmail.com)
- SendGrid account (free tier available)

---

## Part 1: Google Calendar API Setup

### Step 1: Configure OAuth2 Redirect URI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **vestiliza-483519**
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:3001/api/oauth/callback` (for development)
   - `https://yourdomain.com/api/oauth/callback` (for production)
6. Click **Save**

### Step 2: Get Authorization and Refresh Token

1. **Start the backend server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Get authorization URL:**
   Open in browser: `http://localhost:3001/api/oauth/auth`
   
   You'll see a JSON response with an `authUrl`. Copy the `authUrl` value.

3. **Authorize access:**
   - Open the `authUrl` in your browser
   - Sign in with **gulizarermis20@gmail.com**
   - Click **Allow** to grant calendar permissions
   - You'll be redirected to the callback URL

4. **Save refresh token:**
   - The callback page will display your refresh token
   - It's automatically saved to `backend/.env`
   - Copy it for your records

### Step 3: Verify Calendar Access

The refresh token is now saved. **Restart your server** and test the connection:

**PowerShell:**
```powershell
# Test calendar connection
Invoke-RestMethod -Uri http://localhost:3001/api/calendar/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Calendar connection successful",
  "calendar": {
    "id": "gulizarermis20@gmail.com",
    "summary": "...",
    "timeZone": "Europe/Rome"
  }
}
```

If successful, test availability checking:

**For Bash/Linux/Mac:**
```bash
curl -X POST http://localhost:3001/api/calendar/check-availability \
  -H "Content-Type: application/json" \
  -d '{"timeMin":"2024-12-20T14:00:00","timeMax":"2024-12-20T18:00:00"}'
```

**For PowerShell/Windows:**
```powershell
$body = @{
    timeMin = "2024-12-20T14:00:00"
    timeMax = "2024-12-20T18:00:00"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3001/api/calendar/check-availability `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## Part 2: SendGrid Email Setup

### Step 1: Create SendGrid Account

1. Sign up at [SendGrid](https://sendgrid.com/) (free tier: 100 emails/day)
2. Verify your email address

### Step 2: Verify Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in:
   - **From Email:** gulizarermis20@gmail.com
   - **From Name:** Gülizar Ermiş
   - **Reply To:** gulizarermis20@gmail.com
   - Complete all required fields
4. Check your email and click the verification link

### Step 3: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it: **Fashion Consultancy**
4. Select **Full Access** or **Mail Send** permissions
5. Click **Create & View**
6. **Copy the API key immediately** (you'll only see it once!)

### Step 4: Add API Key to Backend

Add to `backend/.env`:
```env
SENDGRID_API_KEY=SG.your_api_key_here
FROM_EMAIL=gulizarermis20@gmail.com
```

---

## Part 3: Environment Configuration

Create `backend/.env` file with all required variables:

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3001

# Google Calendar OAuth2
GOOGLE_REFRESH_TOKEN=your_refresh_token_from_oauth_callback
GOOGLE_REDIRECT_URI=http://localhost:3001/api/oauth/callback
GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com

# SendGrid Email
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
FROM_EMAIL=gulizarermis20@gmail.com
```

**Important:** Replace the placeholder values with your actual credentials.

---

## Part 4: Testing the Setup

### Test Calendar API

**For Bash/Linux/Mac:**
```bash
# Check availability
curl -X POST http://localhost:3001/api/calendar/check-availability \
  -H "Content-Type: application/json" \
  -d '{
    "timeMin": "2024-12-20T14:00:00",
    "timeMax": "2024-12-20T18:00:00"
  }'
```

**For PowerShell/Windows:**
```powershell
# Check availability
$body = @{
    timeMin = "2024-12-20T14:00:00"
    timeMax = "2024-12-20T18:00:00"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3001/api/calendar/check-availability `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

**Or using a simpler one-liner:**
```powershell
Invoke-RestMethod -Uri http://localhost:3001/api/calendar/check-availability -Method POST -ContentType "application/json" -Body '{"timeMin":"2024-12-20T14:00:00","timeMax":"2024-12-20T18:00:00"}'
```

**Should return:** `{"available": true/false, "message": "..."}`

**Note:** If you get an error about authentication, make sure you:
1. Completed the OAuth authorization flow
2. Have `GOOGLE_REFRESH_TOKEN` in your `.env` file
3. Restarted the server after adding the refresh token

### Test Email API

**For Bash/Linux/Mac:**
```bash
# Send test email
curl -X POST http://localhost:3001/api/email/send-customer-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "customerName": "Test User",
    "bookingData": {
      "customerName": "Test User",
      "customerEmail": "your-email@example.com",
      "serviceName": "Luxury Shopping Tour",
      "date": "Monday, December 20, 2024",
      "time": "2:00 PM",
      "duration": "4 hours",
      "bookingId": "TEST-123"
    }
  }'
```

**For PowerShell/Windows:**
```powershell
# Send test email
$body = @{
    to = "your-email@example.com"
    subject = "Test Email"
    customerName = "Test User"
    bookingData = @{
        customerName = "Test User"
        customerEmail = "your-email@example.com"
        serviceName = "Luxury Shopping Tour"
        date = "Monday, December 20, 2024"
        time = "2:00 PM"
        duration = "4 hours"
        bookingId = "TEST-123"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri http://localhost:3001/api/email/send-customer-confirmation `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Test Complete Flow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (from project root)
3. Open http://localhost:3000
4. Click "Book Experience"
5. Fill out and submit a booking
6. Check:
   - ✅ Gülizar receives email with booking request
   - ✅ Customer receives confirmation email
   - ✅ Calendar event is created (if accepted)

---

## Troubleshooting

### Calendar Issues

**"No Google Calendar authentication configured"**
- Make sure `client_secret.json` is in `backend/config/`
- Verify you completed the OAuth flow and have a refresh token

**"Invalid grant" or "Token expired"**
- Re-run the OAuth authorization flow
- Get a new refresh token from `/api/oauth/auth`

**"Calendar not found"**
- Verify `GOOGLE_CALENDAR_ID` matches your email exactly
- Check that the calendar exists and is accessible

### Email Issues

**"Email service not configured"**
- Verify `SENDGRID_API_KEY` is set in `.env`
- Check that the API key is correct

**"Email not sending"**
- Verify sender email is verified in SendGrid
- Check SendGrid dashboard for error logs
- Ensure you haven't exceeded free tier limits (100/day)

**"Invalid sender"**
- Complete sender verification in SendGrid
- Wait for verification email and click the link

### General Issues

**"Cannot find module"**
- Run `npm install` in the backend directory
- Check that all dependencies are installed

**"Port already in use"**
- Change `PORT` in `.env` to a different port
- Or stop the process using port 3001

**"Connection refused"**
- Ensure backend is running: `npm run dev`
- Check that port matches your `.env` configuration

---

## Production Deployment

### Environment Variables

Set these in your hosting platform (Heroku, Railway, Render, etc.):

```env
PORT=3001
FRONTEND_URL=https://yourdomain.com
BASE_URL=https://api.yourdomain.com

GOOGLE_REFRESH_TOKEN=your_production_refresh_token
GOOGLE_REDIRECT_URI=https://api.yourdomain.com/api/oauth/callback
GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com

SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=gulizarermis20@gmail.com
```

### Important Notes

1. **Update Redirect URI:** Add production URL in Google Cloud Console
2. **Re-authorize:** You may need to get a new refresh token for production
3. **HTTPS Required:** Production must use HTTPS for OAuth callbacks
4. **Database:** Consider adding a database for booking storage (currently in-memory)

---

## API Endpoints Reference

### Calendar
- `POST /api/calendar/check-availability` - Check time slot availability
- `POST /api/calendar/create-event` - Create calendar event
- `POST /api/calendar/available-slots` - Get available time slots

### Email
- `POST /api/email/send-booking-request` - Send booking request to Gülizar
- `POST /api/email/send-customer-confirmation` - Send confirmation to customer
- `POST /api/email/send-booking-response` - Send booking response

### Booking
- `GET /api/booking/respond?bookingId=XXX&action=accept` - Handle booking response
- `POST /api/booking/store` - Store booking data
- `GET /api/booking/:bookingId` - Get booking details

### OAuth
- `GET /api/oauth/auth` - Get authorization URL
- `GET /api/oauth/callback` - OAuth callback handler

---

## Support

For issues:
1. Check server logs for error messages
2. Verify all environment variables are set
3. Test each service individually (calendar, email)
4. Review Google Cloud Console and SendGrid dashboards for errors

**You're all set!** 🎉

