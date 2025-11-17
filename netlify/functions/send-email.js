const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Get SendGrid API key from environment variable
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const data = JSON.parse(event.body);
    
    // Send email
    await sgMail.send({
      to: data.to,
      from: 'memory.transport@qtslimo.com',
      subject: data.subject,
      text: data.text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
