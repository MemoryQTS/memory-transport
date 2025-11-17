exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const { to, subject, text } = JSON.parse(event.body);
    
    await sgMail.send({
      to: to,
      from: {
        email: 'memory.transport@qtslimo.com',
        name: 'Memory Transport by QTS'
      },
      subject: subject,
      text: text,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('SendGrid Error:', error.response ? error.response.body : error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
