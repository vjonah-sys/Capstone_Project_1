import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <MovieList query={query} />
    </div>
  );
}
