-- Subscriptions
INSERT INTO subscriptions (plan_type, expiry, price) VALUES
('free', NULL, 0),
('premium', '2099-12-31', 9.99);

-- Users
INSERT INTO users (email, username, password, dob, country, subscription_id) VALUES
('alice@example.com', 'alice', '$2b$10$hash1', '1995-01-01', 'USA', 1),
('bob@example.com', 'bob', '$2b$10$hash2', '1990-05-10', 'UK', 2),
('carol@example.com', 'carol', '$2b$10$hash3', '2000-07-15', 'IN', 1),
('dave@example.com', 'dave', '$2b$10$hash4', '1988-03-22', 'CA', 2);

-- Artists
INSERT INTO artists (name, bio, image_url, verified, monthly_listeners) VALUES
('The Harmonics', 'Indie pop band', 'https://img.com/1.jpg', 1, 1200000),
('DJ Sonic', 'Electronic music producer', 'https://img.com/2.jpg', 1, 900000),
('Luna Star', 'Pop singer-songwriter', 'https://img.com/3.jpg', 1, 1500000),
('The Jazz Cats', 'Jazz ensemble', 'https://img.com/4.jpg', 0, 300000),
('Rock Revolution', 'Classic rock band', 'https://img.com/5.jpg', 1, 800000),
('MC Flow', 'Hip-hop artist', 'https://img.com/6.jpg', 1, 1100000),
('Echoes', 'Alternative band', 'https://img.com/7.jpg', 0, 400000),
('Synthwave Dreams', 'Synthwave duo', 'https://img.com/8.jpg', 1, 600000),
('Folk Roots', 'Folk group', 'https://img.com/9.jpg', 0, 250000),
('Classical Quartet', 'Classical musicians', 'https://img.com/10.jpg', 1, 200000),
('Sunset Riders', 'Country band', 'https://img.com/11.jpg', 0, 350000),
('Urban Beats', 'Rap collective', 'https://img.com/12.jpg', 1, 950000),
('Chill Vibes', 'Lo-fi producer', 'https://img.com/13.jpg', 0, 500000),
('Opera Nova', 'Opera singer', 'https://img.com/14.jpg', 1, 100000),
('Reggae Roots', 'Reggae band', 'https://img.com/15.jpg', 0, 220000),
('EDM Pulse', 'EDM DJ', 'https://img.com/16.jpg', 1, 700000),
('Soul Sisters', 'Soul duo', 'https://img.com/17.jpg', 1, 300000),
('Metal Storm', 'Metal band', 'https://img.com/18.jpg', 1, 400000),
('Acoustic Aura', 'Acoustic artist', 'https://img.com/19.jpg', 0, 150000),
('Bluegrass Boys', 'Bluegrass band', 'https://img.com/20.jpg', 0, 120000);

-- Genres
INSERT INTO genres (name) VALUES
('Pop'), ('Rock'), ('Jazz'), ('Hip-Hop'), ('Electronic'), ('Folk'), ('Classical'), ('Country'), ('Reggae'), ('Lo-fi'), ('Opera'), ('EDM'), ('Soul'), ('Metal'), ('Acoustic'), ('Bluegrass');

-- Albums
INSERT INTO albums (title, artist_id, release_date, album_type, cover_url) VALUES
('Indie Dreams', 1, '2020-01-01', 'album', 'https://img.com/a1.jpg'),
('Nightlife', 2, '2021-06-15', 'album', 'https://img.com/a2.jpg'),
('Starlight', 3, '2019-09-10', 'album', 'https://img.com/a3.jpg'),
('Jazz Nights', 4, '2018-11-20', 'album', 'https://img.com/a4.jpg'),
('Rock On', 5, '2017-05-05', 'album', 'https://img.com/a5.jpg'),
('Flow State', 6, '2022-02-22', 'album', 'https://img.com/a6.jpg'),
('Echo Chamber', 7, '2020-08-08', 'album', 'https://img.com/a7.jpg'),
('Retro Future', 8, '2021-12-12', 'album', 'https://img.com/a8.jpg'),
('Folk Tales', 9, '2016-03-03', 'album', 'https://img.com/a9.jpg'),
('Classics', 10, '2015-07-07', 'album', 'https://img.com/a10.jpg'),
('Country Roads', 11, '2018-10-10', 'album', 'https://img.com/a11.jpg'),
('Urban Life', 12, '2019-04-04', 'album', 'https://img.com/a12.jpg'),
('Chill Out', 13, '2022-01-01', 'album', 'https://img.com/a13.jpg'),
('Opera House', 14, '2017-11-11', 'album', 'https://img.com/a14.jpg'),
('Reggae Vibes', 15, '2020-06-06', 'album', 'https://img.com/a15.jpg');

