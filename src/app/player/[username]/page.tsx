import Link from "next/link";
import ChessSearch from "@/components/ChessSearch";

interface ChessProfile {
  username: string;
  followers: number;
  status: string;
  avatar?: string;
  url: string;
  country: string;
  name?: string;
}

interface ChessStats {
  chess_rapid?: { last: { rating: number } };
  chess_blitz?: { last: { rating: number } };
  chess_bullet?: { last: { rating: number } };
}

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { username } = await params;

  // 1. Fetch Profile and Stats in parallel (Fastest way)
  const [profileRes, statsRes] = await Promise.all([
    fetch(`https://api.chess.com/pub/player/${username}`),
    fetch(`https://api.chess.com/pub/player/${username}/stats`),
  ]);

  // 2. Error Handling (If player doesn't exist)
  if (!profileRes.ok) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-red-500 text-4xl font-bold mb-4">
          Player Not Found ♟️
        </h1>
        <p className="text-gray-400 mb-8">
          Could not find user:{" "}
          <span className="text-white font-mono">{username}</span>
        </p>
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

  // 3. Extract Country Code
  const countryCode = profile.country.split("/").pop()?.toLowerCase();

  return (
    <main className="min-h-screen bg-white text-white p-6 flex flex-col items-center pt-20">
      {/* Top Search Bar (So they can search again easily) */}
      <div className="w-full max-w-md mb-12">
        <ChessSearch />
      </div>

      {/* THE PROFILE CARD */}
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl shadow-green-900/10 relative overflow-hidden">
        {/* Glow Effect behind Avatar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>

        {/* Avatar */}
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-28 h-28 rounded-xl mx-auto mb-6 border-4 border-gray-800 shadow-lg relative z-10"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-800 rounded-xl mx-auto mb-6 flex items-center justify-center border-4 border-gray-700 relative z-10">
            <span className="text-4xl">♟️</span>
          </div>
        )}

        {/* Name + Flag */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white capitalize tracking-tight">
            {profile.username}
          </h1>
          {countryCode && (
            <img
              src={`https://flagcdn.com/w80/${countryCode}.png`}
              alt="Flag"
              className="w-6 h-4 rounded-sm object-cover shadow-sm"
            />
          )}
        </div>

        {/* Status / Title */}
        <div className="text-center mb-8">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full uppercase tracking-wider">
            {profile.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-800/50 p-4 rounded-xl text-center border border-gray-700/50">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
              Rapid
            </p>
            <p className="text-xl font-bold text-green-400 font-mono">
              {stats.chess_rapid?.last?.rating ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl text-center border border-gray-700/50">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
              Blitz
            </p>
            <p className="text-xl font-bold text-yellow-400 font-mono">
              {stats.chess_blitz?.last?.rating ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl text-center border border-gray-700/50">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
              Bullet
            </p>
            <p className="text-xl font-bold text-red-400 font-mono">
              {stats.chess_bullet?.last?.rating ?? "-"}
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-800 pt-6 flex justify-between items-center text-sm text-gray-400">
          <span>
            Followers:{" "}
            <span className="text-white font-semibold">
              {profile.followers.toLocaleString()}
            </span>
          </span>
          <a
            href={profile.url}
            target="_blank"
            className="text-green-500 hover:text-green-400 font-medium hover:underline flex items-center gap-1"
          >
            Chess.com ↗
          </a>
        </div>
      </div>

      <Link
        href="/"
        className="mt-12 text-gray-600 hover:text-gray-400 transition text-sm"
      >
        ← Return Home
      </Link>
    </main>
  );
}
