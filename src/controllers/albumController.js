const Album = require('../models/album');
const Library = require('../models/library');

exports.getAlbumById = (req, res, next) => {
  Album.getWithArtistAndTracks(req.params.id, (err, album) => {
    if (err) return next(err);
    if (!album) return res.status(404).json({ success: false, error: 'Album not found' });
    // Calculate totalTracks and duration
    const totalTracks = album.tracks.length;
    const duration = album.tracks.reduce((sum, t) => sum + (t.duration || 0), 0);
    res.json({
      success: true,
      album: {
        id: album.id,
        name: album.title,
        artist: album.artist_name,
        releaseDate: album.release_date,
        albumType: album.album_type,
        totalTracks,
        duration,
        albumArt: album.cover_url,
        tracks: album.tracks.map((t, i) => ({
          id: t.id,
          trackNumber: i + 1,
          title: t.title,
          duration: t.duration,
          explicit: !!t.explicit
        }))
      }
    });
  });
};

exports.saveAlbum = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const album_id = req.params.id;
  Library.addAlbum(user_id, album_id, (err) => {
    if (err) {
      if (err.message.includes('already in library')) return res.status(409).json({ success: false, error: 'Album already saved' });
      return next(err);
    }
    res.json({ success: true, message: 'Album saved' });
  });
};

exports.getSavedAlbums = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Library.getSavedAlbums(user_id, (err, albums) => {
    if (err) return next(err);
    res.json({ success: true, albums });
  });
};

exports.getAllAlbums = (req, res, next) => {
  Album.getAll((err, albums) => {
    if (err) return next(err);
    res.json({ success: true, albums });
  });
};

exports.removeAlbum = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const album_id = req.params.id;
  Library.removeAlbum(user_id, album_id, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Album removed from library' });
  });
}; 