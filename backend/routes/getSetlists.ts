import { Router } from "express";
import { getArtistSetlists } from "../controllers/getArtistSetlistsController";

const getSetlistsRoute = Router();

getSetlistsRoute.get("/search/setlists", getArtistSetlists);

export default getSetlistsRoute;
