export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body || !body.visitor_id) {
      return res.status(400).json({ error: 'Missing visitor_id' });
    }

    // Aqui você pode salvar em um banco depois (Redis, Supabase, etc.)
    // Por enquanto só vamos logar no console do Vercel
    console.log("Track recebido:", body);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Erro:", e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
