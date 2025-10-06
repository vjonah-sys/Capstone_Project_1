export default function MovieList({ query }) {
  if (!query) {
    return <p className="text-center text-gray-500">Start typing to search for movies...</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* MovieCard components will go here later */}
    </div>
  );
}
