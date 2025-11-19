const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  try {
    const quoteData = JSON.parse(event.body);

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Quotes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: quoteData.name,
            Email: quoteData.email,
            Phone: quoteData.phone,
            Tapes: parseInt(quoteData.tapes),
            Types: quoteData.types,
            Tier: quoteData.tier,
            Addons: quoteData.addons || '',
            Status: 'Pending',
            SubmittedAt: new Date().toISOString(),
          },
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, record: data }),
    };
  } catch (error) {
    console.error('Airtable Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
