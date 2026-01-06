# Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] Google Calendar API credentials (Service Account JSON file)
- [ ] SendGrid account with API key
- [ ] Calendar shared with service account

## 5-Minute Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Place Service Account Key

```bash
mkdir -p config
# Copy your Google service account JSON file here
# Rename it to: service-account-key.json
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

**Minimum required in `.env`:**
```env
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./config/service-account-key.json
GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=gulizarermis20@gmail.com
```

### 4. Start Backend

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📧 Email service: SendGrid
📅 Calendar: gulizarermis20@gmail.com
```

### 5. Start Frontend (in another terminal)

```bash
# From project root
npm run dev
```

### 6. Test It!

1. Open http://localhost:3000
2. Click "Book Experience"
3. Fill out the form and submit
4. Check emails and calendar!

## Common Issues

**"Cannot find module 'googleapis'"**
→ Run `npm install` in the backend directory

**"Calendar not found"**
→ Check that calendar is shared with service account email

**"Email not sending"**
→ Verify SendGrid API key and sender email verification

**"Connection refused"**
→ Make sure backend is running on port 3001

## Next Steps

- Read `SETUP_GUIDE.md` for detailed instructions
- Read `README.md` for API documentation
- Deploy to production when ready

