import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-4">Movie Details</h2>
      <p className="text-gray-400">Showing details for movie ID: {id}</p>
    </div>
  );
}

export default MovieDetails;
