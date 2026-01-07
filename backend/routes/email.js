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

export { router as emailRoutes };

