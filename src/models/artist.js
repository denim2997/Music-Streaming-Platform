const db = require('../config/database');

const Artist = {
  getAll: (cb) => {
    db.all('SELECT * FROM artists', [], cb);
  },
  getById: (id, cb) => {
    db.get('SELECT * FROM artists WHERE id = ?', [id], cb);
  },
  searchByName: (name, cb) => {
    db.all('SELECT * FROM artists WHERE name LIKE ?', [`%${name}%`], cb);
  },
  create: ({ name, bio, image_url, verified }, cb) => {
    db.run('INSERT INTO artists (name, bio, image_url, verified) VALUES (?, ?, ?, ?)', [name, bio, image_url, verified], function(err) {
      if (err) return cb(err);
      cb(null, { id: this.lastID, name, bio, image_url, verified });
    });
  },
  update: (id, { name, bio, image_url, verified }, cb) => {
    db.run('UPDATE artists SET name = ?, bio = ?, image_url = ?, verified = ? WHERE id = ?', [name, bio, image_url, verified, id], cb);
  },
  delete: (id, cb) => {
    db.run('DELETE FROM artists WHERE id = ?', [id], cb);
  },
  getAlbums: (artist_id, cb) => {
    db.all('SELECT * FROM albums WHERE artist_id = ?', [artist_id], cb);
  },
  getSingles: (artist_id, cb) => {
    db.all('SELECT * FROM albums WHERE artist_id = ? AND album_type = "single"', [artist_id], cb);
  },
  getTopTracks: (artist_id, limit = 5, cb) => {
    db.all('SELECT * FROM songs WHERE artist_id = ? ORDER BY play_count DESC LIMIT ?', [artist_id, limit], cb);
  },
  follow: (user_id, artist_id, cb) => {
    db.run('INSERT OR IGNORE INTO user_library (user_id, artist_id) VALUES (?, ?)', [user_id, artist_id], cb);
  },
  unfollow: (user_id, artist_id, cb) => {
    db.run('DELETE FROM user_library WHERE user_id = ? AND artist_id = ?', [user_id, artist_id], cb);
  },
  getFollowersCount: (artist_id, cb) => {
    db.get('SELECT COUNT(*) as count FROM user_library WHERE artist_id = ?', [artist_id], (err, row) => {
      if (err) return cb(err);
      cb(null, row.count);
    });
  }
};

module.exports = Artist; 