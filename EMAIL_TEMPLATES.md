# Email Templates for Booking System

This document contains the email templates that should be used by the backend API when sending booking-related emails.

## 1. Booking Request Email to Gülizar

**To:** vestilizamilano@gmail.com  
**Subject:** New Booking Request: [Service Name] - [Customer Name]

### HTML Template

```html
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
    .btn { display: inline-block; padding: 12px 30px; margin: 0 10px; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .btn-accept { background: #2C2825; color: #FAF8F5; }
    .btn-reject { background: #D4A5A5; color: #FAF8F5; }
    .btn-change { background: #C4A484; color: #FAF8F5; }
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
          <span>{{customerName}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span>{{customerEmail}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span>{{serviceName}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Description:</span>
          <span>{{serviceDescription}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span>{{date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span>{{time}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration:</span>
          <span>{{duration}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span>{{bookingId}}</span>
        </div>
      </div>

      <div class="action-buttons">
        <p>Please review and respond to this booking request:</p>
        <a href="{{acceptUrl}}" class="btn btn-accept">Accept Booking</a>
        <a href="{{rejectUrl}}" class="btn btn-reject">Reject Booking</a>
        <a href="{{changeUrl}}" class="btn btn-change">Request Changes</a>
      </div>

      <p style="margin-top: 30px;">The customer will be notified of your response automatically.</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
```

### Plain Text Template

```
Dear Gülizar,

You have received a new booking request for your fashion consultancy services.

BOOKING DETAILS:
-----------------
Customer: {{customerName}}
Email: {{customerEmail}}
Service: {{serviceName}}
Description: {{serviceDescription}}
Date: {{date}}
Time: {{time}}
Duration: {{duration}}
Booking ID: {{bookingId}}

Please review and respond to this booking request:

Accept: {{acceptUrl}}
Reject: {{rejectUrl}}
Request Changes: {{changeUrl}}

The customer will be notified of your response automatically.

Best regards,
Booking System

---
Gülizar Ermiş Fashion Consultancy
Milano, Italy
```

## 2. Customer Confirmation Email

**To:** [Customer Email]  
**Subject:** Booking Request Received - Gülizar Ermiş Fashion Consultancy

### HTML Template

```html
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
      <p>Dear {{customerName}},</p>
      <p>Thank you for your booking request! We have successfully received your request and Gülizar has been notified.</p>
      
      <div class="booking-summary">
        <h2 style="margin-top: 0; color: #2C2825;">Your Booking Request</h2>
        <p><strong>Service:</strong> {{serviceName}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Duration:</strong> {{duration}}</p>
        <p><strong>Booking ID:</strong> {{bookingId}}</p>
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
```

## 3. Booking Accepted Email to Customer

**To:** [Customer Email]  
**Subject:** Booking Confirmed - Gülizar Ermiş Fashion Consultancy

### HTML Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    .confirmation-box { background: #C4A484; color: #FAF8F5; padding: 20px; margin: 20px 0; text-align: center; border-radius: 5px; }
    .booking-details { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #C4A484; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">Booking Confirmed!</h1>
    </div>
    <div class="content">
      <div class="confirmation-box">
        <h2 style="margin: 0;">✓ Your booking has been confirmed!</h2>
      </div>

      <p>Dear {{customerName}},</p>
      <p>Great news! Gülizar has confirmed your booking request.</p>
      
      <div class="booking-details">
        <h2 style="margin-top: 0; color: #2C2825;">Confirmed Booking Details</h2>
        <p><strong>Service:</strong> {{serviceName}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Duration:</strong> {{duration}}</p>
        <p><strong>Booking ID:</strong> {{bookingId}}</p>
      </div>

      <p>A calendar invitation has been sent to your email address. Please add it to your calendar to ensure you don't miss your appointment.</p>
      
      <p>If you need to make any changes or have questions, please contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a>.</p>

      <p>We're excited to work with you and look forward to providing you with an exceptional fashion experience!</p>
      
      <p>Best regards,<br>Gülizar Ermiş<br>Fashion Consultancy</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
```

## 4. Booking Rejected Email to Customer

**To:** [Customer Email]  
**Subject:** Booking Update - Gülizar Ermiş Fashion Consultancy

### HTML Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    .message-box { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #D4A5A5; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">Booking Update</h1>
    </div>
    <div class="content">
      <p>Dear {{customerName}},</p>
      <p>Thank you for your booking request. Unfortunately, Gülizar is unable to accommodate your requested time slot.</p>
      
      <div class="message-box">
        <h2 style="margin-top: 0; color: #2C2825;">Requested Booking</h2>
        <p><strong>Service:</strong> {{serviceName}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Booking ID:</strong> {{bookingId}}</p>
      </div>

      {{#if message}}
      <p><strong>Message from Gülizar:</strong></p>
      <p style="font-style: italic;">{{message}}</p>
      {{/if}}

      <p>We encourage you to submit a new booking request with alternative dates or times. We'd love to work with you!</p>
      
      <p>If you have any questions, please contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a>.</p>

      <p>Best regards,<br>Gülizar Ermiş<br>Fashion Consultancy</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
```

## 5. Booking Change Request Email to Customer

**To:** [Customer Email]  
**Subject:** Booking Change Request - Gülizar Ermiş Fashion Consultancy

### HTML Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #2C2825; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FAF8F5; padding: 30px; text-align: center; border-bottom: 2px solid #C4A484; }
    .content { padding: 30px; background: #FFFFFF; }
    .change-box { background: #FAF8F5; padding: 20px; margin: 20px 0; border-left: 4px solid #C4A484; }
    .footer { text-align: center; padding: 20px; color: #8C847A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #2C2825;">Booking Change Request</h1>
    </div>
    <div class="content">
      <p>Dear {{customerName}},</p>
      <p>Gülizar has reviewed your booking request and would like to suggest some changes to better accommodate your needs.</p>
      
      <div class="change-box">
        <h2 style="margin-top: 0; color: #2C2825;">Your Original Request</h2>
        <p><strong>Service:</strong> {{serviceName}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Booking ID:</strong> {{bookingId}}</p>
      </div>

      {{#if message}}
      <p><strong>Message from Gülizar:</strong></p>
      <p style="font-style: italic; background: #FAF8F5; padding: 15px; border-left: 4px solid #C4A484;">{{message}}</p>
      {{/if}}

      <p>Please reply to this email or contact us at <a href="mailto:vestilizamilano@gmail.com">vestilizamilano@gmail.com</a> to discuss the proposed changes and find a suitable alternative.</p>

      <p>We look forward to working with you!</p>
      
      <p>Best regards,<br>Gülizar Ermiş<br>Fashion Consultancy</p>
    </div>
    <div class="footer">
      <p>Gülizar Ermiş Fashion Consultancy<br>Milano, Italy</p>
    </div>
  </div>
</body>
</html>
```

## URL Parameters for Action Links

The action URLs in Gülizar's email should include the booking ID and action type:

- **Accept URL:** `https://yourdomain.com/api/booking/respond?bookingId={{bookingId}}&action=accept`
- **Reject URL:** `https://yourdomain.com/api/booking/respond?bookingId={{bookingId}}&action=reject`
- **Change URL:** `https://yourdomain.com/api/booking/respond?bookingId={{bookingId}}&action=request-change`

These URLs should trigger the backend to:
1. Update the booking status
2. Send the appropriate response email to the customer
3. Update/create the calendar event accordingly

