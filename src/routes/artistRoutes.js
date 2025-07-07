const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const auth = require('../middleware/auth');

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/:id/follow', auth, artistController.followArtist);
router.delete('/:id/follow', auth, artistController.unfollowArtist);

module.exports = router; 