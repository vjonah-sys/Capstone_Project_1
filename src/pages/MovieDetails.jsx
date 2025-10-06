import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "4f7e6254"; // Your OMDB API key

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading movie details...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600">📅 {movie.Year} | 🎭 {movie.Genre}</p>
          <p className="text-gray-800">⭐ {movie.imdbRating} / 10</p>
          <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>

          <div className="mt-6">
            <Link
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
