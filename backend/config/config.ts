import dotenv from "dotenv";

dotenv.config();

export const getSetlistFmConfig = () => ({
  apiUrl: process.env.SETLIST_API_URL,
  apiKey: process.env.SETLIST_API_KEY,
});

export const getSpotifyConfig = () => ({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  apiUrl: "https://accounts.spotify.com/api/token",
});
