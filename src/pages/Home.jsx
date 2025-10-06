import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "4f7e6254"; // replace with your real key

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-400 mb-4">Search for a Movie</h2>
      <SearchBar onSearch={searchMovies} />

      {loading && <p className="text-gray-400 mt-4">Loading...</p>}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
