import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
    }

    const response = await resend.emails.send({
      from: 'Brand Command <onboarding@resend.dev>',
      to: 'creativeanalyticalmarketing@gmail.com',
      subject: 'New Presence Foundation Assessment',
      html: `
        <h1>Brand Command Assessment Submission</h1>
        <pre>${JSON.stringify(body, null, 2)}</pre>
      `,
    });

    return Response.json({ success: true, response });
  } catch (error) {
    console.error('EMAIL ERROR:', error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}