-- Songs (50+)
INSERT INTO songs (title, artist_id, album_id, genre_id, duration, play_count, explicit, audio_url) VALUES
('Dreamscape', 1, 1, 1, 210, 100, 0, 'https://audio.com/1.mp3'),
('City Lights', 2, 2, 5, 180, 200, 0, 'https://audio.com/2.mp3'),
('Moonrise', 3, 3, 1, 240, 150, 0, 'https://audio.com/3.mp3'),
('Smooth Jazz', 4, 4, 3, 300, 80, 0, 'https://audio.com/4.mp3'),
('Rock Anthem', 5, 5, 2, 220, 300, 1, 'https://audio.com/5.mp3'),
('Flow', 6, 6, 4, 200, 120, 1, 'https://audio.com/6.mp3'),
('Echoes', 7, 7, 2, 230, 90, 0, 'https://audio.com/7.mp3'),
('Neon Nights', 8, 8, 5, 210, 60, 0, 'https://audio.com/8.mp3'),
('Folk Song', 9, 9, 6, 190, 70, 0, 'https://audio.com/9.mp3'),
('Symphony', 10, 10, 7, 400, 50, 0, 'https://audio.com/10.mp3'),
('Country Love', 11, 11, 8, 220, 110, 0, 'https://audio.com/11.mp3'),
('Rap Game', 12, 12, 4, 210, 130, 1, 'https://audio.com/12.mp3'),
('Lo-fi Chill', 13, 13, 10, 180, 140, 0, 'https://audio.com/13.mp3'),
('Opera Night', 14, 14, 11, 360, 30, 0, 'https://audio.com/14.mp3'),
('Reggae Sun', 15, 15, 9, 250, 60, 0, 'https://audio.com/15.mp3'),
('EDM Party', 16, 2, 12, 200, 90, 0, 'https://audio.com/16.mp3'),
('Soul Groove', 17, 3, 13, 230, 80, 0, 'https://audio.com/17.mp3'),
('Metal Fury', 18, 5, 14, 260, 70, 1, 'https://audio.com/18.mp3'),
('Acoustic Day', 19, 9, 15, 210, 40, 0, 'https://audio.com/19.mp3'),
('Bluegrass Jam', 20, 10, 16, 200, 30, 0, 'https://audio.com/20.mp3'),
('Pop Hit', 1, 1, 1, 200, 120, 0, 'https://audio.com/21.mp3'),
('Electro Beat', 2, 2, 5, 180, 110, 0, 'https://audio.com/22.mp3'),
('Starry Night', 3, 3, 1, 240, 100, 0, 'https://audio.com/23.mp3'),
('Jazz Club', 4, 4, 3, 300, 90, 0, 'https://audio.com/24.mp3'),
('Rock Star', 5, 5, 2, 220, 200, 1, 'https://audio.com/25.mp3'),
('Hip-Hop Flow', 6, 6, 4, 200, 100, 1, 'https://audio.com/26.mp3'),
('Alt Echo', 7, 7, 2, 230, 80, 0, 'https://audio.com/27.mp3'),
('Synth Dreams', 8, 8, 5, 210, 70, 0, 'https://audio.com/28.mp3'),
('Folk Ballad', 9, 9, 6, 190, 60, 0, 'https://audio.com/29.mp3'),
('Classic Piece', 10, 10, 7, 400, 40, 0, 'https://audio.com/30.mp3'),
('Country Road', 11, 11, 8, 220, 100, 0, 'https://audio.com/31.mp3'),
('Urban Beat', 12, 12, 4, 210, 90, 1, 'https://audio.com/32.mp3'),
('Lo-fi Dream', 13, 13, 10, 180, 80, 0, 'https://audio.com/33.mp3'),
('Opera Gala', 14, 14, 11, 360, 20, 0, 'https://audio.com/34.mp3'),
('Reggae Night', 15, 15, 9, 250, 50, 0, 'https://audio.com/35.mp3'),
('EDM Drop', 16, 2, 12, 200, 60, 0, 'https://audio.com/36.mp3'),
('Soulful', 17, 3, 13, 230, 70, 0, 'https://audio.com/37.mp3'),
('Metal Storm', 18, 5, 14, 260, 60, 1, 'https://audio.com/38.mp3'),
('Acoustic Vibe', 19, 9, 15, 210, 30, 0, 'https://audio.com/39.mp3'),
('Bluegrass Run', 20, 10, 16, 200, 20, 0, 'https://audio.com/40.mp3'),
('Pop Star', 1, 1, 1, 200, 110, 0, 'https://audio.com/41.mp3'),
('Electro Wave', 2, 2, 5, 180, 100, 0, 'https://audio.com/42.mp3'),
('Starlit', 3, 3, 1, 240, 90, 0, 'https://audio.com/43.mp3'),
('Jazz Groove', 4, 4, 3, 300, 80, 0, 'https://audio.com/44.mp3'),
('Rock Roll', 5, 5, 2, 220, 100, 1, 'https://audio.com/45.mp3'),
('Hip-Hop Star', 6, 6, 4, 200, 90, 1, 'https://audio.com/46.mp3'),
('Alt Sound', 7, 7, 2, 230, 70, 0, 'https://audio.com/47.mp3'),
('Synth Pop', 8, 8, 5, 210, 60, 0, 'https://audio.com/48.mp3'),
('Folk Tune', 9, 9, 6, 190, 50, 0, 'https://audio.com/49.mp3'),
('Classic Tune', 10, 10, 7, 400, 30, 0, 'https://audio.com/50.mp3');

