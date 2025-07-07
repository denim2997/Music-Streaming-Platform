const db = require('../config/database');

const Subscription = {
  getByUserId: (user_id, cb) => {
    db.get('SELECT s.* FROM subscriptions s JOIN users u ON u.subscription_id = s.id WHERE u.id = ?', [user_id], cb);
  },
  upgrade: (user_id, plan_type, expiry, cb) => {
    db.get('SELECT id FROM subscriptions WHERE plan_type = ?', [plan_type], (err, row) => {
      if (err) return cb(err);
      if (!row) return cb(new Error('Subscription plan not found'));
      db.run('UPDATE users SET subscription_id = ? WHERE id = ?', [row.id, user_id], cb);
    });
  },
  getAllPlans: (cb) => {
    db.all('SELECT * FROM subscriptions', [], cb);
  }
};

module.exports = Subscription; 