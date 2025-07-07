const Search = require('../models/search');

exports.search = (req, res, next) => {
  const { q, type, limit } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });
  let types = ['songs', 'artists', 'albums', 'playlists'];
  if (type) {
    types = type.split(',').map(t => t.trim()).filter(t => types.includes(t));
    if (types.length === 0) return res.status(400).json({ error: 'Invalid type' });
  }
  const lim = limit ? parseInt(limit, 10) : 10;
  Search.multiEntity(q, types, lim, (err, results) => {
    if (err) return next(err);
    res.json({ success: true, results });
  });
}; 