import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node"; // Certifique-se de ter instalado o spotify-web-api-node
import { Request, Response } from "express"; // Importar tipos do Express
import { getSpotifyConfig } from "../config/config";

const { clientId, clientSecret, redirectUri, apiUrl } = getSpotifyConfig();

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

// Controlador para buscar o token e as playlists
export const getSpotifyTokenAndPlaylists = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.query.code as string; // Tipar o código como string

  console.log("Code:", code);

  try {
    // Obter o token de acesso usando o código
    const tokenResponse = await axios.post<{ access_token: string }>(
      apiUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri ?? "", // Garantindo que seja uma string
        client_id: clientId ?? "", // Garantindo que seja uma string
        client_secret: clientSecret ?? "", // Garantindo que seja uma string
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = tokenResponse.data.access_token; // Tipar corretamente

    // Configurar o acesso à API do Spotify com o token obtido
    spotifyApi.setAccessToken(access_token);

    // Obter as playlists do usuário
    const playlistsResponse = await spotifyApi.getUserPlaylists();
    const playlists = playlistsResponse.body.items;

    // Retornar o token e as playlists
    res.json({ access_token, playlists });
  } catch (error) {
    console.error("Error fetching access token or playlists:", error);
    res
      .status(500)
      .json({ error: "Error fetching access token or playlists." });
  }
};

export const redirectToSpotify = (req: Request, res: Response) => {
  const scopes = ["user-read-private", "user-read-email"];
  const state = "some-random-state"; // Você pode gerar um valor aleatório aqui

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  res.redirect(authorizeURL);
};
