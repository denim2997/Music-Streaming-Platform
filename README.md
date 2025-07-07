# Music Streaming Platform Backend (Spotify Clone)

## Overview
This project is a full-featured backend API for a music streaming platform, similar to Spotify. It supports user management, music catalog, playlists, streaming, search, subscriptions, and more.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Seed Data](#seed-data)
- [Postman Collection](#postman-collection)
- [Troubleshooting](#troubleshooting)
- [Assumptions](#assumptions)
- [Premium Features](#premium-features)
- [License](#license)

---

## Features
- User registration and login (JWT authentication)
- Secure password hashing (bcrypt)
- Browse featured playlists, new releases, and categories
- Search for songs, artists, albums, playlists
- Song streaming and play count tracking
- Playlist creation, update, delete, reorder
- Add/remove songs from playlists
- Like/save songs and albums to user library
- View recently played tracks
- Upgrade to premium subscription
- Follow/unfollow artists and users
- Subscription control: restrict free users
- Input validation, error handling, rate limiting, and logging

---

## Tech Stack
- Node.js + Express.js
- SQLite (development database)
- JWT for authentication
- bcrypt for password hashing
- express-rate-limit for rate limiting
- morgan for logging

---

## Folder Structure
```
music-streaming-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
├── database/
│   ├── schema.sql
│   └── seeds.sql
├── .env
├── .gitignore
├── package.json
├── README.md
└── music-streaming-backend.postman_collection.json
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd music-streaming-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
JWT_SECRET=your_jwt_secret
DB_PATH=./database/music.db
```

### 4. Set Up the Database
**You need the SQLite CLI installed.**

Run these commands in your terminal:
```bash
sqlite3 ./database/music.db ".read database/schema.sql"
sqlite3 ./database/music.db ".read database/seeds.sql"
```

### 5. Start the Server
```bash
npm run dev
```
The server will run on `http://localhost:3000` by default.

---

## Environment Variables
- `PORT`: Port number for the server (default: 3000)
- `JWT_SECRET`: Secret key for JWT authentication
- `DB_PATH`: Path to the SQLite database file

---

## Database Setup
- The schema is defined in `database/schema.sql`.
- Seed data is in `database/seeds.sql` (50+ songs, 20+ artists, 15+ albums, users, playlists, etc).
- You can inspect the database using the SQLite CLI or a GUI tool like DB Browser for SQLite.

---

## Running the Project
- `npm run dev`: Starts the server with nodemon (auto-reloads on changes)
- `npm start`: Starts the server normally

---

## API Documentation

### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT

### Browse
- `GET /api/browse/featured` – Get featured playlists and new releases
- `GET /api/browse/categories` – Get all browse categories

### Search
- `GET /api/search?q=...&type=...` – Search for songs, artists, albums, playlists

### Songs
- `GET /api/songs/:id` – Get song details
- `POST /api/songs/:id/play` – Record a play (requires authentication)

### Artists
- `GET /api/artists/:id` – Get artist details (with top tracks, albums, singles)
- `POST /api/artists/:id/follow` – Follow an artist (requires authentication)
- `DELETE /api/artists/:id/follow` – Unfollow an artist (requires authentication)

### Albums
- `GET /api/albums/:id` – Get album details with tracks

### Playlists
- `POST /api/playlists/create` – Create a playlist (requires authentication)
- `PUT /api/playlists/:id` – Update playlist details (requires authentication)
- `POST /api/playlists/:id/tracks` – Add songs to playlist (requires authentication)
- `DELETE /api/playlists/:id/tracks` – Remove songs from playlist (requires authentication)
- `POST /api/playlists/:id/reorder` – Reorder playlist tracks (requires authentication)

### Library
- `GET /api/library/songs` – Get user's saved songs (requires authentication)
- `GET /api/library/albums` – Get user's saved albums (requires authentication)
- `GET /api/library/artists` – Get user's followed artists (requires authentication)

### Subscription
- `POST /api/subscription/upgrade` – Upgrade to premium (requires authentication)

---

## Example Requests & Responses

### Register
```http
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "dob": "1990-01-01",
  "country": "IN"
}
```
Response:
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

### Get Featured Playlists
```http
GET /api/browse/featured
```
Response:
```json
{
  "success": true,
  "featured": {
    "playlists": [ ... ],
    "newReleases": [ ... ]
  }
}
```

### Error Response Example
```json
{
  "success": false,
  "error": "Resource not found"
}
```

---

## Seed Data
- 50+ songs
- 20+ artists
- 15+ albums
- Multiple users (free + premium)
- Sample playlists, history, liked content

---

## Postman Collection
A complete Postman collection is provided: `music-streaming-backend.postman_collection.json`
- Import it into Postman to test all endpoints.
- Each request includes example input and expected output.

---

## Troubleshooting
- **Port already in use?** Change the `PORT` in `.env`.
- **Database errors?** Ensure you ran the schema and seed SQL files.
- **JWT errors?** Make sure your `.env` has a valid `JWT_SECRET`.
- **Missing dependencies?** Run `npm install` again.

---

## Assumptions
- Passwords are securely hashed
- JWT is used for all protected endpoints
- Free users have limited access to premium features
- Song streaming is simulated (audio URLs only)
- SQLite is used for development; can be swapped for production DB

---

## Premium Features
- Unlimited skips
- Ad-free experience
- High-quality streaming
- Collaborative playlists

---

## License
MIT 