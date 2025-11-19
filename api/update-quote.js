export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  try {
    const { recordId, fields } = req.body;

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Quotes/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Airtable Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
