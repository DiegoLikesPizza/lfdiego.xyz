# Spotify Integration Backend

This backend service provides Spotify Web API integration for the portfolio website's "Now Playing" widget.

## Features

- Shows **Diego's** currently playing music to all website visitors
- OAuth 2.0 authentication (Diego authenticates once)
- Real-time "Now Playing" track information
- Automatic token refresh
- CORS support for frontend integration
- Periodic track updates (every 30 seconds)
- No authentication required for website visitors

## Setup Instructions

### 1. Spotify App Registration

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create an App"
3. Fill in the app details:
   - App name: "Portfolio Spotify Integration" (or any name)
   - App description: "Now Playing widget for portfolio website"
4. After creating the app, note down:
   - **Client ID**
   - **Client Secret**
5. In the app settings, add redirect URI:
   - `http://localhost:3000/callback` (for local development)
   - Add your production domain callback URL if deploying

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Spotify credentials in `.env`:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8080
   ```

### 3. Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

### 4. Diego's Authentication (One-time setup)

**Important**: Only Diego needs to authenticate once. Website visitors will automatically see Diego's music.

1. Start the backend server: `npm run dev`
2. Open browser and go to: `http://localhost:3000/admin/auth/spotify`
3. Click "Connect Diego's Spotify"
4. Log in with Diego's Spotify account
5. Grant permissions
6. Done! The website will now show Diego's music to all visitors

### 5. Frontend Integration

The frontend is already configured and will automatically:

1. Check if Diego's Spotify is connected
2. Display Diego's currently playing music
3. Update every 30 seconds
4. Show appropriate messages when Diego isn't listening to music

**No authentication required for website visitors!**

## API Endpoints

### Public Endpoints (for website visitors)
- `GET /health` - Health check
- `GET /api/current-track` - Get Diego's currently playing track
- `GET /api/auth-status` - Check if Diego's Spotify is connected

### Admin Endpoints (for Diego only)
- `GET /admin/auth/spotify` - Diego's authentication page
- `GET /callback` - Handle Diego's Spotify OAuth callback

## Required Spotify Scopes

- `user-read-currently-playing` - Read currently playing track
- `user-read-playback-state` - Read playback state

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure `FRONTEND_URL` in `.env` matches your frontend URL
2. **Authentication fails**: Check Client ID, Client Secret, and Redirect URI
3. **No track data**: Make sure you're playing music on Spotify and have granted permissions
4. **Token expired**: The backend automatically refreshes tokens, but you may need to re-authenticate

### Development Tips

- Use `npm run dev` for development (auto-restart on changes)
- Check browser console for frontend errors
- Check backend logs for API errors
- Test with different Spotify playback states (playing, paused, no music)

## Production Deployment

1. Update environment variables for production
2. Change `SPOTIFY_REDIRECT_URI` to your production callback URL
3. Update `FRONTEND_URL` to your production frontend URL
4. Add production callback URL in Spotify app settings
5. Use a process manager like PM2 for production

## Security Notes

- Never commit `.env` file to version control
- Keep Client Secret secure
- Use HTTPS in production
- Consider implementing rate limiting for production use
