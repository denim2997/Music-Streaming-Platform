const Song = require('../models/song');
const db = require('../config/database');

exports.getSongById = (req, res, next) => {
  Song.getById(req.params.id, (err, song) => {
    if (err) return next(err);
    if (!song) return res.status(404).json({ success: false, error: 'Song not found' });
    db.get('SELECT id, name FROM artists WHERE id = ?', [song.artist_id], (err, artist) => {
      if (err) return next(err);
      db.get('SELECT id, title as name, cover_url as albumArt FROM albums WHERE id = ?', [song.album_id], (err, album) => {
        if (err) return next(err);
        res.json({
          success: true,
          song: {
            id: song.id,
            title: song.title,
            artist: artist ? { id: artist.id, name: artist.name } : null,
            album: album ? { id: album.id, name: album.name, albumArt: album.albumArt } : null,
            duration: song.duration,
            explicit: !!song.explicit,
            audioUrl: song.audio_url,
            playCount: song.play_count
          }
        });
      });
    });
  });
};

exports.playSong = (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const songId = req.params.id;
  const { timestamp, duration } = req.body;
  Song.incrementPlayCount(songId, (err) => {
    if (err) return next(err);
    Song.addPlayRecord({ user_id: userId, song_id: songId, duration }, (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Play recorded' });
    });
  });
}; 