-- Categories
INSERT INTO categories (name, image_url) VALUES
('Bollywood', 'https://img.com/cat1.jpg'),
('Punjabi', 'https://img.com/cat2.jpg'),
('Pop', 'https://img.com/cat3.jpg'),
('Rock', 'https://img.com/cat4.jpg'),
('Jazz', 'https://img.com/cat5.jpg'),
('Hip-Hop', 'https://img.com/cat6.jpg'),
('Electronic', 'https://img.com/cat7.jpg'),
('Chill', 'https://img.com/cat8.jpg');

-- Playlists
INSERT INTO playlists (user_id, name, description, is_collaborative, public, image_url) VALUES
(1, 'Alice\'s Favorites', 'My favorite tracks', 0, 1, 'https://img.com/p1.jpg'),
(2, 'Bob\'s Party', 'Party playlist', 1, 1, 'https://img.com/p2.jpg');

-- PlaylistCategories
INSERT INTO playlist_categories (playlist_id, category_id) VALUES
(1, 3), (1, 8), (2, 4), (2, 6);

-- Playlist Songs
INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5),
(2, 6, 1), (2, 7, 2), (2, 8, 3), (2, 9, 4), (2, 10, 5);

-- User Library (liked songs, albums, followed artists)
INSERT INTO user_library (user_id, song_id) VALUES (1, 1), (1, 2), (2, 6), (2, 7);
INSERT INTO user_library (user_id, album_id) VALUES (1, 1), (2, 2);
INSERT INTO user_library (user_id, artist_id) VALUES (1, 1), (2, 2);

-- Play History
INSERT INTO play_history (user_id, song_id, duration) VALUES (1, 1, 210), (1, 2, 180), (2, 6, 200), (2, 7, 230);

-- Search History
INSERT INTO search_history (user_id, query) VALUES (1, 'pop'), (2, 'rock');

-- Following
INSERT INTO following (follower_id, following_id) VALUES (1, 2), (2, 1); 