import express from 'express';
import sgMail from '@sendgrid/mail';

const router = express.Router();

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Generate booking request email HTML for Gülizar
 */
function generateBookingRequestEmailHTML(bookingData, acceptUrl, rejectUrl, changeUrl) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    .booking-details { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #C4A484; }
    .detail-row { margin: 10px 0; }
    .detail-label { font-weight: bold; color: #8C847A; display: inline-block; width: 120px; }
    .action-buttons { text-align: center; margin: 30px 0; }
    .btn { display: inline-block; padding: 12px 30px; margin: 5px; text-decoration: none; border-radius: 5px; font-weight: bold; color: #FAF8F5; }
    .btn-accept { background: #2C2825; }
    .btn-reject { background: #D4A5A5; }
    .btn-change { background: #C4A484; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">New Booking Request</h1>
    </div>
    <div class="content">
      <p>Dear Gülizar,</p>
      <p>You have received a new booking request for your fashion consultancy services.</p>
      
      <div class="booking-details">
        <h2 style="margin-top: 0; color: #2C2825;">Booking Details</h2>
        <div class="detail-row">
          <span class="detail-label">Customer:</span>
          <span>${bookingData.customerName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span>${bookingData.customerEmail}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span>${bookingData.serviceName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Description:</span>
          <span>${bookingData.serviceDescription}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span>${bookingData.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span>${bookingData.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration:</span>
          <span>${bookingData.duration}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span>${bookingData.bookingId}</span>
        </div>
      </div>

      <div class="action-buttons">
        <p>Please review and respond to this booking request:</p>
        <a href="${acceptUrl}" class="btn btn-accept">Accept Booking</a>
        <a href="${rejectUrl}" class="btn btn-reject">Reject Booking</a>
        <a href="${changeUrl}" class="btn btn-change">Request Changes</a>
      </div>

      <p style="margin-top: 30px;">The customer will be notified of your response automatically.</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate customer confirmation email HTML
 */
function generateCustomerConfirmationEmailHTML(customerName, bookingData) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    .booking-summary { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #C4A484; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">Booking Request Received</h1>
    </div>
    <div class="content">
      <p>Dear ${customerName},</p>
      <p>Thank you for your booking request! We have successfully received your request and Gülizar has been notified.</p>
      
      <div class="booking-summary">
        <h2 style="margin-top: 0; color: #2C2825;">Your Booking Request</h2>
        <p><strong>Service:</strong> ${bookingData.serviceName}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Time:</strong> ${bookingData.time}</p>
        <p><strong>Duration:</strong> ${bookingData.duration}</p>
        <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
      </div>

      <p>Gülizar will review your request and respond within 24 hours. You will receive another email notification once she has confirmed, declined, or requested any changes to your booking.</p>
      
      <p>If you have any questions in the meantime, please don't hesitate to contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a>.</p>

      <p>We look forward to providing you with an exceptional fashion experience!</p>
      
      <p>Best regards,<br>Gülizar Ermiş<br>Fashion Consultancy</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate booking response email HTML
 */
function generateBookingResponseEmailHTML(customerName, response, bookingData) {
  const isAccepted = response.action === 'accept';
  const isRejected = response.action === 'reject';
  const isChangeRequest = response.action === 'request-change';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    ${isAccepted ? '.confirmation-box { background: #C4A484; color: #FAF8F5; padding: 20px; margin: 20px 0; text-align: center; border-radius: 5px; }' : ''}
    ${!isAccepted ? '.message-box { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid ' + (isRejected ? '#D4A5A5' : '#C4A484') + '; }' : ''}
    .booking-details { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #C4A484; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">${isAccepted ? 'Booking Confirmed!' : isRejected ? 'Booking Update' : 'Booking Change Request'}</h1>
    </div>
    <div class="content">
      ${isAccepted ? '<div class="confirmation-box"><h2 style="margin: 0;">✓ Your booking has been confirmed!</h2></div>' : ''}
      
      <p>Dear ${customerName},</p>
      ${isAccepted 
        ? '<p>Great news! Gülizar has confirmed your booking request.</p>'
        : isRejected 
        ? '<p>Thank you for your booking request. Unfortunately, Gülizar is unable to accommodate your requested time slot.</p>'
        : '<p>Gülizar has reviewed your booking request and would like to suggest some changes to better accommodate your needs.</p>'
      }
      
      ${bookingData ? `
      <div class="booking-details">
        <h2 style="margin-top: 0; color: #2C2825;">${isAccepted ? 'Confirmed' : 'Requested'} Booking Details</h2>
        <p><strong>Service:</strong> ${bookingData.serviceName}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Time:</strong> ${bookingData.time}</p>
        <p><strong>Duration:</strong> ${bookingData.duration}</p>
        <p><strong>Booking ID:</strong> ${bookingData.bookingId || response.bookingId}</p>
      </div>
      ` : ''}

      ${response.message ? `
      <div class="message-box">
        <p><strong>Message from Gülizar:</strong></p>
        <p style="font-style: italic;">${response.message}</p>
      </div>
      ` : ''}

      ${isAccepted 
        ? '<p>A calendar invitation has been sent to your email address. Please add it to your calendar to ensure you don\'t miss your appointment.</p>'
        : isRejected
        ? '<p>We encourage you to submit a new booking request with alternative dates or times. We\'d love to work with you!</p>'
        : '<p>Please reply to this email or contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a> to discuss the proposed changes and find a suitable alternative.</p>'
      }
      
      <p>If you have any questions, please contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a>.</p>

      <p>Best regards,<br>Gülizar Ermiş<br>Fashion Consultancy</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * POST /api/email/send-booking-request
 * Send booking request email to Gülizar
 */
router.post('/send-booking-request', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please set SENDGRID_API_KEY in environment variables.'
      });
    }

    const { to, subject, bookingData } = req.body;

    if (!to || !subject || !bookingData) {
      return res.status(400).json({
        success: false,
        message: 'to, subject, and bookingData are required'
      });
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    const acceptUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=accept`;
    const rejectUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=reject`;
    const changeUrl = `${baseUrl}/api/booking/respond?bookingId=${bookingData.bookingId}&action=request-change`;

    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'vestilizamilano@gmail.com',
      subject,
      html: generateBookingRequestEmailHTML(bookingData, acceptUrl, rejectUrl, changeUrl),
      text: `New Booking Request\n\nCustomer: ${bookingData.customerName}\nEmail: ${bookingData.customerEmail}\nService: ${bookingData.serviceName}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nDuration: ${bookingData.duration}\n\nAccept: ${acceptUrl}\nReject: ${rejectUrl}\nRequest Changes: ${changeUrl}`
    };

    await sgMail.send(msg);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending booking request email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email'
    });
  }
});

/**
 * POST /api/email/send-customer-confirmation
 * Send confirmation email to customer
 */
router.post('/send-customer-confirmation', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      });
    }

    const { to, subject, customerName, bookingData } = req.body;

    if (!to || !subject || !customerName || !bookingData) {
      return res.status(400).json({
        success: false,
        message: 'to, subject, customerName, and bookingData are required'
      });
    }

    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'vestilizamilano@gmail.com',
      subject,
      html: generateCustomerConfirmationEmailHTML(customerName, bookingData),
      text: `Booking Request Received\n\nDear ${customerName},\n\nThank you for your booking request! We have successfully received your request and Gülizar has been notified.\n\nService: ${bookingData.serviceName}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nDuration: ${bookingData.duration}\nBooking ID: ${bookingData.bookingId}\n\nGülizar will review your request and respond within 24 hours.`
    };

    await sgMail.send(msg);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email'
    });
  }
});

