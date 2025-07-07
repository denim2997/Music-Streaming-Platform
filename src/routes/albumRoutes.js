const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const auth = require('../middleware/auth');

router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);
router.post('/:id/save', auth, albumController.saveAlbum);
router.delete('/:id/save', auth, albumController.removeAlbum);

module.exports = router; 