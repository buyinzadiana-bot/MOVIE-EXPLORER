import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../utils/api";
import useFavorites from "../hooks/useFavorites";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchMovieById(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!movie) return <p className="text-center mt-8">Movie not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <img
        src={movie.image?.original}
        alt={movie.name}
        className="rounded-lg w-full"
      />
      <h1 className="text-2xl font-bold">{movie.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
      <button
        onClick={() => toggleFavorite(movie)}
        className="px-4 py-2 bg-yellow-400 rounded"
      >
        {isFavorite(movie.id) ? "★ Remove Favorite" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}
