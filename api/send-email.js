const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(SENDGRID_API_KEY);

  try {
    const { to, subject, text } = req.body;

    const msg = {
      to: to,
      from: 'memory.transport@qtslimo.com',
      subject: subject,
      text: text,
      trackingSettings: {
        clickTracking: {
          enable: false
        }
      }
    };

    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid Error:', error);
    return res.status(500).json({ error: error.message });
  }
}