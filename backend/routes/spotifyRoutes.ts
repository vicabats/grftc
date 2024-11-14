import express from "express";
import { getSpotifyTokenAndPlaylists } from "../controllers/spotifyController";

const spotifyRoutes = express.Router();

// Rota para buscar token e playlists
spotifyRoutes.get("/callback", getSpotifyTokenAndPlaylists);

export default spotifyRoutes; // Apenas uma exportação
