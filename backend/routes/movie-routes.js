import express from "express";
import { addMovie, getAllMovies, getMoviebyId } from "../controllers/movie-controller";

const movieRouter = express.Router();

movieRouter.post("/",addMovie);
movieRouter.get("/",getAllMovies);

movieRouter.get("/:id",getMoviebyId);

export default movieRouter;