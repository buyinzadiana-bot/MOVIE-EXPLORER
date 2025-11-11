import axios from "axios";

export const fetchMovies = async () => {
  const res = await axios.get("https://api.tvmaze.com/shows");
  return res.data;
};

export const fetchMovieById = async (id) => {
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
  return res.data;
};