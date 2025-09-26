import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const body = req.body;
    if (!body || !body.visitor_id) {
      return res.status(400).json({ error: 'Missing visitor_id' });
    }

    await supabase.from('visitor_tracking').insert({
      visitor_id: body.visitor_id,
      params: body.params || {},
      first_touch_at: body.first_touch_at,
      last_touch_at: body.last_touch_at,
      referrer: body.referrer
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'DB insert failed' });
  }
}
