# Quick Setup Guide

## Step-by-Step Setup

### 1. Get Google Calendar API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Calendar API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the details and create
   - Click on the service account → "Keys" tab
   - Click "Add Key" → "Create new key" → Choose JSON
   - Download the JSON file

### 2. Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com/)
2. Click the settings gear → "Settings"
3. Under "Settings for my calendars", click on your calendar
4. Scroll to "Share with specific people"
5. Click "Add people"
6. Enter the service account email (found in the JSON file: `client_email`)
7. Select "Make changes to events" permission
8. Click "Send"

### 3. Get SendGrid API Key

1. Sign up at [SendGrid](https://sendgrid.com/) (free tier available)
2. Go to Settings → API Keys
3. Click "Create API Key"
4. Name it (e.g., "Fashion Consultancy")
5. Select "Full Access" or "Mail Send" permissions
6. Copy the API key (you'll only see it once!)

### 4. Verify Sender Email in SendGrid

1. Go to SendGrid → Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in your details (gulizarermis20@gmail.com)
4. Check your email and verify

### 5. Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create config directory
mkdir config

# Copy your service account JSON file to config/
# Rename it to: service-account-key.json

# Copy environment template
cp .env.example .env

# Edit .env file with your credentials
```

### 6. Configure .env File

Open `.env` and update:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3001

# Path to your service account key file
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./config/service-account-key.json

# Your calendar email
GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com

# Your SendGrid API key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sender email (must be verified in SendGrid)
FROM_EMAIL=gulizarermis20@gmail.com
```

### 7. Start the Server

```bash
# Development mode (auto-reload on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 Server running on port 3001
📧 Email service: SendGrid
📅 Calendar: gulizarermis20@gmail.com
```

### 8. Test the Setup

Open a new terminal and test:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Should return: {"status":"ok","message":"Server is running"}
```

### 9. Update Frontend

In your frontend code, update the API base URL. The frontend services are already configured to call `/api/...` endpoints, so you need to set up a proxy or update the fetch URLs.

**Option A: Vite Proxy (Recommended for Development)**

Add to `vite.config.ts`:
```typescript
export default {
  // ... existing config
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
}
```

**Option B: Update Frontend Services**

Update the fetch URLs in:
- `services/calendarService.ts`
- `services/emailService.ts`

Change from:
```javascript
fetch('/api/calendar/...')
```

To:
```javascript
fetch('http://localhost:3001/api/calendar/...')
```

### 10. Test Complete Flow

1. Open your frontend app
2. Click "Book Experience"
3. Fill in the booking form
4. Submit the booking
5. Check:
   - Gülizar's email inbox (should receive booking request)
   - Customer's email inbox (should receive confirmation)
   - Google Calendar (should have a pending event)

## Troubleshooting

### "Cannot find module" errors
- Make sure you ran `npm install` in the backend directory
- Check that you're using Node.js v18 or higher

### "Calendar not found" error
- Verify `GOOGLE_CALENDAR_ID` in `.env` matches your calendar email
- Ensure the service account has access to the calendar

### "Email not sending" error
- Verify `SENDGRID_API_KEY` is correct
- Check that sender email is verified in SendGrid
- Check SendGrid dashboard for error logs

### "Service account key not found"
- Verify the path in `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`
- Ensure the JSON file is in the `config/` directory
- Check file permissions

## Next Steps

Once everything is working:

1. **Deploy backend** to a hosting service (Heroku, Railway, Render, etc.)
2. **Update frontend** to use production API URL
3. **Set up database** (replace in-memory storage)
4. **Configure production environment variables**
5. **Set up monitoring and logging**

## Need Help?

- Check the main `README.md` in the backend directory
- Review Google Calendar API documentation
- Review SendGrid documentation
- Check server logs for detailed error messages

