import { Request, Response } from "express";
import axios from "axios";
import { ApiResponse, Setlist, SongSet, Song } from "./types";
import { getSetlistFmConfig } from "../config/config";

export const getArtistSetlists = async (req: Request, res: Response) => {
  const artist = req.query.q;
  const { apiUrl, apiKey } = getSetlistFmConfig();

  const config = {
    headers: {
      "x-api-key": apiKey,
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.get<ApiResponse>(
      `${apiUrl}/search/setlists?artistName=${artist}&p=3`,
      config
    );

    const latestSetlists = response.data.setlist
      .slice(0, 3)
      .map((setlist: Setlist) => ({
        id: setlist.id,
        eventDate: setlist.eventDate,
        artist: setlist.artist.name,
        venue: setlist.venue.name,
        city: setlist.venue.city.name,
        state: setlist.venue.city.state,
        country: setlist.venue.city.country.name,
        songs: setlist.sets.set.flatMap((s: SongSet) =>
          s.song.map((song: Song) => song.name)
        ),
      }));

    res.json(latestSetlists);

    console.log(config);
    console.log(`${apiUrl}/search/setlists?artistName=${artist}&p=3`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Nenhuma setlist do artista procurado foi encontrada!");
  }
};
