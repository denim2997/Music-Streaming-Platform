const express = require('express');
const router = express.Router();
const browseController = require('../controllers/browseController');

router.get('/featured', browseController.getFeatured);
router.get('/categories', browseController.getCategories);

module.exports = router; 