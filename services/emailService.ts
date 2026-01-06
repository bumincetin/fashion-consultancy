/**
 * Email Service
 * Handles sending booking request emails to Gülizar and confirmation emails to customers
 * 
 * NOTE: This service requires a backend API endpoint to securely handle email sending.
 * The backend should use an email service like SendGrid, Nodemailer, or similar.
 */

export interface BookingRequestEmail {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  serviceDescription: string;
  date: string;
  time: string;
  duration: string;
  bookingId: string;
}

export interface BookingResponse {
  bookingId: string;
  action: 'accept' | 'reject' | 'request-change';
  message?: string;
}

/**
 * Send booking request email to Gülizar
 * This email includes accept/reject links
 */
export async function sendBookingRequestToGulizar(
  bookingData: BookingRequestEmail
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/email/send-booking-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'vestilizamilano@gmail.com',
        subject: `New Booking Request: ${bookingData.serviceName} - ${bookingData.customerName}`,
        bookingData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send booking request email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending booking request email:', error);
    return {
      success: false,
      message: 'Failed to send booking request email',
    };
  }
}

/**
 * Send confirmation email to customer
 * Confirms that Gülizar has received their booking request
 */
export async function sendCustomerConfirmation(
  customerEmail: string,
  customerName: string,
  bookingData: BookingRequestEmail
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/email/send-customer-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: customerEmail,
        subject: 'Booking Request Received - Gülizar Ermiş Fashion Consultancy',
        customerName,
        bookingData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send customer confirmation email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email',
    };
  }
}

/**
 * Send response email to customer
 * Sent when Gülizar accepts, rejects, or requests changes
 */
export async function sendBookingResponseToCustomer(
  customerEmail: string,
  customerName: string,
  response: BookingResponse
): Promise<{ success: boolean; message?: string }> {
  try {
    const responseData = await fetch('/api/email/send-booking-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Booking ${response.action === 'accept' ? 'Confirmed' : response.action === 'reject' ? 'Declined' : 'Update Request'} - Gülizar Ermiş`,
        customerName,
        response,
      }),
    });

    if (!responseData.ok) {
      throw new Error('Failed to send booking response email');
    }

    const data = await responseData.json();
    return data;
  } catch (error) {
    console.error('Error sending booking response email:', error);
    return {
      success: false,
      message: 'Failed to send booking response email',
    };
  }
}

/**
 * Generate a unique booking ID
 */
export function generateBookingId(): string {
  return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Format date for email display
 * Accepts date in YYYY-MM-DD format
 */
export function formatDateForEmail(date: string, lang: 'en' | 'tr' | 'it' = 'en'): string {
  // Ensure date is in correct format (YYYY-MM-DD)
  const dateObj = new Date(date + 'T00:00:00'); // Add time to avoid timezone issues
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const locales = {
    en: 'en-US',
    tr: 'tr-TR',
    it: 'it-IT',
  };

  return dateObj.toLocaleDateString(locales[lang], options);
}

/**
 * Format time for email display
 */
export function formatTimeForEmail(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

