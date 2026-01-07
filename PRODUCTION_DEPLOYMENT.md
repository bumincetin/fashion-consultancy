# Production Deployment Guide - Google Cloud Run

Complete guide for deploying the backend to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Cloud CLI** installed

### Installing Google Cloud CLI on Windows

**Option 1: Using the installer (Recommended)**
1. Download the installer from: https://cloud.google.com/sdk/docs/install-sdk#windows
2. Run the installer and follow the prompts
3. Restart your terminal/PowerShell
4. Verify installation: `gcloud --version`

**Option 2: Using PowerShell (Quick install)**
```powershell
# Download and install
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
& $env:Temp\GoogleCloudSDKInstaller.exe
```

After installation, restart PowerShell and verify:
```powershell
gcloud --version
```

## Step 1: Set Up Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Set your project (replace with your project ID)
gcloud config set project vestiliza-483519

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
```

## Step 2: Deploy Backend

**Using deployment script (PowerShell):**
```powershell
cd backend
.\deploy.ps1
```

**Or manually:**
```bash
cd backend
gcloud run deploy fashion-consultancy-backend \
  --source . \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3001 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production
```

## Step 3: Set Environment Variables

```bash
gcloud run services update fashion-consultancy-backend \
  --region europe-west1 \
  --update-env-vars \
    PORT=3001,\
    FRONTEND_URL=https://your-cloudflare-pages-url.pages.dev,\
    GOOGLE_CLIENT_ID=your-client-id,\
    GOOGLE_CLIENT_SECRET=your-client-secret,\
    GOOGLE_REFRESH_TOKEN=your-refresh-token,\
    GOOGLE_CALENDAR_ID=gulizarermis20@gmail.com,\
    SENDGRID_API_KEY=your-sendgrid-api-key,\
    SENDGRID_FROM_EMAIL=gulizarermis20@gmail.com,\
    SENDGRID_FROM_NAME="Gülizar Ermiş"
```

**Or via Console:**
1. Go to [Cloud Run Services](https://console.cloud.google.com/run)
2. Click on `fashion-consultancy-backend`
3. Click **Edit & Deploy New Revision**
4. Go to **Variables & Secrets** tab
5. Add all required environment variables
6. Click **Deploy**

## Step 4: Get Your Backend URL

```bash
gcloud run services describe fashion-consultancy-backend \
  --region europe-west1 \
  --format 'value(status.url)'
```

## Step 5: Update Google OAuth Redirect URI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add: `https://YOUR-SERVICE-URL.run.app/api/oauth/callback`
5. Click **Save**

## Step 6: Update Frontend

In Cloudflare Pages:
1. Go to Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://YOUR-SERVICE-URL.run.app`
3. Redeploy your site

## Step 7: Verify Deployment

```bash
# Test health endpoint
curl https://YOUR-SERVICE-URL.run.app/health

# Test calendar connection
curl https://YOUR-SERVICE-URL.run.app/api/calendar/test
```

## Troubleshooting

**Backend not responding:**
- Check Cloud Run logs: `gcloud run services logs read fashion-consultancy-backend --region europe-west1`
- Verify all environment variables are set correctly

**CORS errors:**
- Verify `FRONTEND_URL` is set correctly in environment variables
- Make sure the frontend URL matches exactly (including `https://`)

**OAuth errors:**
- Verify redirect URI is added to Google Cloud Console
- Check that `GOOGLE_REFRESH_TOKEN` is set in environment variables

**Email not sending:**
- Verify `SENDGRID_API_KEY` is set correctly
- Check SendGrid dashboard for email delivery status

## Quick Checklist

- [ ] Backend deployed to Google Cloud Run
- [ ] All environment variables set
- [ ] Google OAuth redirect URI updated
- [ ] Frontend `VITE_API_URL` configured in Cloudflare Pages
- [ ] Backend health check passes
- [ ] Calendar connection test passes
- [ ] Test booking flow end-to-end
