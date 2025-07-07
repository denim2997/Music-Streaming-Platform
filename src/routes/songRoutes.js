const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const auth = require('../middleware/auth');
const libraryController = require('../controllers/libraryController');

router.get('/:id', songController.getSongById);
router.post('/:id/play', auth, songController.playSong);
router.post('/:id/save', auth, libraryController.saveSong);
router.delete('/:id/save', auth, libraryController.removeSong);

module.exports = router; 