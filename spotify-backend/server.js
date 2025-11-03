const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Allow multiple frontend URLs
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5500',
    'http://localhost:3000',  // Allow backend to call itself
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:3000',  // Allow backend to call itself
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Spotify API Configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// Persistent token storage
const TOKEN_FILE = path.join(__dirname, 'spotify-tokens.json');

let spotifyTokens = {
    access_token: null,
    refresh_token: null,
    expires_at: null
};

let currentTrack = null;
let lastFetchTime = null;

// Load tokens from file on startup
function loadTokens() {
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            const data = fs.readFileSync(TOKEN_FILE, 'utf8');
            if (data.trim()) {
                const parsedTokens = JSON.parse(data);
                spotifyTokens = parsedTokens;
                console.log('Loaded tokens from file. Expires at:', new Date(spotifyTokens.expires_at));
            } else {
                console.log('Token file is empty, starting fresh');
            }
        } else {
            console.log('No token file found, starting fresh');
        }
    } catch (error) {
        console.error('Error loading tokens:', error);
        console.log('Starting with fresh tokens');
        // Reset to default values on error
        spotifyTokens = {
            access_token: null,
            refresh_token: null,
            expires_at: null
        };
    }
}

// Save tokens to file
function saveTokens() {
    try {
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(spotifyTokens, null, 2));
        console.log('Tokens saved to file');
    } catch (error) {
        console.error('Error saving tokens:', error);
    }
}

// Load tokens on startup
loadTokens();

// Helper function to get Spotify access token using client credentials
async function getClientCredentialsToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });
        
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting client credentials token:', error.response?.data || error.message);
        return null;
    }
}

// Helper function to refresh access token
async function refreshAccessToken() {
    if (!spotifyTokens.refresh_token) {
        console.log('No refresh token available');
        return false;
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            `grant_type=refresh_token&refresh_token=${spotifyTokens.refresh_token}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });

        spotifyTokens.access_token = response.data.access_token;
        spotifyTokens.expires_at = Date.now() + (response.data.expires_in * 1000);

        if (response.data.refresh_token) {
            spotifyTokens.refresh_token = response.data.refresh_token;
        }

        // Save refreshed tokens to file
        saveTokens();

        console.log('Access token refreshed successfully');
        console.log('New token expires at:', new Date(spotifyTokens.expires_at));
        return true;
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
        return false;
    }
}

// Check if token is expired
function isTokenExpired() {
    return !spotifyTokens.access_token || Date.now() >= spotifyTokens.expires_at;
}

// Get currently playing track
async function getCurrentlyPlaying() {
    if (isTokenExpired()) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
            console.log('Could not refresh token, using client credentials');
            const clientToken = await getClientCredentialsToken();
            if (!clientToken) return null;
            spotifyTokens.access_token = clientToken;
        }
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${spotifyTokens.access_token}`
            }
        });

        if (response.status === 204 || !response.data) {
            return null; // Nothing currently playing
        }

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('Token expired, attempting refresh...');
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return getCurrentlyPlaying(); // Retry with new token
            }
        }
        console.error('Error fetching currently playing:', error.response?.data || error.message);
        return null;
    }
}

// Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Admin route to get Spotify authorization URL (only for Diego to authenticate once)
app.get('/admin/auth/spotify', (req, res) => {
    const scopes = 'user-read-currently-playing user-read-playback-state';

    // Always use the production redirect URI since Spotify doesn't allow localhost
    const redirectUri = SPOTIFY_REDIRECT_URI;

    const authUrl = `https://accounts.spotify.com/authorize?` +
        `response_type=code&` +
        `client_id=${SPOTIFY_CLIENT_ID}&` +
        `scope=${encodeURIComponent(scopes)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}`;

    res.send(`
        <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                <h1 style="color: #1DB954;">Diego's Spotify Authentication</h1>
                <p>Click the button below to authenticate your Spotify account for the portfolio website.</p>
                <p style="font-size: 0.9rem; opacity: 0.7; margin: 20px 0;">
                    Redirect URI: <code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${redirectUri}</code>
                </p>
                <a href="${authUrl}" style="display: inline-block; background: #1DB954; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px;">
                    Connect Diego's Spotify
                </a>
                <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 30px;">
                    This will allow your portfolio website to display what you're currently listening to.
                </p>
                <div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <h3 style="color: #1DB954; margin-top: 0;">Important Notes:</h3>
                    <ul style="font-size: 0.9rem; line-height: 1.6;">
                        <li><strong>Redirect Issue:</strong> Since Spotify doesn't allow localhost, you'll be redirected to lfdiego.xyz/callback</li>
                        <li><strong>Workaround:</strong> After authentication, copy the authorization code from the URL and paste it below</li>
                        <li><strong>Alternative:</strong> Set up a temporary server on your domain to handle the callback</li>
                    </ul>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                    <h4 style="color: #1DB954; margin-top: 0;">Manual Code Entry:</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 10px;">If redirected to lfdiego.xyz, copy the 'code' parameter from the URL and enter it here:</p>
                    <form action="/manual-callback" method="post" style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                        <input type="text" name="code" placeholder="Paste authorization code here" style="padding: 8px 12px; border-radius: 5px; border: 1px solid #444; background: #333; color: #fff; width: 300px;">
                        <button type="submit" style="padding: 8px 16px; background: #1DB954; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

// Handle manual code submission
app.use(express.urlencoded({ extended: true }));

app.post('/manual-callback', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                    <h1 style="color: #ff4444;">Error</h1>
                    <p>No authorization code provided. Please try again.</p>
                    <a href="/admin/auth/spotify" style="display: inline-block; background: #1DB954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 15px; margin-top: 20px;">
                        Back to Auth
                    </a>
                </body>
            </html>
        `);
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });

        spotifyTokens.access_token = response.data.access_token;
        spotifyTokens.refresh_token = response.data.refresh_token;
        spotifyTokens.expires_at = Date.now() + (response.data.expires_in * 1000);

        // Save tokens to file
        saveTokens();

        console.log('Diego\'s Spotify account successfully connected via manual code!');
        console.log('Access token expires at:', new Date(spotifyTokens.expires_at));

        res.send(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                    <h1 style="color: #1DB954;">🎵 Diego's Spotify Connected!</h1>
                    <p>Your portfolio website will now display your currently playing music.</p>
                    <div style="margin: 30px 0; padding: 20px; background: rgba(29, 185, 84, 0.1); border-radius: 10px; border: 1px solid rgba(29, 185, 84, 0.3);">
                        <p style="margin: 0; font-size: 0.9rem;">
                            ✅ Manual authentication successful<br>
                            ✅ Tokens stored<br>
                            ✅ Website integration active
                        </p>
                    </div>
                    <p style="font-size: 0.9rem; opacity: 0.8;">
                        Visitors to your website will now see what you're listening to on Spotify.
                    </p>
                    <a href="/api/current-track" style="display: inline-block; background: #00FFFF; color: #121212; padding: 10px 20px; text-decoration: none; border-radius: 15px; margin-top: 20px; font-weight: bold;">
                        Test API
                    </a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error exchanging code for token:', error.response?.data || error.message);
        res.status(500).send(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                    <h1 style="color: #ff4444;">Authentication Failed</h1>
                    <p>Error: ${error.response?.data?.error_description || error.message}</p>
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255,68,68,0.1); border-radius: 10px; border: 1px solid rgba(255,68,68,0.3);">
                        <p style="font-size: 0.9rem; margin: 0;">
                            Common issues:<br>
                            • Authorization code expired (try again)<br>
                            • Code was already used<br>
                            • Redirect URI mismatch
                        </p>
                    </div>
                    <a href="/admin/auth/spotify" style="display: inline-block; background: #1DB954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 15px; margin-top: 20px;">
                        Try Again
                    </a>
                </body>
            </html>
        `);
    }
});

// Handle Spotify callback (this might not work due to localhost issue, but keeping it as fallback)
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                    <h1 style="color: #ff4444;">Authentication Error</h1>
                    <p>No authorization code provided. Please try the manual method.</p>
                    <a href="/admin/auth/spotify" style="display: inline-block; background: #1DB954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 15px; margin-top: 20px;">
                        Back to Auth
                    </a>
                </body>
            </html>
        `);
    }

    // Redirect to manual callback with the code
    res.redirect(`/admin/auth/spotify?code=${code}&message=Use the manual form below with this code`);
});

// Public API: Get Diego's current track (what visitors see)
app.get('/api/current-track', async (req, res) => {
    try {
        // Return cached data if it's fresh (less than 30 seconds old)
        if (currentTrack && lastFetchTime && (Date.now() - lastFetchTime) < 30000) {
            return res.json(currentTrack);
        }

        const track = await getCurrentlyPlaying();
        currentTrack = track;
        lastFetchTime = Date.now();

        res.json(track);
    } catch (error) {
        console.error('Error in /api/current-track:', error);
        res.status(500).json({ error: 'Failed to fetch current track' });
    }
});

