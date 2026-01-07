# How to Add Environment Variables in Cloudflare Pages

## Quick Steps

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Or click: [Cloudflare Dashboard](https://dash.cloudflare.com)

2. **Navigate to Your Project**
   - Click **"Workers & Pages"** in the left sidebar
   - Click on your project: **"fashion-consultancy"**

3. **Go to Settings**
   - Click on the **"Settings"** tab at the top

4. **Find Environment Variables**
   - Scroll down to the **"Environment Variables"** section
   - You'll see sections for "Production" and "Preview"

5. **Add the Variable**
   - Click **"Add variable"** button
   - **Variable name:** `VITE_API_URL`
   - **Value:** `https://fashion-consultancy-backend-1078526273206.europe-west1.run.app`
   - Check **"Production"** (and optionally "Preview" if you want it in preview deployments too)
   - Click **"Save"**

6. **Redeploy (if needed)**
   - After adding the variable, you may need to trigger a new deployment
   - Go to **"Deployments"** tab
   - Click **"Retry deployment"** on the latest deployment, or push a new commit to trigger auto-deploy

## Visual Guide

```
Cloudflare Dashboard
  └── Workers & Pages
      └── fashion-consultancy (your project)
          └── Settings tab
              └── Environment Variables section
                  └── Add variable
                      ├── Name: VITE_API_URL
                      ├── Value: https://fashion-consultancy-backend-1078526273206.europe-west1.run.app
                      └── Environment: Production ✅
```

## Important Notes

- Environment variables starting with `VITE_` are exposed to your frontend code
- After adding the variable, you need to redeploy for it to take effect
- The variable will be available in your code as `import.meta.env.VITE_API_URL`

## Troubleshooting

**Can't find Environment Variables section?**
- Make sure you're in the **Settings** tab, not **Deployments** or **Functions**
- Scroll down - it's usually near the bottom of the Settings page

**Variable not working after deployment?**
- Make sure the variable name is exactly `VITE_API_URL` (case-sensitive)
- Check that you've selected the correct environment (Production/Preview)
- Try clearing browser cache or doing a hard refresh (Ctrl+F5)

**Need to update the value?**
- Go back to Settings → Environment Variables
- Click the edit icon (pencil) next to `VITE_API_URL`
- Update the value and save
- Redeploy