/**
 * POST /api/email/send-booking-response
 * Send booking response email to customer
 */
router.post('/send-booking-response', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      });
    }

    const { to, subject, customerName, response, bookingData } = req.body;

    if (!to || !subject || !customerName || !response) {
      return res.status(400).json({
        success: false,
        message: 'to, subject, customerName, and response are required'
      });
    }

    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'vestilizamilano@gmail.com',
      subject,
      html: generateBookingResponseEmailHTML(customerName, response, bookingData),
      text: `Booking ${response.action === 'accept' ? 'Confirmed' : response.action === 'reject' ? 'Declined' : 'Update Request'}\n\nDear ${customerName},\n\n${response.action === 'accept' ? 'Great news! Gülizar has confirmed your booking request.' : response.action === 'reject' ? 'Thank you for your booking request. Unfortunately, Gülizar is unable to accommodate your requested time slot.' : 'Gülizar has reviewed your booking request and would like to suggest some changes.'}\n\n${response.message ? `Message from Gülizar: ${response.message}\n\n` : ''}`
    };

    await sgMail.send(msg);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending booking response email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email'
    });
  }
});

/**
 * Generate Trend Report Email HTML
 * Milan Spring/Summer 2026 Trend Report
 */
function generateTrendReportEmailHTML(language) {
  const content = TREND_REPORT_CONTENT[language] || TREND_REPORT_CONTENT.en;
  
  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      line-height: 1.8;
      color: #2C2825;
      background-color: #FAF8F5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: #FFFFFF;
    }
    .header {
      background: linear-gradient(135deg, #2C2825 0%, #3a3632 100%);
      padding: 50px 40px;
      text-align: center;
    }
    .header-logo {
      font-family: 'Georgia', serif;
      font-size: 14px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #C4A484;
      margin-bottom: 20px;
    }
    .header-title {
      font-size: 32px;
      font-style: italic;
      color: #FAF8F5;
      margin: 0 0 10px 0;
      font-weight: 400;
    }
    .header-subtitle {
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #C4A484;
    }
    .intro {
      padding: 40px;
      background: #FAF8F5;
      border-bottom: 1px solid rgba(44, 40, 37, 0.1);
    }
    .intro p {
      margin: 0;
      font-size: 16px;
      color: #5C554D;
    }
    .section {
      padding: 40px;
      border-bottom: 1px solid rgba(44, 40, 37, 0.1);
    }
    .section-number {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #C4A484;
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 24px;
      font-style: italic;
      color: #2C2825;
      margin: 0 0 20px 0;
      font-weight: 400;
    }
    .section p {
      margin: 0 0 15px 0;
      font-size: 15px;
      color: #5C554D;
    }
    .trend-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
    .trend-list li {
      padding: 12px 0 12px 30px;
      position: relative;
      border-bottom: 1px solid rgba(44, 40, 37, 0.05);
      font-size: 14px;
      color: #2C2825;
    }
    .trend-list li:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #C4A484;
    }
    .trend-list li:last-child {
      border-bottom: none;
    }
    .highlight-box {
      background: linear-gradient(135deg, #C4A484 0%, #D4A5A5 100%);
      padding: 30px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .highlight-box h4 {
      color: #FAF8F5;
      margin: 0 0 10px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .highlight-box p {
      color: #FAF8F5;
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .color-palette {
      display: flex;
      justify-content: space-between;
      margin: 25px 0;
      gap: 10px;
    }
    .color-swatch {
      flex: 1;
      text-align: center;
    }
    .color-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 auto 10px;
      border: 2px solid rgba(44, 40, 37, 0.1);
    }
    .color-name {
      font-size: 11px;
      color: #8C847A;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .boutique-card {
      background: #FAF8F5;
      padding: 20px;
      margin: 15px 0;
      border-left: 3px solid #C4A484;
    }
    .boutique-name {
      font-size: 16px;
      font-style: italic;
      color: #2C2825;
      margin: 0 0 5px 0;
    }
    .boutique-address {
      font-size: 12px;
      color: #8C847A;
      margin: 0 0 10px 0;
    }
    .boutique-desc {
      font-size: 13px;
      color: #5C554D;
      margin: 0;
    }
    .cta-section {
      background: #2C2825;
      padding: 50px 40px;
      text-align: center;
    }
    .cta-title {
      font-size: 24px;
      font-style: italic;
      color: #FAF8F5;
      margin: 0 0 15px 0;
    }
    .cta-text {
      font-size: 14px;
      color: #FAF8F5;
      opacity: 0.8;
      margin: 0 0 25px 0;
    }
    .cta-button {
      display: inline-block;
      background: #C4A484;
      color: #FAF8F5;
      padding: 15px 40px;
      text-decoration: none;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      border-radius: 30px;
    }
    .footer {
      padding: 40px;
      text-align: center;
      background: #FAF8F5;
    }
    .footer-logo {
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #2C2825;
      margin-bottom: 15px;
    }
    .footer-text {
      font-size: 12px;
      color: #8C847A;
      margin: 0 0 10px 0;
    }
    .footer-links {
      margin-top: 20px;
    }
    .footer-links a {
      color: #C4A484;
      text-decoration: none;
      font-size: 11px;
      margin: 0 10px;
    }
    .unsubscribe {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(44, 40, 37, 0.1);
    }
    .unsubscribe p {
      font-size: 10px;
      color: #AEA69C;
      margin: 0;
    }
    .unsubscribe a {
      color: #8C847A;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-logo">Vestiliza</div>
      <h1 class="header-title">${content.title}</h1>
      <p class="header-subtitle">${content.subtitle}</p>
    </div>

    <!-- Introduction -->
    <div class="intro">
      <p>${content.intro}</p>
    </div>

    <!-- Section 1: Key Trends -->
    <div class="section">
      <p class="section-number">${content.section1.number}</p>
      <h2 class="section-title">${content.section1.title}</h2>
      <p>${content.section1.intro}</p>
      <ul class="trend-list">
        ${content.section1.trends.map(trend => `<li><strong>${trend.name}</strong> — ${trend.description}</li>`).join('')}
      </ul>
      <div class="highlight-box">
        <h4>${content.section1.highlight.title}</h4>
        <p>${content.section1.highlight.text}</p>
      </div>
    </div>

    <!-- Section 2: Color Palette -->
    <div class="section">
      <p class="section-number">${content.section2.number}</p>
      <h2 class="section-title">${content.section2.title}</h2>
      <p>${content.section2.intro}</p>
      <div class="color-palette">
        ${content.section2.colors.map(color => `
          <div class="color-swatch">
            <div class="color-circle" style="background: ${color.hex};"></div>
            <p class="color-name">${color.name}</p>
          </div>
        `).join('')}
      </div>
      <p>${content.section2.conclusion}</p>
    </div>

    <!-- Section 3: Investment Pieces -->
    <div class="section">
      <p class="section-number">${content.section3.number}</p>
      <h2 class="section-title">${content.section3.title}</h2>
      <p>${content.section3.intro}</p>
      <ul class="trend-list">
        ${content.section3.pieces.map(piece => `<li><strong>${piece.name}</strong> — ${piece.description}</li>`).join('')}
      </ul>
    </div>

    <!-- Section 4: Hidden Boutiques -->
    <div class="section">
      <p class="section-number">${content.section4.number}</p>
      <h2 class="section-title">${content.section4.title}</h2>
      <p>${content.section4.intro}</p>
      ${content.section4.boutiques.map(boutique => `
        <div class="boutique-card">
          <h4 class="boutique-name">${boutique.name}</h4>
          <p class="boutique-address">${boutique.address}</p>
          <p class="boutique-desc">${boutique.description}</p>
        </div>
      `).join('')}
    </div>

    <!-- Section 5: Styling Tips -->
    <div class="section">
      <p class="section-number">${content.section5.number}</p>
      <h2 class="section-title">${content.section5.title}</h2>
      <p>${content.section5.intro}</p>
      <ul class="trend-list">
        ${content.section5.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <h2 class="cta-title">${content.cta.title}</h2>
      <p class="cta-text">${content.cta.text}</p>
      <a href="https://vestiliza.com" class="cta-button">${content.cta.button}</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">Vestiliza · Gülizar Ermiş</div>
      <p class="footer-text">Milano, Italia</p>
      <p class="footer-text">vestilizamilano@gmail.com · +39 351 302 5810</p>
      <div class="footer-links">
        <a href="https://vestiliza.com">${content.footer.website}</a>
        <a href="https://www.instagram.com/gulizarermiss/">Instagram</a>
        <a href="https://wa.me/393513025810">WhatsApp</a>
      </div>
      <div class="unsubscribe">
        <p>${content.footer.unsubscribe} <a href="mailto:vestilizamilano@gmail.com?subject=Unsubscribe">${content.footer.unsubscribeLink}</a></p>
        <p style="margin-top: 10px;">${content.footer.privacy}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Trend Report Content in 3 Languages
 */
const TREND_REPORT_CONTENT = {
  en: {
    subject: 'Your Milan Spring/Summer 2026 Trend Report',
    title: 'Milan Spring/Summer 2026',
    subtitle: 'Exclusive Trend Report',
    intro: 'Welcome to your exclusive insider guide to Milan\'s most anticipated fashion trends for Spring/Summer 2026. As your personal style consultant in the heart of Italian fashion, I\'ve curated this report to give you first-hand access to what the style elite are wearing this season.',
    section1: {
      number: 'Section 01',
      title: 'Key Trends to Watch',
      intro: 'This season, Milan\'s runways told a story of elegant rebellion—where classic Italian craftsmanship meets bold modern expression. Here are the five defining trends:',
      trends: [
        { name: 'Architectural Minimalism', description: 'Clean lines, sculptural silhouettes, and impeccably tailored pieces that celebrate the beauty of simplicity.' },
        { name: 'Sunset Romanticism', description: 'Flowing fabrics in warm terracotta, soft coral, and golden amber hues that evoke Mediterranean sunsets.' },
        { name: 'New Power Dressing', description: 'Oversized blazers with softened shoulders, wide-leg trousers, and confident cuts that command attention.' },
        { name: 'Artisanal Details', description: 'Hand-stitched embroidery, artisanal buttons, and bespoke finishing touches that showcase Italian craftsmanship.' },
        { name: 'Quiet Luxury', description: 'Understated elegance through exceptional materials and perfect fit—wealth whispered, never shouted.' }
      ],
      highlight: {
        title: 'Gülizar\'s Pick',
        text: 'The "quiet luxury" trend is my personal favorite this season. It\'s about investing in timeless pieces that speak through quality, not logos. A perfectly cut Italian blazer will serve you for decades.'
      }
    },
    section2: {
      number: 'Section 02',
      title: 'The Color Palette',
      intro: 'This season\'s palette draws inspiration from the Italian landscape—from the warm stones of ancient villas to the azure of the Mediterranean coast.',
      colors: [
        { name: 'Terracotta', hex: '#C4A484' },
        { name: 'Ivory', hex: '#FAF8F5' },
        { name: 'Azure', hex: '#8FAABE' },
        { name: 'Sage', hex: '#9CAF94' },
        { name: 'Charcoal', hex: '#2C2825' }
      ],
      conclusion: 'These colors work beautifully together, creating sophisticated tonal outfits that feel effortlessly Italian.'
    },
    section3: {
      number: 'Section 03',
      title: 'Top 10 Investment Pieces',
      intro: 'These are the pieces worth investing in this season—timeless items that will elevate your wardrobe for years to come:',
      pieces: [
        { name: 'The Linen Blazer', description: 'In cream or soft terracotta, unlined for that perfect relaxed Italian elegance.' },
        { name: 'Wide-Leg Trousers', description: 'High-waisted, flowing fabric that moves beautifully and flatters every figure.' },
        { name: 'The Silk Shirt', description: 'Oversized, in a sunset hue—versatile enough for day and evening.' },
        { name: 'Leather Accessories', description: 'A structured bag in cognac and matching belt with artisanal hardware.' },
        { name: 'The Column Dress', description: 'Simple, floor-length, and impossibly elegant in a single color.' },
        { name: 'Woven Leather Sandals', description: 'Handcrafted Italian leather, the quintessential summer essential.' },
        { name: 'The Cashmere Knit', description: 'Lightweight, perfect for cool Mediterranean evenings.' },
        { name: 'Statement Earrings', description: 'Gold, architectural shapes that frame the face beautifully.' },
        { name: 'The Trench Coat', description: 'In an unexpected color like sage or dusty rose.' },
        { name: 'Quality Sunglasses', description: 'Italian-made, oversized frames that exude la dolce vita.' }
      ]
    },
    section4: {
      number: 'Section 04',
      title: 'Hidden Boutiques Guide',
      intro: 'These are Milan\'s best-kept secrets—boutiques where the city\'s most stylish locals shop, away from tourist crowds:',
      boutiques: [
        { name: 'Biffi Boutique', address: 'Corso Genova, 6 · Navigli', description: 'A curated selection of avant-garde designers alongside Italian classics. Ask for the private viewing room upstairs.' },
        { name: 'Clan Upstairs', address: 'Via Tortona, 5 · Tortona', description: 'Hidden above street level, this showroom features emerging Italian designers. Ring the bell and discover fashion\'s future.' },
        { name: 'Wait and See', address: 'Via Santa Marta, 14 · Brera', description: 'Bohemian elegance meets Milanese sophistication. The owner Maria personally curates every piece.' },
        { name: 'Antonia', address: 'Via Cusani, 5 · Brera', description: 'The city\'s most influential multi-brand boutique. Visit the rooftop café after shopping.' }
      ]
    },
    section5: {
      number: 'Section 05',
      title: 'Styling Tips from Milan',
      intro: 'After years of observing Milan\'s most stylish women, here are my essential tips for achieving that effortless Italian elegance:',
      tips: [
        'Layer thoughtfully—Italians master the art of adding a silk scarf or cashmere cardigan draped over shoulders.',
        'Invest in tailoring—Even affordable pieces look luxurious when perfectly fitted to your body.',
        'Less is more—Choose one statement piece and keep everything else understated.',
        'Quality basics—A perfect white t-shirt, well-cut jeans, and leather loafers form the foundation.',
        'Confidence is key—Wear your clothes, don\'t let them wear you. Stand tall and own your style.'
      ]
    },
    cta: {
      title: 'Ready to Transform Your Style?',
      text: 'Experience Milan\'s fashion scene with a personal guide. Book your exclusive shopping tour and discover the boutiques, ateliers, and hidden gems that make Italian style legendary.',
      button: 'Book Your Experience'
    },
    footer: {
      website: 'Website',
      unsubscribe: 'You received this email because you subscribed to our trend report.',
      unsubscribeLink: 'Unsubscribe',
      privacy: 'Your privacy is important to us. We never share your information with third parties.'
    }
  },
  tr: {
    subject: 'Milano İlkbahar/Yaz 2026 Trend Raporunuz',
    title: 'Milano İlkbahar/Yaz 2026',
    subtitle: 'Özel Trend Raporu',
    intro: 'Milano\'nun 2026 İlkbahar/Yaz sezonu için en çok beklenen moda trendlerine özel rehberinize hoş geldiniz. İtalyan modasının kalbinde kişisel stil danışmanınız olarak, bu sezonda stil elitinin ne giydiğine ilk elden erişim sağlamak için bu raporu hazırladım.',
    section1: {
      number: 'Bölüm 01',
      title: 'Takip Edilmesi Gereken Ana Trendler',
      intro: 'Bu sezon, Milano podyumları zarif bir isyanın hikayesini anlattı—klasik İtalyan işçiliğinin cesur modern ifadeyle buluştuğu yer. İşte beş tanımlayıcı trend:',
      trends: [
        { name: 'Mimari Minimalizm', description: 'Sadeliğin güzelliğini kutlayan temiz çizgiler, heykelsi silüetler ve kusursuz dikilmiş parçalar.' },
        { name: 'Gün Batımı Romantizmi', description: 'Akdeniz gün batımlarını çağrıştıran sıcak terrakota, yumuşak mercan ve altın kehribar tonlarında akıcı kumaşlar.' },
        { name: 'Yeni Güç Giyimi', description: 'Yumuşatılmış omuzlu büyük blazerlar, geniş paça pantolonlar ve dikkat çeken özgüvenli kesimler.' },
        { name: 'Zanaatkar Detayları', description: 'İtalyan işçiliğini sergileyen el dikişi nakışlar, zanaatkar düğmeler ve özel bitirişler.' },
        { name: 'Sessiz Lüks', description: 'Olağanüstü malzemeler ve mükemmel kalıp aracılığıyla sade zarafet—zenginlik fısıldanır, asla bağırılmaz.' }
      ],
      highlight: {
        title: 'Gülizar\'ın Seçimi',
        text: 'Bu sezon "sessiz lüks" trendi kişisel favorim. Logolarla değil, kaliteyle konuşan zamansız parçalara yatırım yapmakla ilgili. Mükemmel kesimli bir İtalyan blazer size on yıllar boyunca hizmet edecek.'
      }
    },
    section2: {
      number: 'Bölüm 02',
      title: 'Renk Paleti',
      intro: 'Bu sezonun paleti İtalyan manzarasından ilham alıyor—antik villaların sıcak taşlarından Akdeniz kıyısının mavisine.',
      colors: [
        { name: 'Terrakota', hex: '#C4A484' },
        { name: 'Fildişi', hex: '#FAF8F5' },
        { name: 'Gök Mavisi', hex: '#8FAABE' },
        { name: 'Adaçayı', hex: '#9CAF94' },
        { name: 'Kömür', hex: '#2C2825' }
      ],
      conclusion: 'Bu renkler birlikte güzelce çalışarak, zahmetsizce İtalyan hissettiren sofistike tonal kıyafetler yaratır.'
    },
    section3: {
      number: 'Bölüm 03',
      title: 'En İyi 10 Yatırım Parçası',
      intro: 'Bu sezon yatırım yapmaya değer parçalar—yıllarca gardırobunuzu yükseltecek zamansız öğeler:',
      pieces: [
        { name: 'Keten Blazer', description: 'Krem veya yumuşak terrakotta, o mükemmel rahat İtalyan zarafeti için astarsız.' },
        { name: 'Geniş Paça Pantolon', description: 'Yüksek belli, güzelce hareket eden ve her vücut tipine yakışan akıcı kumaş.' },
        { name: 'İpek Gömlek', description: 'Büyük beden, gün batımı tonunda—gündüz ve akşam için yeterince çok yönlü.' },
        { name: 'Deri Aksesuarlar', description: 'Konyak renginde yapısal bir çanta ve zanaatkar donanımlı uyumlu kemer.' },
        { name: 'Kolon Elbise', description: 'Basit, yere kadar uzun ve tek renkte imkansız derecede zarif.' },
        { name: 'Örgü Deri Sandaletler', description: 'El yapımı İtalyan derisi, mükemmel yaz esası.' },
        { name: 'Kaşmir Örgü', description: 'Hafif, serin Akdeniz akşamları için mükemmel.' },
        { name: 'Dikkat Çekici Küpeler', description: 'Altın, yüzü güzelce çerçeveleyen mimari şekiller.' },
        { name: 'Trençkot', description: 'Adaçayı veya tozlu gül gibi beklenmedik bir renkte.' },
        { name: 'Kaliteli Güneş Gözlüğü', description: 'İtalyan yapımı, la dolce vita yayan büyük çerçeveler.' }
      ]
    },
    section4: {
      number: 'Bölüm 04',
      title: 'Gizli Butikler Rehberi',
      intro: 'Bunlar Milano\'nun en iyi saklanan sırları—şehrin en şık yerlilerinin alışveriş yaptığı, turist kalabalıklarından uzak butikler:',
      boutiques: [
        { name: 'Biffi Boutique', address: 'Corso Genova, 6 · Navigli', description: 'İtalyan klasiklerinin yanında avangard tasarımcıların küratörlü seçimi. Üst kattaki özel izleme odasını isteyin.' },
        { name: 'Clan Upstairs', address: 'Via Tortona, 5 · Tortona', description: 'Sokak seviyesinin üzerinde gizli, bu showroom yükselen İtalyan tasarımcıları sergiliyor. Zili çalın ve modanın geleceğini keşfedin.' },
        { name: 'Wait and See', address: 'Via Santa Marta, 14 · Brera', description: 'Bohem zarafet Milano sofistikasyonuyla buluşuyor. Sahibi Maria her parçayı kişisel olarak seçiyor.' },
        { name: 'Antonia', address: 'Via Cusani, 5 · Brera', description: 'Şehrin en etkili çok markalı butiği. Alışverişten sonra çatı kafesini ziyaret edin.' }
      ]
    },
    section5: {
      number: 'Bölüm 05',
      title: 'Milano\'dan Stil İpuçları',
      intro: 'Milano\'nun en şık kadınlarını yıllarca gözlemledikten sonra, zahmetsiz İtalyan zarafetine ulaşmak için temel ipuçlarım:',
      tips: [
        'Düşünceli katmanlama yapın—İtalyanlar omuzlara dökülen ipek eşarp veya kaşmir hırka ekleme sanatında ustadır.',
        'Terziliğe yatırım yapın—Uygun fiyatlı parçalar bile vücudunuza mükemmel oturduğunda lüks görünür.',
        'Az çoktur—Bir dikkat çekici parça seçin ve diğer her şeyi sade tutun.',
        'Kaliteli temel parçalar—Mükemmel bir beyaz tişört, iyi kesimli kot ve deri loaferlar temeli oluşturur.',
        'Özgüven anahtardır—Kıyafetlerinizi giyin, onların sizi giymesine izin vermeyin. Dik durun ve stilinize sahip çıkın.'
      ]
    },
    cta: {
      title: 'Stilinizi Dönüştürmeye Hazır mısınız?',
      text: 'Milano\'nun moda sahnesini kişisel bir rehberle deneyimleyin. Özel alışveriş turunuzu rezerve edin ve İtalyan stilini efsanevi yapan butikleri, atölyeleri ve gizli mücevherleri keşfedin.',
      button: 'Deneyiminizi Rezerve Edin'
    },
    footer: {
      website: 'Web Sitesi',
      unsubscribe: 'Bu e-postayı trend raporumuza abone olduğunuz için aldınız.',
      unsubscribeLink: 'Abonelikten Çık',
      privacy: 'Gizliliğiniz bizim için önemlidir. Bilgilerinizi asla üçüncü taraflarla paylaşmayız.'
    }
  },
  it: {
    subject: 'Il Tuo Report Tendenze Milano Primavera/Estate 2026',
    title: 'Milano Primavera/Estate 2026',
    subtitle: 'Report Tendenze Esclusivo',
    intro: 'Benvenuta nella tua guida esclusiva alle tendenze moda più attese di Milano per la Primavera/Estate 2026. Come tua consulente di stile personale nel cuore della moda italiana, ho curato questo report per darti accesso in prima persona a ciò che indossa l\'élite dello stile questa stagione.',
    section1: {
      number: 'Sezione 01',
      title: 'Tendenze Chiave da Seguire',
      intro: 'Questa stagione, le passerelle di Milano hanno raccontato una storia di elegante ribellione—dove l\'artigianato italiano classico incontra l\'espressione moderna audace. Ecco le cinque tendenze definitive:',
      trends: [
        { name: 'Minimalismo Architettonico', description: 'Linee pulite, silhouette scultoree e pezzi impeccabilmente sartoriali che celebrano la bellezza della semplicità.' },
        { name: 'Romanticismo del Tramonto', description: 'Tessuti fluidi in calde tonalità terracotta, corallo morbido e ambra dorata che evocano i tramonti mediterranei.' },
        { name: 'Nuovo Power Dressing', description: 'Blazer oversize con spalle ammorbidite, pantaloni a gamba larga e tagli sicuri che catturano l\'attenzione.' },
        { name: 'Dettagli Artigianali', description: 'Ricami cuciti a mano, bottoni artigianali e finiture su misura che mostrano l\'artigianato italiano.' },
        { name: 'Lusso Silenzioso', description: 'Eleganza sobria attraverso materiali eccezionali e vestibilità perfetta—ricchezza sussurrata, mai gridata.' }
      ],
      highlight: {
        title: 'La Scelta di Gülizar',
        text: 'La tendenza del "lusso silenzioso" è la mia preferita questa stagione. Si tratta di investire in pezzi senza tempo che parlano attraverso la qualità, non i loghi. Un blazer italiano tagliato perfettamente ti servirà per decenni.'
      }
    },
    section2: {
      number: 'Sezione 02',
      title: 'La Palette Colori',
      intro: 'La palette di questa stagione trae ispirazione dal paesaggio italiano—dalle pietre calde delle antiche ville all\'azzurro della costa mediterranea.',
      colors: [
        { name: 'Terracotta', hex: '#C4A484' },
        { name: 'Avorio', hex: '#FAF8F5' },
        { name: 'Azzurro', hex: '#8FAABE' },
        { name: 'Salvia', hex: '#9CAF94' },
        { name: 'Carbone', hex: '#2C2825' }
      ],
      conclusion: 'Questi colori funzionano magnificamente insieme, creando outfit tonali sofisticati che sembrano effortlessly italiani.'
    },
    section3: {
      number: 'Sezione 03',
      title: 'Top 10 Pezzi di Investimento',
      intro: 'Questi sono i pezzi su cui vale la pena investire questa stagione—articoli senza tempo che eleveranno il tuo guardaroba per anni:',
      pieces: [
        { name: 'Il Blazer di Lino', description: 'In crema o terracotta morbido, sfoderato per quella perfetta eleganza italiana rilassata.' },
        { name: 'Pantaloni a Gamba Larga', description: 'Vita alta, tessuto fluido che si muove splendidamente e valorizza ogni figura.' },
        { name: 'La Camicia di Seta', description: 'Oversize, in una tonalità tramonto—abbastanza versatile per giorno e sera.' },
        { name: 'Accessori in Pelle', description: 'Una borsa strutturata in cognac e cintura abbinata con ferramenta artigianale.' },
        { name: 'L\'Abito Colonna', description: 'Semplice, fino ai piedi e impossibilmente elegante in un unico colore.' },
        { name: 'Sandali in Pelle Intrecciata', description: 'Pelle italiana fatta a mano, l\'essenziale estivo per eccellenza.' },
        { name: 'Il Maglione di Cashmere', description: 'Leggero, perfetto per le fresche serate mediterranee.' },
        { name: 'Orecchini Statement', description: 'Oro, forme architettoniche che incorniciano magnificamente il viso.' },
        { name: 'Il Trench', description: 'In un colore inaspettato come salvia o rosa antico.' },
        { name: 'Occhiali da Sole di Qualità', description: 'Made in Italy, montature oversize che trasudano la dolce vita.' }
      ]
    },
    section4: {
      number: 'Sezione 04',
      title: 'Guida alle Boutique Nascoste',
      intro: 'Questi sono i segreti meglio custoditi di Milano—boutique dove i locali più stilosi della città fanno shopping, lontano dalle folle turistiche:',
      boutiques: [
        { name: 'Biffi Boutique', address: 'Corso Genova, 6 · Navigli', description: 'Una selezione curata di designer d\'avanguardia accanto ai classici italiani. Chiedi la sala viewing privata al piano superiore.' },
        { name: 'Clan Upstairs', address: 'Via Tortona, 5 · Tortona', description: 'Nascosto sopra il livello della strada, questo showroom presenta designer italiani emergenti. Suona il campanello e scopri il futuro della moda.' },
        { name: 'Wait and See', address: 'Via Santa Marta, 14 · Brera', description: 'L\'eleganza bohémien incontra la sofisticatezza milanese. La proprietaria Maria cura personalmente ogni pezzo.' },
        { name: 'Antonia', address: 'Via Cusani, 5 · Brera', description: 'La boutique multi-brand più influente della città. Visita il caffè sul tetto dopo lo shopping.' }
      ]
    },
    section5: {
      number: 'Sezione 05',
      title: 'Consigli di Stile da Milano',
      intro: 'Dopo anni di osservazione delle donne più stilose di Milano, ecco i miei consigli essenziali per raggiungere quell\'eleganza italiana effortless:',
      tips: [
        'Stratifica con attenzione—Le italiane padroneggiano l\'arte di aggiungere una sciarpa di seta o un cardigan di cashmere drappeggiato sulle spalle.',
        'Investi in sartoria—Anche i pezzi accessibili sembrano lussuosi quando perfettamente adattati al tuo corpo.',
        'Meno è più—Scegli un pezzo statement e mantieni tutto il resto sobrio.',
        'Basici di qualità—Una t-shirt bianca perfetta, jeans ben tagliati e mocassini in pelle formano le fondamenta.',
        'La sicurezza è fondamentale—Indossa i tuoi vestiti, non lasciare che siano loro a indossare te. Stai dritta e possiedi il tuo stile.'
      ]
    },
    cta: {
      title: 'Pronta a Trasformare il Tuo Stile?',
      text: 'Vivi la scena della moda milanese con una guida personale. Prenota il tuo tour shopping esclusivo e scopri le boutique, gli atelier e le gemme nascoste che rendono leggendario lo stile italiano.',
      button: 'Prenota la Tua Esperienza'
    },
    footer: {
      website: 'Sito Web',
      unsubscribe: 'Hai ricevuto questa email perché ti sei iscritto al nostro report tendenze.',
      unsubscribeLink: 'Cancellati',
      privacy: 'La tua privacy è importante per noi. Non condividiamo mai le tue informazioni con terze parti.'
    }
  }
};

/**
 * POST /api/email/send-trend-report
 * Send Milan Spring/Summer 2026 Trend Report to subscriber
 */
router.post('/send-trend-report', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please set SENDGRID_API_KEY in environment variables.'
      });
    }

    const { to, language = 'en', consentDate } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email address is required'
      });
    }

    // Validate language
    const validLanguages = ['en', 'tr', 'it'];
    const lang = validLanguages.includes(language) ? language : 'en';
    const content = TREND_REPORT_CONTENT[lang];

    const msg = {
      to,
      from: {
        email: process.env.FROM_EMAIL || 'vestilizamilano@gmail.com',
        name: 'Gülizar Ermiş - Vestiliza'
      },
      subject: content.subject,
      html: generateTrendReportEmailHTML(lang),
      text: `${content.title}\n\n${content.intro}\n\nVisit https://vestiliza.com to learn more about our exclusive fashion experiences in Milan.\n\nBest regards,\nGülizar Ermiş\nVestiliza Fashion Consultancy\nMilano, Italia`,
      categories: ['trend-report', 'newsletter'],
      customArgs: {
        consentDate: consentDate || new Date().toISOString(),
        language: lang
      }
    };

    await sgMail.send(msg);

    // Log successful send for analytics
    console.log(`Trend report sent successfully to ${to} (language: ${lang})`);

    res.json({
      success: true,
      message: 'Trend report sent successfully'
    });
  } catch (error) {
    console.error('Error sending trend report:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send trend report'
    });
  }
});

export { router as emailRoutes };

