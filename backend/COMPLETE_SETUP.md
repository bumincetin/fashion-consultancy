# Complete Backend Setup Checklist

Use this checklist to ensure your backend is fully configured.

## ✅ Step 1: Verify Environment Variables

Check that your `backend/.env` file contains all required variables:

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3001

# Google Calendar OAuth2
GOOGLE_REFRESH_TOKEN=your_refresh_token_here  ✅ (You have this!)
GOOGLE_REDIRECT_URI=http://localhost:3001/api/oauth/callback
GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com

# SendGrid Email
SENDGRID_API_KEY=SG.your_api_key_here
FROM_EMAIL=gulizarermis20@gmail.com
```

## ✅ Step 2: Verify Files Are in Place

- [ ] `backend/config/client_secret.json` exists
- [ ] `backend/.env` file exists with all variables
- [ ] Backend dependencies installed (`npm install` in backend folder)

## ✅ Step 3: Start the Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📧 Email service: SendGrid
📅 Calendar: gulizarermis20@gmail.com
```

## ✅ Step 4: Test Calendar API

**PowerShell:**
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

**Expected Response:**
```json
{
  "available": true,
  "message": "Time slot is available"
}
```

If you get an error, check:
- Is the server running?
- Is `GOOGLE_REFRESH_TOKEN` in `.env`?
- Did you restart the server after adding the token?

## ✅ Step 5: Test Email API (After SendGrid Setup)

Once you have your SendGrid API key:

**PowerShell:**
```powershell
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

## ✅ Step 6: Test Complete Flow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (from project root)
3. Open http://localhost:3000
4. Click "Book Experience"
5. Fill out and submit a booking
6. Verify:
   - ✅ Gülizar receives email with booking request
   - ✅ Customer receives confirmation email
   - ✅ Calendar event is created (check Google Calendar)

## Troubleshooting

### Calendar API Not Working

**Error: "No Google Calendar authentication configured"**
- Check that `client_secret.json` is in `backend/config/`
- Verify `GOOGLE_REFRESH_TOKEN` is in `.env`
- Restart the server

**Error: "Invalid grant" or "Token expired"**
- Re-run OAuth flow: Visit `http://localhost:3001/api/oauth/auth`
- Get a new refresh token
- Update `.env` and restart server

### Email API Not Working

**Error: "Email service not configured"**
- Add `SENDGRID_API_KEY` to `.env`
- Verify sender email is verified in SendGrid

**Error: "Email not sending"**
- Check SendGrid dashboard for errors
- Verify sender email verification
- Check free tier limits (100 emails/day)

---

**Once all tests pass, your backend is ready! 🎉**

