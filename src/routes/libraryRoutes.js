const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const auth = require('../middleware/auth');

router.get('/songs', auth, libraryController.getSavedSongs);
router.get('/albums', auth, libraryController.getSavedAlbums);
router.get('/artists', auth, libraryController.getFollowedArtists);
router.post('/songs/:id', auth, libraryController.saveSong);
router.delete('/songs/:id', auth, libraryController.removeSong);
router.post('/albums/:id', auth, libraryController.saveAlbum);
router.delete('/albums/:id', auth, libraryController.removeAlbum);
router.post('/artists/:id', auth, libraryController.followArtist);
router.delete('/artists/:id', auth, libraryController.unfollowArtist);

module.exports = router; 