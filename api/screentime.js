const data = {};
export default (req, res) => {
  const app = req.query.app;
  if (!app) return res.json({ error: 'missing app' });
  if (!data[app]) data[app] = [];
  const last = data[app].slice(-1)[0];
  const action = !last || last.action === 'close' ? 'open' : 'close';
  data[app].push({ action, time: Date.now() });
  res.json({ app, action, log: data[app] });
};
