const db = require('../config/database');

exports.getFeatured = (req, res, next) => {
  db.all('SELECT id, name, description, image_url, (SELECT COUNT(*) FROM playlist_songs WHERE playlist_id = playlists.id) as totalTracks FROM playlists WHERE public = 1 LIMIT 5', [], (err, playlists) => {
    if (err) return next(err);
    db.all('SELECT albums.id, albums.title as name, artists.name as artist, albums.release_date, albums.cover_url as albumArt FROM albums JOIN artists ON albums.artist_id = artists.id ORDER BY albums.release_date DESC LIMIT 5', [], (err, newReleases) => {
      if (err) return next(err);
      res.json({
        success: true,
        featured: {
          playlists: playlists.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            imageUrl: p.image_url,
            totalTracks: p.totalTracks
          })),
          newReleases: newReleases.map(a => ({
            id: a.id,
            name: a.name,
            artist: a.artist,
            releaseDate: a.release_date,
            albumArt: a.albumArt
          }))
        }
      });
    });
  });
};

exports.getCategories = (req, res, next) => {
  db.all('SELECT * FROM categories', [], (err, categories) => {
    if (err) return next(err);
    res.json({
      success: true,
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        imageUrl: c.image_url
      }))
    });
  });
}; 