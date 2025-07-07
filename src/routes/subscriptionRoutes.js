const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.post('/upgrade', auth, subscriptionController.upgradeSubscription);
router.get('/plans', subscriptionController.getPlans);

module.exports = router; 