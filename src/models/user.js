const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = {
  findByEmail: (email, cb) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], cb);
  },
  findByUsername: (username, cb) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], cb);
  },
  create: async ({ email, username, password, dob, country, subscription_id }, cb) => {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (email, username, password, dob, country, subscription_id) VALUES (?, ?, ?, ?, ?, ?)',
      [email, username, hash, dob, country, subscription_id],
      function (err) {
        if (err) return cb(err);
        cb(null, { id: this.lastID, email, username, dob, country, subscription_id });
      }
    );
  },
  verifyPassword: async (user, password) => {
    return bcrypt.compare(password, user.password);
  },
  findById: (id, cb) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], cb);
  },
  updateProfile: (id, { displayName, imageUrl }, cb) => {
    db.run('UPDATE users SET username = ?, image_url = ? WHERE id = ?', [displayName, imageUrl, id], cb);
  },
  followUser: (follower_id, following_id, cb) => {
    db.run('INSERT OR IGNORE INTO following (follower_id, following_id) VALUES (?, ?)', [follower_id, following_id], cb);
  },
  unfollowUser: (follower_id, following_id, cb) => {
    db.run('DELETE FROM following WHERE follower_id = ? AND following_id = ?', [follower_id, following_id], cb);
  },
  getFollowers: (user_id, cb) => {
    db.all('SELECT u.* FROM following f JOIN users u ON f.follower_id = u.id WHERE f.following_id = ?', [user_id], cb);
  },
  getFollowing: (user_id, cb) => {
    db.all('SELECT u.* FROM following f JOIN users u ON f.following_id = u.id WHERE f.follower_id = ?', [user_id], cb);
  },
  updateSubscription: (user_id, subscription_id, cb) => {
    db.run('UPDATE users SET subscription_id = ? WHERE id = ?', [subscription_id, user_id], cb);
  },
  delete: (id, cb) => {
    db.run('DELETE FROM users WHERE id = ?', [id], cb);
  }
};

module.exports = User; 