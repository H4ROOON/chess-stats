import ChessSearch from "@/components/ChessSearch";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-red
     text-white flex flex-col items-center justify-center p-6"
    >
      <div className="text-center space-y-6 mb-10">
        <h1 className="text-6xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            Chess
          </span>
          Stats
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Search for any player on Chess.com and analyze their live ratings, win
          rates, and profile stats.
        </p>
      </div>

      <ChessSearch />
    </main>
  );
}
