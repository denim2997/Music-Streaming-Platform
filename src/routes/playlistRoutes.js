const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const auth = require('../middleware/auth');

router.post('/create', auth, playlistController.createPlaylist);
router.post('/:id/tracks', auth, playlistController.addSongToPlaylist);
router.delete('/:id/tracks', auth, playlistController.removeSongFromPlaylist);
router.post('/:id/reorder', auth, playlistController.reorderPlaylist);
router.put('/:id', auth, playlistController.updatePlaylist);
router.get('/user', auth, playlistController.getUserPlaylists);
router.get('/:id', playlistController.getPlaylistDetails);
router.delete('/:id', auth, playlistController.deletePlaylist);

module.exports = router; 