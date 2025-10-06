import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "4f7e6254"; // Your OMDB API key

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found. Try a different search.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">🎬 Movie Database</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Loading & Error States */}
        {loading && <p className="text-center text-gray-500">Loading movies...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Movie Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                alt={movie.Title}
                className="w-full h-72 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{movie.Title}</h3>
                <p className="text-gray-600">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {!loading && !error && movies.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Start by searching for a movie above 👆
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
