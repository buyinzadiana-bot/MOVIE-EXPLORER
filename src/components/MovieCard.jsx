import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

export default function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  return (
    <Motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col"
    >
      <img
        src={movie.image?.medium}
        alt={movie.name}
        className="rounded-lg mb-2 w-full h-60 object-cover"
      />
      <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
        {movie.name}
      </h2>
      <div className="flex justify-between items-center">
        <Link
          to={`/movie/${movie.id}`}
          className="text-blue-500 hover:underline"
        >
          Details
        </Link>
        <button
          onClick={() => onToggleFavorite(movie)}
          className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          {isFavorite(movie.id) ? "★" : "☆"} Favorite
        </button>
      </div>
    </Motion.div>
  );
}