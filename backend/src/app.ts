import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import spotifyRoutes from "../routes/spotifyRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(spotifyRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
