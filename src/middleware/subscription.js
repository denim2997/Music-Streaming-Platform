const db = require('../config/database');

module.exports = (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  db.get('SELECT s.plan_type FROM subscriptions s JOIN users u ON u.subscription_id = s.id WHERE u.id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!row || row.plan_type !== 'premium') {
      return res.status(403).json({ error: 'Premium subscription required' });
    }
    next();
  });
}; 