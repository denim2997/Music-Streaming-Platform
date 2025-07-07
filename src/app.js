const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
// Input sanitization middleware placeholder
app.use((req, res, next) => { /* sanitize req.body, req.query, req.params */ next(); });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/albums', require('./routes/albumRoutes'));
app.use('/api/playlists', require('./routes/playlistRoutes'));
app.use('/api/library', require('./routes/libraryRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/browse', require('./routes/browseRoutes'));

// Placeholder root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Music Streaming Backend API' });
});

// Global error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 