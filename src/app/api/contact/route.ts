/**
 * ============================================================
 * RED ELEPHANT TRAVELS — Secure Email API Route
 * ============================================================
 * File: src/app/api/contact/route.ts
 *
 * This is an App Router API route (Next.js 13+).
 * ALL Resend API keys stay here — the frontend never sees them.
 *
 * Handles multiple form types:
 *  - 'contact'   → Contact page form
 *  - 'enquiry'   → Homepage CTA / Enquiry form
 *  - 'wellness'  → Wellness page enquiry
 *  - 'wedding'   → Weddings page enquiry
 * ============================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── Initialize Resend with your secret API key from .env.local ──
if (!process.env.RESEND_API_KEY) {
  console.error('[API /contact] CRITICAL: RESEND_API_KEY is missing from environment variables.');
}
const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'slahiru018@gmail.com';

console.log('[API /contact] Route initialized. Admin email:', ADMIN_EMAIL);

/**
 * Basic input sanitizer — strips HTML tags and trims whitespace.
 * Prevents HTML injection in emails.
 */
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
    .slice(0, 2000); // hard limit — prevents oversized payloads
}

/**
 * Email validator regex.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Shared brand colors for HTML emails ──
const BRAND = {
  dark: '#0A0705',
  cream: '#F8F5F0',
  gold: '#C9A96E',
  crimson: '#C41E3A',
  muted: '#8A8074',
  white: '#FFFFFF',
};

/**
 * Wraps any email body in a consistent branded outer shell.
 */
function emailShell(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Red Elephant Travels</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);">
          <!-- Header Band -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.dark} 0%,#3A0A14 100%);padding:32px 40px;text-align:center;">
              <div style="display:inline-block;border:1px solid ${BRAND.gold}44;padding:4px 20px;margin-bottom:16px;">
                <span style="font-family:Georgia,serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${BRAND.gold};">Red Elephant Travels</span>
              </div>
              <div style="width:40px;height:1px;background:${BRAND.gold};margin:0 auto;"></div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.dark};padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:${BRAND.gold};letter-spacing:2px;text-transform:uppercase;">Red Elephant Travels &amp; Tours</p>
              <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.4);">50/5 Rajamahavihara Road, Mirihana, Kotte, Sri Lanka</p>
              <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.4);">+94 77 315 71 71 &nbsp;|&nbsp; redelephant.trv@gmail.com</p>
              <p style="margin:12px 0 0;font-size:10px;color:rgba(255,255,255,0.2);">© ${new Date().getFullYear()} Red Elephant Travels. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * ── ADMIN email templates ──
 * One per form type so the admin sees exactly what was submitted.
 */
function buildAdminEmail(type: string, fields: Record<string, string>): string {
  const submittedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Colombo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const row = (label: string, value: string) =>
    value
      ? `<tr>
                 <td style="padding:10px 16px;font-size:13px;font-family:Georgia,serif;color:${BRAND.muted};text-transform:uppercase;letter-spacing:1px;width:140px;vertical-align:top;">${label}</td>
                 <td style="padding:10px 16px;font-size:14px;font-family:Georgia,serif;color:${BRAND.dark};border-bottom:1px solid #f0ede8;">${sanitize(value)}</td>
               </tr>`
      : '';

  const typeLabel: Record<string, string> = {
    contact: 'Contact Page Enquiry',
    enquiry: 'Travel Enquiry (CTA Form)',
    wellness: 'Wellness Retreat Enquiry',
    wedding: 'Wedding & Events Enquiry',
  };

  const tableRows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => row(k.replace(/_/g, ' '), v))
    .join('');

  const body = `
      <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:400;color:${BRAND.dark};margin:0 0 6px;">New ${typeLabel[type] || 'Form'} Received</h2>
      <p style="margin:0 0 30px;font-size:13px;color:${BRAND.muted};">${submittedAt} (Sri Lanka Standard Time)</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #f0ede8;border-radius:8px;overflow:hidden;margin-bottom:30px;">
        ${tableRows}
      </table>

      <div style="background:${BRAND.cream};border-left:3px solid ${BRAND.gold};padding:16px 20px;border-radius:0 8px 8px 0;">
        <p style="margin:0;font-size:13px;color:${BRAND.muted};">Reply directly to this email or contact the client at <a href="mailto:${sanitize(fields['Email'] || fields['email'])}" style="color:${BRAND.crimson};">${sanitize(fields['Email'] || fields['email'])}</a></p>
      </div>`;

  return emailShell(body);
}

