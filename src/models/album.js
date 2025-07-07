const db = require('../config/database');

const Album = {
  getAll: (cb) => {
    db.all('SELECT * FROM albums', [], cb);
  },
  getById: (id, cb) => {
    db.get('SELECT * FROM albums WHERE id = ?', [id], cb);
  },
  getTracks: (album_id, cb) => {
    db.all('SELECT * FROM songs WHERE album_id = ?', [album_id], cb);
  },
  create: ({ title, artist_id, release_date, album_type, cover_url }, cb) => {
    db.run('INSERT INTO albums (title, artist_id, release_date, album_type, cover_url) VALUES (?, ?, ?, ?, ?)', [title, artist_id, release_date, album_type, cover_url], function(err) {
      if (err) return cb(err);
      cb(null, { id: this.lastID, title, artist_id, release_date, album_type, cover_url });
    });
  },
  update: (id, { title, artist_id, release_date, album_type, cover_url }, cb) => {
    db.run('UPDATE albums SET title = ?, artist_id = ?, release_date = ?, album_type = ?, cover_url = ? WHERE id = ?', [title, artist_id, release_date, album_type, cover_url, id], cb);
  },
  delete: (id, cb) => {
    db.run('DELETE FROM albums WHERE id = ?', [id], cb);
  },
  getWithArtistAndTracks: (id, cb) => {
    db.get('SELECT a.*, ar.name as artist_name, ar.image_url as artist_image FROM albums a JOIN artists ar ON a.artist_id = ar.id WHERE a.id = ?', [id], (err, album) => {
      if (err) return cb(err);
      if (!album) return cb(null, null);
      db.all('SELECT * FROM songs WHERE album_id = ?', [id], (err2, tracks) => {
        if (err2) return cb(err2);
        album.tracks = tracks;
        cb(null, album);
      });
    });
  }
};

module.exports = Album; 