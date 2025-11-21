export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Quotes`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable Error:', data);
      return res.status(response.status).json({ error: data.error });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Get Quotes Error:', error);
    return res.status(500).json({ error: error.message });
  }
}