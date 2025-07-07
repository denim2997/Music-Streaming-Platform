const Artist = require('../models/artist');
const db = require('../config/database');

exports.getArtistById = (req, res, next) => {
  Artist.getById(req.params.id, (err, artist) => {
    if (err) return next(err);
    if (!artist) return res.status(404).json({ success: false, error: 'Artist not found' });
    Artist.getTopTracks(artist.id, 5, (err, topTracks) => {
      if (err) return next(err);
      Artist.getAlbums(artist.id, (err, albums) => {
        if (err) return next(err);
        Artist.getSingles(artist.id, (err, singles) => {
          if (err) return next(err);
          Artist.getFollowersCount(artist.id, (err, followers) => {
            if (err) return next(err);
            res.json({ success: true, artist: { ...artist, topTracks, albums, singles, followers } });
          });
        });
      });
    });
  });
};

exports.getAllArtists = (req, res, next) => {
  Artist.getAll((err, artists) => {
    if (err) return next(err);
    res.json({ success: true, artists });
  });
};

exports.createArtist = (req, res, next) => {
  const { name, bio, image_url, verified } = req.body;
  Artist.create({ name, bio, image_url, verified }, (err, artist) => {
    if (err) return next(err);
    res.status(201).json({ success: true, artist });
  });
};

exports.updateArtist = (req, res, next) => {
  const id = req.params.id;
  const { name, bio, image_url, verified } = req.body;
  Artist.update(id, { name, bio, image_url, verified }, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Artist updated' });
  });
};

exports.followArtist = (req, res, next) => {
  const userId = req.user && req.user.id;
  const artistId = req.params.id;
  Artist.follow(userId, artistId, (err) => {
    if (err) {
      if (err.message.includes('already followed')) return res.status(409).json({ success: false, error: 'Already following' });
      return next(err);
    }
    res.json({ success: true, message: 'Artist followed' });
  });
};

exports.unfollowArtist = (req, res, next) => {
  const userId = req.user && req.user.id;
  const artistId = req.params.id;
  Artist.unfollow(userId, artistId, (err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Artist unfollowed' });
  });
}; 