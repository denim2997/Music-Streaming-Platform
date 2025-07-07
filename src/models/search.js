const db = require('../config/database');

const Search = {
  songs: (query, cb) => {
    db.all('SELECT * FROM songs WHERE title LIKE ?', [`%${query}%`], cb);
  },
  artists: (query, cb) => {
    db.all('SELECT * FROM artists WHERE name LIKE ?', [`%${query}%`], cb);
  },
  albums: (query, cb) => {
    db.all('SELECT * FROM albums WHERE title LIKE ?', [`%${query}%`], cb);
  },
  playlists: (query, cb) => {
    db.all('SELECT * FROM playlists WHERE name LIKE ?', [`%${query}%`], cb);
  },
  multiEntity: (query, types = ['songs', 'artists', 'albums', 'playlists'], limit = 10, cb) => {
    const results = {};
    let completed = 0;
    const total = types.length;
    if (total === 0) return cb(null, results);
    if (types.includes('songs')) {
      db.all('SELECT * FROM songs WHERE title LIKE ? LIMIT ?', [`%${query}%`, limit], (err, rows) => {
        results.songs = rows || [];
        if (++completed === total) cb(null, results);
      });
    }
    if (types.includes('artists')) {
      db.all('SELECT * FROM artists WHERE name LIKE ? LIMIT ?', [`%${query}%`, limit], (err, rows) => {
        results.artists = rows || [];
        if (++completed === total) cb(null, results);
      });
    }
    if (types.includes('albums')) {
      db.all('SELECT * FROM albums WHERE title LIKE ? LIMIT ?', [`%${query}%`, limit], (err, rows) => {
        results.albums = rows || [];
        if (++completed === total) cb(null, results);
      });
    }
    if (types.includes('playlists')) {
      db.all('SELECT * FROM playlists WHERE name LIKE ? LIMIT ?', [`%${query}%`, limit], (err, rows) => {
        results.playlists = rows || [];
        if (++completed === total) cb(null, results);
      });
    }
  }
};

module.exports = Search; 