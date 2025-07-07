const Playlist = require('../models/playlist');
const db = require('../config/database');

exports.createPlaylist = (req, res, next) => {
  const user_id = req.user && req.user.id;
  const { name, description, is_collaborative, public: isPublic, image_url } = req.body;
  Playlist.create({ user_id, name, description, is_collaborative: !!is_collaborative, public: isPublic !== false, image_url }, (err, playlist) => {
    if (err) return next(err);
    res.status(201).json({ success: true, playlistId: playlist.id, message: 'Playlist created successfully' });
  });
};

exports.addSongToPlaylist = (req, res, next) => {
  const playlist_id = req.params.id;
  const user_id = req.user && req.user.id;
  Playlist.getById(playlist_id, (err, playlist) => {
    if (err) return next(err);
    if (!playlist || playlist.user_id !== user_id) return res.status(403).json({ success: false, error: 'Forbidden' });
    const { song_id, position } = req.body;
    Playlist.addSong({ playlist_id, song_id, position }, (err) => {
      if (err) {
        if (err.message.includes('already in playlist')) return res.status(409).json({ success: false, error: 'Song already in playlist' });
        return next(err);
      }
      res.json({ success: true, message: 'Song added to playlist' });
    });
  });
};

exports.removeSongFromPlaylist = (req, res, next) => {
  const playlist_id = req.params.id;
  const user_id = req.user && req.user.id;
  db.get('SELECT user_id FROM playlists WHERE id = ?', [playlist_id], (err, row) => {
    if (err) return next(err);
    if (!row || row.user_id !== user_id) return res.status(403).json({ success: false, error: 'Forbidden' });
    const { song_id } = req.body;
    Playlist.removeSong({ playlist_id, song_id }, (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Song removed from playlist' });
    });
  });
};

exports.reorderPlaylist = (req, res, next) => {
  const playlist_id = req.params.id;
  const user_id = req.user && req.user.id;
  db.get('SELECT user_id FROM playlists WHERE id = ?', [playlist_id], (err, row) => {
    if (err) return next(err);
    if (!row || row.user_id !== user_id) return res.status(403).json({ success: false, error: 'Forbidden' });
    const { song_positions } = req.body; // [{song_id, position}]
    Playlist.reorderSongs({ playlist_id, song_positions }, (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Playlist reordered' });
    });
  });
};

exports.updatePlaylist = (req, res, next) => {
  const playlist_id = req.params.id;
  const user_id = req.user && req.user.id;
  db.get('SELECT user_id FROM playlists WHERE id = ?', [playlist_id], (err, row) => {
    if (err) return next(err);
    if (!row || row.user_id !== user_id) return res.status(403).json({ success: false, error: 'Forbidden' });
    const { name, description, public: isPublic, image_url } = req.body;
    db.run('UPDATE playlists SET name = ?, description = ?, public = ?, image_url = ? WHERE id = ?', [name, description, isPublic !== false, image_url, playlist_id], (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Playlist updated' });
    });
  });
};

exports.getPlaylistDetails = (req, res, next) => {
  const playlist_id = req.params.id;
  Playlist.getDetails(playlist_id, (err, playlist) => {
    if (err) return next(err);
    if (!playlist) return res.status(404).json({ success: false, error: 'Playlist not found' });
    res.json({ success: true, playlist });
  });
};

exports.deletePlaylist = (req, res, next) => {
  const playlist_id = req.params.id;
  const user_id = req.user && req.user.id;
  Playlist.getById(playlist_id, (err, playlist) => {
    if (err) return next(err);
    if (!playlist || playlist.user_id !== user_id) return res.status(403).json({ success: false, error: 'Forbidden' });
    Playlist.delete(playlist_id, (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Playlist deleted' });
    });
  });
};

exports.getUserPlaylists = (req, res, next) => {
  const user_id = req.user && req.user.id;
  Playlist.getByUser(user_id, (err, playlists) => {
    if (err) return next(err);
    res.json({ success: true, playlists });
  });
}; 