/**
 * ── USER confirmation email ──
 * Friendly, branded, and personalised.
 */
function buildUserEmail(name: string, formType: string): string {
  const messages: Record<string, { subject: string; heading: string; body: string }> = {
    contact: {
      subject: 'We received your message — Red Elephant Travels',
      heading: 'Thank You for Getting in Touch',
      body: 'We\'ve received your message and our travel experts will get back to you within 24 hours to discuss how we can craft your perfect Sri Lanka journey.',
    },
    enquiry: {
      subject: 'Your Sri Lanka Enquiry — Red Elephant Travels',
      heading: 'Your Enquiry Has Been Sent ✓',
      body: 'Thank you for choosing Red Elephant Travels! Our expert travel designers have received your enquiry and will be in touch within 24 hours to start building your bespoke itinerary.',
    },
    wellness: {
      subject: 'Your Wellness Journey Begins — Red Elephant Travels',
      heading: 'Your Wellness Enquiry is Confirmed',
      body: 'Our wellness concierge has received your enquiry and will contact you within 24 hours to personalise your sanctuary experience. Your journey to inner stillness starts here.',
    },
    wedding: {
      subject: 'Your Wedding Enquiry — Red Elephant Travels',
      heading: 'We\'ve Received Your Wedding Enquiry',
      body: 'Every grand love story begins with a single conversation. Our dedicated wedding concierge has received your enquiry and will be in touch within 24 hours to begin crafting your perfect celebration.',
    },
  };

  const msg = messages[formType] || messages.contact;
  const firstName = name.split(' ')[0] || 'there';

  const body = `
      <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:${BRAND.dark};margin:0 0 10px;">${msg.heading}</h2>
      <p style="margin:0 0 28px;font-size:16px;color:${BRAND.muted};">Dear ${sanitize(firstName)},</p>

      <p style="font-size:15px;line-height:1.8;color:#4A4745;margin:0 0 28px;">${msg.body}</p>

      <!-- What Happens Next -->
      <div style="background:${BRAND.cream};border-radius:10px;padding:28px;margin-bottom:32px;">
        <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};margin:0 0 20px;">What Happens Next</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#4A4745;vertical-align:top;">
              <span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:${BRAND.dark};color:${BRAND.gold};text-align:center;line-height:28px;font-size:12px;margin-right:12px;">1</span>
              Our team reviews your enquiry within a few hours
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#4A4745;vertical-align:top;">
              <span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:${BRAND.dark};color:${BRAND.gold};text-align:center;line-height:28px;font-size:12px;margin-right:12px;">2</span>
              A personal travel expert will contact you within 24 hours
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#4A4745;vertical-align:top;">
              <span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:${BRAND.dark};color:${BRAND.gold};text-align:center;line-height:28px;font-size:12px;margin-right:12px;">3</span>
              We craft a completely bespoke itinerary just for you
            </td>
          </tr>
        </table>
      </div>

      <!-- Contact Details -->
      <div style="border-top:1px solid #f0ede8;padding-top:28px;">
        <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};margin:0 0 16px;">Need Immediate Assistance?</p>
        <p style="margin:0 0 8px;font-size:14px;color:#4A4745;">📞 <a href="tel:+94773157171" style="color:${BRAND.crimson};text-decoration:none;">+94 77 315 71 71</a></p>
        <p style="margin:0 0 8px;font-size:14px;color:#4A4745;">✉ <a href="mailto:redelephant.trv@gmail.com" style="color:${BRAND.crimson};text-decoration:none;">redelephant.trv@gmail.com</a></p>
        <p style="margin:0;font-size:14px;color:#4A4745;">🌐 <a href="https://redelephanttravels.com" style="color:${BRAND.crimson};text-decoration:none;">redelephanttravels.com</a></p>
      </div>`;

  return emailShell(body);
}

