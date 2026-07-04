const data = {};

module.exports = function handler(req, res) {
  const app = req.query && req.query.app;
  if (!app) return res.status(400).json({ error: 'missing app' });

  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;

  if (!data[app]) data[app] = [];
  const last = data[app][data[app].length - 1];
  const action = (!last || last.action === 'close') ? 'open' : 'close';
  data[app].push({ action, time: now });
  data[app] = data[app].filter(e => e.time > cutoff);

  res.json({ app, action, time: now, log: data[app] });
}
