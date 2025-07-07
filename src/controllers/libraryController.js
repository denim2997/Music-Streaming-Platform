const Library = require('../models/library');

exports.getSavedSongs = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Library.getSavedSongs(user_id, (err, songs) => {
    if (err) return next(err);
    res.json({ success: true, songs });
  });
};

exports.saveSong = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const song_id = req.params.id;
  Library.addSong(user_id, song_id, (err) => {
    if (err) {
      if (err.message.includes('already in library')) return res.status(409).json({ success: false, error: 'Song already saved' });
      return next(err);
    }
    res.json({ success: true, message: 'Song saved' });
  });
};

exports.removeSong = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const song_id = req.params.id;
  Library.removeSong(user_id, song_id, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Song removed from library' });
  });
};

exports.getSavedAlbums = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Library.getSavedAlbums(user_id, (err, albums) => {
    if (err) return next(err);
    res.json({ success: true, albums });
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

exports.removeAlbum = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const album_id = req.params.id;
  Library.removeAlbum(user_id, album_id, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Album removed from library' });
  });
};

exports.getFollowedArtists = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Library.getFollowedArtists(user_id, (err, artists) => {
    if (err) return next(err);
    res.json({ success: true, artists });
  });
};

exports.followArtist = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const artist_id = req.params.id;
  Library.addArtist(user_id, artist_id, (err) => {
    if (err) {
      if (err.message.includes('already followed')) return res.status(409).json({ success: false, error: 'Artist already followed' });
      return next(err);
    }
    res.json({ success: true, message: 'Artist followed' });
  });
};

exports.unfollowArtist = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const artist_id = req.params.id;
  Library.removeArtist(user_id, artist_id, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Artist unfollowed' });
  });
}; 