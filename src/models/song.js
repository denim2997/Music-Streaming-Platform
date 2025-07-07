const db = require('../config/database');

const Song = {
  getById: (id, cb) => {
    db.get('SELECT * FROM songs WHERE id = ?', [id], cb);
  },
  incrementPlayCount: (id, cb) => {
    db.run('UPDATE songs SET play_count = play_count + 1 WHERE id = ?', [id], cb);
  },
  searchByTitle: (title, cb) => {
    db.all('SELECT * FROM songs WHERE title LIKE ?', [`%${title}%`], cb);
  },
  create: ({ title, artist_id, album_id, genre_id, duration, explicit, audio_url }, cb) => {
    db.run('INSERT INTO songs (title, artist_id, album_id, genre_id, duration, explicit, audio_url) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, artist_id, album_id, genre_id, duration, explicit, audio_url], function(err) {
      if (err) return cb(err);
      cb(null, { id: this.lastID, title, artist_id, album_id, genre_id, duration, explicit, audio_url });
    });
  },
  update: (id, { title, artist_id, album_id, genre_id, duration, explicit, audio_url }, cb) => {
    db.run('UPDATE songs SET title = ?, artist_id = ?, album_id = ?, genre_id = ?, duration = ?, explicit = ?, audio_url = ? WHERE id = ?', [title, artist_id, album_id, genre_id, duration, explicit, audio_url, id], cb);
  },
  delete: (id, cb) => {
    db.run('DELETE FROM songs WHERE id = ?', [id], cb);
  },
  getPlayHistory: (song_id, cb) => {
    db.all('SELECT * FROM play_history WHERE song_id = ?', [song_id], cb);
  },
  getByGenre: (genre_id, cb) => {
    db.all('SELECT * FROM songs WHERE genre_id = ?', [genre_id], cb);
  },
  getExplicit: (cb) => {
    db.all('SELECT * FROM songs WHERE explicit = 1', [], cb);
  },
  addPlayRecord: ({ user_id, song_id, duration }, cb) => {
    db.run('INSERT INTO play_history (user_id, song_id, duration) VALUES (?, ?, ?)', [user_id, song_id, duration], cb);
  }
};

module.exports = Song; 