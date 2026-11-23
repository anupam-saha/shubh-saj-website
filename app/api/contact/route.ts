import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const service = String(body.service ?? '').trim();
    const message = String(body.message ?? '').trim();
    // Honeypot field: real visitors should leave this blank.
    if (body.website) return NextResponse.json({ ok: true });
    if (!name || !phone || !service || !/^\+?[0-9\s()-]{8,18}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter your name, a valid phone number and select a service.' }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      return NextResponse.json({ error: 'The enquiry form is not configured yet. Please contact us on WhatsApp.' }, { status: 503 });
    }
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from, to, replyTo: email || undefined,
      subject: `New SHUBHSAJ enquiry — ${service}`,
      text: `New website enquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nService: ${service}\nMessage: ${message || 'Not provided'}\n\nReply to this customer to discuss their requirements.`
    });
    console.log('Resend result:', result);
    if (result.error) return NextResponse.json({ error: 'We could not send your enquiry right now. Please try WhatsApp instead.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error sending enquiry:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again or contact us on WhatsApp.' }, { status: 500 });
  }
}
