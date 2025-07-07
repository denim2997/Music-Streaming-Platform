const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res, next) => {
  try {
    const { email, username, password, dob, country } = req.body;
    User.findByEmail(email, async (err, user) => {
      if (user) return res.status(409).json({ error: 'Email already exists' });
      User.findByUsername(username, async (err, userByUsername) => {
        if (userByUsername) return res.status(409).json({ error: 'Username already exists' });
        User.create({ email, username, password, dob, country, subscription_id: 1 }, (err, newUser) => {
          if (err) return next(err);
          // Fetch subscription type
          const subscriptionType = 'free';
          res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: newUser.id,
            subscriptionType
          });
        });
      });
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, user) => {
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const valid = await User.verifyPassword(user, password);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      // Fetch subscription type
      const subscriptionType = user.subscription_id === 2 ? 'premium' : 'free';
      const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          subscriptionType
        }
      });
    });
  } catch (err) {
    next(err);
  }
}; 