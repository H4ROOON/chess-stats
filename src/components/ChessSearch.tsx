"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChessSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/player/${query}`);
    }
  };
  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Search Player (e.g. Hikaru)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-green-500 transition"
      />
      <button
        type="submit"
        className="bg-green-600 px-6 py-3 rounded-lg text-white font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20"
      >
        Search
      </button>
    </form>
  );
}
