(function () {
  const COOKIE_NAME   = 'sellum_track';
  const COOKIE_DAYS   = 360;
  const COOKIE_DOMAIN = '.dicasdopilhado.com'; 
  const API_ENDPOINT  = 'https://project-tskj7.vercel.app/api/track-presell';

  const KEYS_UTM = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  const KEYS_CLI = ['fbclid','gclid','msclkid','ttclid'];

  function parseQuery() {
    const out = {};
    const q = window.location.search.slice(1);
    if (!q) return out;
    q.split('&').forEach(p => {
      if (!p) return;
      const [k, v=''] = p.split('=');
      out[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return out;
  }

  function readCookieRaw(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days, domain) {
    const maxAge = (days || 365) * 24 * 60 * 60;
    let c = name + '=' + encodeURIComponent(value) + ';path=/;max-age=' + maxAge + ';SameSite=Lax';
    if (domain) c += ';domain=' + domain;
    if (location.protocol === 'https:') c += ';Secure';
    document.cookie = c;
  }

  function uuidv4(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=>{
      const r = Math.random()*16|0, v = c==='x'? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function safeGetLS(key) {
    try { return localStorage.getItem(key); } catch(e){ return null; }
  }
  function safeSetLS(key, val) {
    try { localStorage.setItem(key, val); } catch(e){}
  }

  // ===== Captura dos parâmetros =====
  const qs = parseQuery();
  const wanted = {};
  KEYS_UTM.forEach(k => { if (qs[k]) wanted[k] = qs[k]; });
  KEYS_CLI.forEach(k => { if (qs[k]) wanted[k] = qs[k]; });

  const _fbp = readCookieRaw('_fbp');
  if (_fbp && !wanted.fbp) wanted.fbp = _fbp;

  let _fbc = readCookieRaw('_fbc');
  if (!_fbc && qs.fbclid) _fbc = 'fb.1.' + Date.now() + '.' + qs.fbclid;
  if (_fbc && !wanted.fbc) wanted.fbc = _fbc;

  // ===== Criação/atualização do objeto de tracking =====
  let track = null;
  const cookieVal = readCookieRaw(COOKIE_NAME);
  if (cookieVal) {
    try { track = JSON.parse(cookieVal); } catch(e){}
  }
  if (!track) {
    const lsVal = safeGetLS(COOKIE_NAME);
    if (lsVal) {
      try { track = JSON.parse(lsVal); } catch(e){}
    }
  }
  if (!track) {
    track = { 
      visitor_id: uuidv4(),
      first_touch_at: new Date().toISOString(),
      params: {}
    };
  }

  track.params = Object.assign({}, track.params || {}, wanted);
  track.last_touch_at = new Date().toISOString();
  track.referrer = document.referrer || track.referrer || '';

  // ===== Salva em cookie e localStorage =====
  const serialized = JSON.stringify(track);
  setCookie(COOKIE_NAME, serialized, COOKIE_DAYS, COOKIE_DOMAIN);
  safeSetLS(COOKIE_NAME, serialized);

  // ===== Envia para o backend (Vercel → Supabase) =====
  try {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
      keepalive: true
    });
  } catch (e) {
    console.warn('Erro ao enviar para backend:', e);
  }

  // ===== Helper para debug =====
  window.SELLUM_TRACK = {
    get: function(){ 
      try {
        const v = safeGetLS(COOKIE_NAME) || readCookieRaw(COOKIE_NAME);
        return v ? JSON.parse(v) : null;
      } catch(e){ return null; }
    }
  };

})();
