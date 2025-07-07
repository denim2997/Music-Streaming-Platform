const db = require('../config/database');

const Library = {
  getSavedSongs: (user_id, cb) => {
    db.all('SELECT s.* FROM user_library ul JOIN songs s ON ul.song_id = s.id WHERE ul.user_id = ? AND ul.song_id IS NOT NULL', [user_id], cb);
  },
  getSavedAlbums: (user_id, cb) => {
    db.all('SELECT a.* FROM user_library ul JOIN albums a ON ul.album_id = a.id WHERE ul.user_id = ? AND ul.album_id IS NOT NULL', [user_id], cb);
  },
  getFollowedArtists: (user_id, cb) => {
    db.all('SELECT ar.* FROM user_library ul JOIN artists ar ON ul.artist_id = ar.id WHERE ul.user_id = ? AND ul.artist_id IS NOT NULL', [user_id], cb);
  },
  addSong: (user_id, song_id, cb) => {
    db.get('SELECT 1 FROM user_library WHERE user_id = ? AND song_id = ?', [user_id, song_id], (err, row) => {
      if (err) return cb(err);
      if (row) return cb(new Error('Song already in library'));
      db.run('INSERT INTO user_library (user_id, song_id) VALUES (?, ?)', [user_id, song_id], cb);
    });
  },
  removeSong: (user_id, song_id, cb) => {
    db.run('DELETE FROM user_library WHERE user_id = ? AND song_id = ?', [user_id, song_id], cb);
  },
  addAlbum: (user_id, album_id, cb) => {
    db.get('SELECT 1 FROM user_library WHERE user_id = ? AND album_id = ?', [user_id, album_id], (err, row) => {
      if (err) return cb(err);
      if (row) return cb(new Error('Album already in library'));
      db.run('INSERT INTO user_library (user_id, album_id) VALUES (?, ?)', [user_id, album_id], cb);
    });
  },
  removeAlbum: (user_id, album_id, cb) => {
    db.run('DELETE FROM user_library WHERE user_id = ? AND album_id = ?', [user_id, album_id], cb);
  },
  addArtist: (user_id, artist_id, cb) => {
    db.get('SELECT 1 FROM user_library WHERE user_id = ? AND artist_id = ?', [user_id, artist_id], (err, row) => {
      if (err) return cb(err);
      if (row) return cb(new Error('Artist already followed'));
      db.run('INSERT INTO user_library (user_id, artist_id) VALUES (?, ?)', [user_id, artist_id], cb);
    });
  },
  removeArtist: (user_id, artist_id, cb) => {
    db.run('DELETE FROM user_library WHERE user_id = ? AND artist_id = ?', [user_id, artist_id], cb);
  }
};

module.exports = Library; 