// ============================================================
// POST Handler — main entry point for all form submissions
// ============================================================
export async function POST(request: NextRequest) {
  try {
    // ── 1. Parse the request body ──
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    // ── 2. Extract and sanitize common required fields ──
    const formType = sanitize(String(body.formType || 'contact'));
    const name = sanitize(String(body.name || ''));
    const email = sanitize(String(body.email || ''));

    // ── 3. Validate required fields ──
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 422 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 422 });
    }

    // ── 4. Build a field map for the admin email (form-type-specific) ──
    let adminFields: Record<string, string> = {};

    if (formType === 'contact') {
      adminFields = {
        'Name': name,
        'Email': email,
        'Subject': sanitize(String(body.subject || '')),
        'Message': sanitize(String(body.message || '')),
      };
    } else if (formType === 'enquiry') {
      adminFields = {
        'Name': name,
        'Email': email,
        'Phone': sanitize(String(body.phone || '')),
        'Package': sanitize(String(body.pkg || '')),
        'Guests': sanitize(String(body.guests || '')),
        'Arrival Date': sanitize(String(body.from || '')),
        'Departure Date': sanitize(String(body.to || '')),
        'Message': sanitize(String(body.message || '')),
      };
    } else if (formType === 'wellness') {
      adminFields = {
        'Name': name,
        'Email': email,
        'Intention': sanitize(String(body.intention || '')),
      };
    } else if (formType === 'wedding') {
      adminFields = {
        'Name': name,
        'Email': email,
        'Proposed Date': sanitize(String(body.date || '')),
        'Guest Count': sanitize(String(body.guestCount || '')),
        'Package Selected': sanitize(String(body.selectedPackage || '')),
        'Vision': sanitize(String(body.vision || '')),
      };
    } else {
      // Generic fallback
      adminFields = { 'Name': name, 'Email': email };
    }

    // ── 5. Build email content ──
    const adminHtml = buildAdminEmail(formType, adminFields);
    const userHtml = buildUserEmail(name, formType);

    const subjectMap: Record<string, string> = {
      contact: `📩 New Contact Enquiry from ${name}`,
      enquiry: `🌴 New Travel Enquiry from ${name}`,
      wellness: `🌿 New Wellness Enquiry from ${name}`,
      wedding: `💍 New Wedding Enquiry from ${name}`,
    };
    const adminSubject = subjectMap[formType] || `New Enquiry from ${name}`;

    // ── 6. Send both emails concurrently ──
    console.log('[API /contact] Sending emails via Resend...', {
      adminTo: ADMIN_EMAIL,
      userTo: email,
      formType,
    });

    const [adminResult, userResult] = await Promise.allSettled([
      // Email TO admin
      resend.emails.send({
        from: 'Red Elephant Sri Lanka <noreply@redelephantsrilanka.com>', // use your verified domain later
        to: [ADMIN_EMAIL],
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      }),
      // Confirmation email TO user
      resend.emails.send({
        from: 'Red Elephant Sri Lanka <noreply@redelephantsrilanka.com>',
        to: [email],
        subject: 'We received your enquiry — Red Elephant Travels',
        html: userHtml,
      }),
    ]);

    const adminInfo = adminResult.status === 'fulfilled' ? (adminResult.value as any).data : null;
    const userInfo = userResult.status === 'fulfilled' ? (userResult.value as any).data : null;

    console.log('[API /contact] Resend Complete:', {
      adminId: adminInfo?.id,
      userId: userInfo?.id,
    });

    // ── 7. Check for failures ──
    const adminFailed = adminResult.status === 'rejected' || (adminResult.status === 'fulfilled' && (adminResult.value as any).error);
    const userFailed = userResult.status === 'rejected' || (userResult.status === 'fulfilled' && (userResult.value as any).error);

    if (adminFailed) {
      const error = adminResult.status === 'rejected' ? adminResult.reason : (adminResult.value as any).error;
      console.error('[Resend] Admin email failed:', error);
      return NextResponse.json(
        { error: 'Failed to send your enquiry. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    if (userFailed) {
      const error = userResult.status === 'rejected' ? userResult.reason : (userResult.value as any).error;
      console.warn('[Resend] Confirmation email to user failed:', error);
    }

    // ── 8. Success ──
    console.log('[API /contact] Enquiry processed. Admin Email ID:', adminInfo?.id);
    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received. We will contact you within 24 hours.',
        id: adminInfo?.id, // Return ID for debugging
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /contact] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
