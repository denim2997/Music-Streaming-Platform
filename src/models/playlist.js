const db = require('../config/database');

const Playlist = {
  create: ({ user_id, name, description, is_collaborative }, cb) => {
    db.run(
      'INSERT INTO playlists (user_id, name, description, is_collaborative) VALUES (?, ?, ?, ?)',
      [user_id, name, description, is_collaborative],
      function (err) {
        if (err) return cb(err);
        cb(null, { id: this.lastID, user_id, name, description, is_collaborative });
      }
    );
  },
  getById: (id, cb) => {
    db.get('SELECT * FROM playlists WHERE id = ?', [id], cb);
  },
  update: (id, { name, description, is_collaborative, public: isPublic, image_url }, cb) => {
    db.run('UPDATE playlists SET name = ?, description = ?, is_collaborative = ?, public = ?, image_url = ? WHERE id = ?', [name, description, is_collaborative, isPublic, image_url, id], cb);
  },
  delete: (id, cb) => {
    db.run('DELETE FROM playlists WHERE id = ?', [id], cb);
  },
  getDetails: (id, cb) => {
    db.get('SELECT p.*, u.username as owner FROM playlists p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [id], (err, playlist) => {
      if (err) return cb(err);
      if (!playlist) return cb(null, null);
      db.all('SELECT ps.position, ps.added_at, s.* FROM playlist_songs ps JOIN songs s ON ps.song_id = s.id WHERE ps.playlist_id = ? ORDER BY ps.position', [id], (err2, tracks) => {
        if (err2) return cb(err2);
        playlist.tracks = tracks;
        cb(null, playlist);
      });
    });
  },
  getByUser: (user_id, cb) => {
    db.all('SELECT * FROM playlists WHERE user_id = ?', [user_id], cb);
  },
  setPublic: (id, isPublic, cb) => {
    db.run('UPDATE playlists SET public = ? WHERE id = ?', [isPublic, id], cb);
  },
  setCollaborative: (id, isCollaborative, cb) => {
    db.run('UPDATE playlists SET is_collaborative = ? WHERE id = ?', [isCollaborative, id], cb);
  },
  addSong: ({ playlist_id, song_id, position }, cb) => {
    db.get('SELECT 1 FROM playlist_songs WHERE playlist_id = ? AND song_id = ?', [playlist_id, song_id], (err, row) => {
      if (err) return cb(err);
      if (row) return cb(new Error('Song already in playlist'));
      db.run('INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)', [playlist_id, song_id, position], cb);
    });
  },
  removeSong: ({ playlist_id, song_id }, cb) => {
    db.run(
      'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
      [playlist_id, song_id],
      cb
    );
  },
  reorderSongs: ({ playlist_id, song_positions }, cb) => {
    // song_positions: [{song_id, position}]
    const stmt = db.prepare('UPDATE playlist_songs SET position = ? WHERE playlist_id = ? AND song_id = ?');
    for (const { song_id, position } of song_positions) {
      stmt.run([position, playlist_id, song_id]);
    }
    stmt.finalize(cb);
  }
};

module.exports = Playlist; 