import { useState, useMemo } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SerachBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const { movies, loading, error } = useFetchMovies();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(() => {
    const allGenres = movies.flatMap((m) => m.genres);
    return [...new Set(allGenres)];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) =>
      (category ? m.genres.includes(category) : true) &&
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, category, search]);

  if (loading) return <p className="text-center mt-8">Loading movies...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No movies found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}