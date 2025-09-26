import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { id, target } = req.query;

  if (!id || !target) {
    return res.status(400).send("Missing id or target");
  }

  try {
    // Busca dados no Supabase
    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('params')
      .eq('visitor_id', id)
      .single();

    if (error || !data) {
      console.error("Visitor not found", error);
      return res.status(404).send("Visitor not found");
    }

    // Monta URL final com UTMs
    const finalUrl = new URL(target);
    const params = data.params || {};
    for (const k in params) {
      if (params[k]) {
        finalUrl.searchParams.set(k, params[k]);
      }
    }

    // Faz redirect 302
    res.writeHead(302, { Location: finalUrl.toString() });
    res.end();
  } catch (e) {
    console.error("Redirect error:", e);
    return res.status(500).send("Internal Server Error");
  }
}
