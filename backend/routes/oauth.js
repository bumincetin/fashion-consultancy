import express from 'express';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the backend root directory (one level up from routes/)
const backendRoot = path.join(__dirname, '..');

/**
 * GET /api/oauth/auth
 * Get OAuth2 authorization URL
 */
router.get('/auth', (req, res) => {
  try {
    const clientSecretPath = path.join(backendRoot, 'config/client_secret.json');
    
    if (!fs.existsSync(clientSecretPath)) {
      return res.status(500).json({
        success: false,
        message: 'OAuth2 credentials not found'
      });
    }

    const credentials = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8'));
    const { client_id, client_secret } = credentials.web || credentials.installed || {};
    
    if (!client_id || !client_secret) {
      return res.status(500).json({
        success: false,
        message: 'Invalid OAuth2 credentials'
      });
    }

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/oauth/callback'
    );

    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent' // Force consent to get refresh token
    });

    res.json({
      success: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate authorization URL'
    });
  }
});

/**
 * GET /api/oauth/callback
 * Handle OAuth2 callback and store refresh token
 */
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1>Authorization Failed</h1>
            <p>No authorization code received.</p>
          </body>
        </html>
      `);
    }

    const clientSecretPath = path.join(backendRoot, 'config/client_secret.json');
    const credentials = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8'));
    const { client_id, client_secret } = credentials.web || credentials.installed || {};

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/oauth/callback'
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store refresh token in environment or file
    if (tokens.refresh_token) {
      console.log('\n=== IMPORTANT: Save this refresh token ===');
      console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
      console.log('==========================================\n');
      
      // Optionally save to .env file
      const envPath = path.join(backendRoot, '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      // Update or add refresh token
      if (envContent.includes('GOOGLE_REFRESH_TOKEN=')) {
        envContent = envContent.replace(
          /GOOGLE_REFRESH_TOKEN=.*/,
          `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`
        );
      } else {
        envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
      }
      
      fs.writeFileSync(envPath, envContent);
    }

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
            .success { color: #C4A484; font-size: 48px; margin: 20px 0; }
            code { background: #FAF8F5; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✓</div>
            <h1>Authorization Successful!</h1>
            <p>Your Google Calendar access has been configured.</p>
            ${tokens.refresh_token ? `
              <p style="margin-top: 20px; padding: 15px; background: #FAF8F5; border-radius: 5px;">
                <strong>Refresh token saved to .env file</strong><br>
                <code>GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</code>
              </p>
            ` : ''}
            <p style="margin-top: 30px; color: #8C847A; font-size: 14px;">
              You can now close this window.
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
          <h1>Authorization Error</h1>
          <p>${error.message}</p>
        </body>
      </html>
    `);
  }
});

export { router as oauthRoutes };

