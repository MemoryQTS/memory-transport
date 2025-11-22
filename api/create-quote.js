export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  try {
    const quoteData = req.body;

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
            'Tape Count By Type': quoteData.types,
            Tier: quoteData.tier,
            Addons: quoteData.addons || '',
            Status: 'Pending',
            'Quote Submitted': new Date().toISOString(),
            'Current Location': 'Client Location'
          },
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json({ success: true, record: data });
  } catch (error) {
    console.error('Airtable Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
