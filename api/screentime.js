const data = {};

export default function handler(req, res) {
  const parts = req.url.split('/');
  const app = parts[parts.length - 1].split('?')[0];
  
  if (!app || app === 'screentime') return res.json(data);

  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;

  if (!data[app]) data[app] = [];
  const last = data[app][data[app].length - 1];
  const action = (!last || last.action === 'close') ? 'open' : 'close';
  data[app].push({ action, time: now });
  data[app] = data[app].filter(e => e.time > cutoff);

  res.json({ app, action, time: now, log: data[app] });
}
