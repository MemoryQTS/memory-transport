const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const { to, subject, text } = req.body;
    
    await sgMail.send({
      to: to,
      from: {
        email: 'memory.transport@qtslimo.com',
        name: 'Memory Transport by QTS'
      },
      subject: subject,
      text: text,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid Error:', error.response ? error.response.body : error);
    return res.status(500).json({ error: error.message });
  }
}
