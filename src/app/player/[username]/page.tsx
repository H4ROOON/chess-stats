import Link from "next/link";
import ChessSearch from "@/components/ChessSearch";

interface ChessProfile {
  username: string;
  followers: number;
  status: string;
  avatar?: string;
  url: string;
  country: string;
}

interface ChessStats {
  chess_rapid?: { last: { rating: number } };
  chess_blitz?: { last: { rating: number } };
  chess_bullet?: { last: { rating: number } };
}

interface Game {
  url: string;
  white: { username: string; result: string; rating: number };
  black: { username: string; result: string; rating: number };
}

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getRecentGames(username: string) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  try {
    const res = await fetch(
      `https://api.chess.com/pub/player/${username}/games/${year}/${month}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.games.reverse().slice(0, 5);
  } catch (error) {
    return [];
  }
}

function getGameColor(game: Game, username: string) {
  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
  const result = isWhite ? game.white.result : game.black.result;

  if (result === "win") return "bg-green-500";
  if (
    ["checkmated", "timeout", "resigned", "lose", "abandoned"].includes(result)
  )
    return "bg-red-500";
  return "bg-gray-500";
}

export default async function PlayerPage({ params }: PageProps) {
  const { username } = await params;

  const gamesData: Game[] = await getRecentGames(username);

  const [profileRes, statsRes] = await Promise.all([
    fetch(`https://api.chess.com/pub/player/${username}`),
    fetch(`https://api.chess.com/pub/player/${username}/stats`),
  ]);

  if (!profileRes.ok) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-red-500 text-4xl font-bold mb-4">
          Player Not Found
        </h1>
        <Link
          href="/"
          className="bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Try Again
        </Link>
      </main>
    );
  }

  const profile: ChessProfile = await profileRes.json();
  const stats: ChessStats = await statsRes.json();
  const countryCode = profile.country.split("/").pop()?.toLowerCase();

  return (
    <main className="min-h-screen bg-white text-black p-6 flex flex-col items-center pt-10">
      <div className="w-full max-w-md mb-8">
        <ChessSearch />
      </div>

      <div className="bg-gray-900 text-white border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden mb-6">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-xl mx-auto mb-4 border-4 border-gray-800 shadow-lg relative z-10"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center border-4 border-gray-700 relative z-10">
            <span className="text-4xl">♟️</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl font-bold capitalize">{profile.username}</h1>
          {countryCode && (
            <img
              src={`https://flagcdn.com/w80/${countryCode}.png`}
              alt="Flag"
              className="w-6 h-4 rounded-sm object-cover"
            />
          )}
        </div>
        <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-wider">
          {profile.status}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Rapid
            </p>
            <p className="text-lg font-bold text-green-400">
              {stats.chess_rapid?.last?.rating ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Blitz
            </p>
            <p className="text-lg font-bold text-yellow-400">
              {stats.chess_blitz?.last?.rating ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Bullet
            </p>
            <p className="text-lg font-bold text-red-400">
              {stats.chess_bullet?.last?.rating ?? "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          Recent Matches{" "}
          <span className="text-xs font-normal text-gray-500">(Last 5)</span>
        </h3>

        <div className="space-y-3">
          {gamesData.map((game, i) => {
            const isWhite =
              game.white.username.toLowerCase() === username.toLowerCase();
            const opponent = isWhite ? game.black : game.white;
            const myResult = isWhite ? game.white.result : game.black.result;

            return (
              <a
                key={i}
                href={game.url}
                target="_blank"
                className="block bg-gray-50 border border-gray-200 p-3 rounded-lg hover:shadow-md transition flex justify-between items-center group"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    vs {opponent.rating}
                  </span>
                  <span className="font-bold text-gray-800">
                    {opponent.username}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-wide ${getGameColor(
                    game,
                    username
                  )}`}
                >
                  {myResult === "repetition" ? "Draw" : myResult}
                </div>
              </a>
            );
          })}

          {gamesData.length === 0 && (
            <p className="text-gray-500 text-center py-4 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
              No games played this month.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