// Public API: Check if Diego's Spotify is connected
app.get('/api/auth-status', (req, res) => {
    res.json({
        authenticated: !!spotifyTokens.access_token && !isTokenExpired(),
        hasRefreshToken: !!spotifyTokens.refresh_token,
        tokenExpired: isTokenExpired(),
        owner: 'Diego' // Clarify this is Diego's account
    });
});

// Manual token refresh endpoint
app.post('/api/refresh-token', async (req, res) => {
    if (!spotifyTokens.refresh_token) {
        return res.status(400).json({ error: 'No refresh token available. Please re-authenticate.' });
    }

    const success = await refreshAccessToken();
    if (success) {
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            expires_at: new Date(spotifyTokens.expires_at)
        });
    } else {
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

// Simple page to refresh token
app.get('/admin/refresh-token', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #121212; color: #fff;">
                <h1 style="color: #1DB954;">🔄 Refresh Diego's Spotify Token</h1>
                <p>Current token status:</p>
                <div id="status" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                    Loading...
                </div>
                <button onclick="refreshToken()" style="background: #1DB954; color: white; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; margin: 20px;">
                    Refresh Token Now
                </button>
                <div id="result" style="margin-top: 20px;"></div>

                <script>
                    async function checkStatus() {
                        try {
                            const response = await fetch('/api/auth-status');
                            const data = await response.json();
                            document.getElementById('status').innerHTML = \`
                                <strong>Authenticated:</strong> \${data.authenticated ? '✅ Yes' : '❌ No'}<br>
                                <strong>Has Refresh Token:</strong> \${data.hasRefreshToken ? '✅ Yes' : '❌ No'}<br>
                                <strong>Token Expired:</strong> \${data.tokenExpired ? '❌ Yes' : '✅ No'}<br>
                                <strong>Owner:</strong> \${data.owner}
                            \`;
                        } catch (error) {
                            document.getElementById('status').innerHTML = 'Error checking status: ' + error.message;
                        }
                    }

                    async function refreshToken() {
                        try {
                            const response = await fetch('/api/refresh-token', { method: 'POST' });
                            const data = await response.json();

                            if (data.success) {
                                document.getElementById('result').innerHTML = \`
                                    <div style="background: rgba(29, 185, 84, 0.1); border: 1px solid rgba(29, 185, 84, 0.3); padding: 15px; border-radius: 10px; color: #1DB954;">
                                        ✅ Token refreshed successfully!<br>
                                        <small>Expires at: \${data.expires_at}</small>
                                    </div>
                                \`;
                                checkStatus();
                            } else {
                                document.getElementById('result').innerHTML = \`
                                    <div style="background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); padding: 15px; border-radius: 10px; color: #ff4444;">
                                        ❌ Error: \${data.error}
                                    </div>
                                \`;
                            }
                        } catch (error) {
                            document.getElementById('result').innerHTML = \`
                                <div style="background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); padding: 15px; border-radius: 10px; color: #ff4444;">
                                    ❌ Error: \${error.message}
                                </div>
                            \`;
                        }
                    }

                    // Check status on page load
                    checkStatus();
                </script>
            </body>
        </html>
    `);
});

// Periodically update current track (every 30 seconds)
cron.schedule('*/30 * * * * *', async () => {
    if (spotifyTokens.access_token) {
        try {
            const track = await getCurrentlyPlaying();
            currentTrack = track;
            lastFetchTime = Date.now();
        } catch (error) {
            console.error('Error in scheduled track update:', error);
        }
    }
});

// Proactively refresh token every 50 minutes (before it expires)
cron.schedule('0 */50 * * * *', async () => {
    if (spotifyTokens.refresh_token && spotifyTokens.expires_at) {
        // Refresh if token expires in the next 10 minutes
        const timeUntilExpiry = spotifyTokens.expires_at - Date.now();
        const tenMinutes = 10 * 60 * 1000;

        if (timeUntilExpiry < tenMinutes) {
            console.log('Proactively refreshing token (expires soon)...');
            const success = await refreshAccessToken();
            if (success) {
                console.log('Token proactively refreshed successfully');
            } else {
                console.error('Failed to proactively refresh token');
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Spotify backend server running on port ${PORT}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
    console.log(`Redirect URI: ${SPOTIFY_REDIRECT_URI}`);
});
