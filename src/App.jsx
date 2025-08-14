import { useCallback, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import RegistrationForm from "./components/RegistrationForm";
import { movies } from "./data/movies";

export default function App() {
  const [filters, setFilters] = useState({ q: "", sortBy: "title-asc" });
  const onFilterChange = useCallback((f) => setFilters(f), []);

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase().trim();
    let list = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.year.toLowerCase().includes(q)
    );

    const [key, dir] = filters.sortBy.split("-");
    list.sort((a, b) => {
      const av = key === "year" ? Number(a.year) : a.title.toLowerCase();
      const bv = key === "year" ? Number(b.year) : b.title.toLowerCase();
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Movies & User Form</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <SearchBar onFilterChange={onFilterChange} />
          <MovieList items={filtered} />
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}
