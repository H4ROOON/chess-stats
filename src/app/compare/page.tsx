"use client";

import { useState } from "react";
import Link from "next/link";

interface PlayerData {
  username: string;
  avatar?: string;
  stats: {
    rapid: number;
    blitz: number;
    bullet: number;
  };
  url: string;
}

export default function ComparePage() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [data1, setData1] = useState<PlayerData | null>(null);
  const [data2, setData2] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPlayer(username: string): Promise<PlayerData | null> {
    try {
      const profileRes = await fetch(
        `https://api.chess.com/pub/player/${username}`
      );
      if (!profileRes.ok) return null;
      const profile = await profileRes.json();

      const statsRes = await fetch(
        `https://api.chess.com/pub/player/${username}/stats`
      );
      const stats = await statsRes.json();

      return {
        username: profile.username,
        avatar: profile.avatar,
        url: profile.url,
        stats: {
          rapid: stats.chess_rapid?.last?.rating || 0,
          blitz: stats.chess_blitz?.last?.rating || 0,
          bullet: stats.chess_bullet?.last?.rating || 0,
        },
      };
    } catch (e) {
      return null;
    }
  }

  async function handleCompare() {
    if (!player1 || !player2) {
      setError("Please enter both usernames.");
      return;
    }
    setLoading(true);
    setError("");
    setData1(null);
    setData2(null);

    const [p1Data, p2Data] = await Promise.all([
      fetchPlayer(player1),
      fetchPlayer(player2),
    ]);

    if (!p1Data || !p2Data) {
      setError("One or both players could not be found.");
    } else {
      setData1(p1Data);
      setData2(p2Data);
    }
    setLoading(false);
  }

  const getColor = (val1: number, val2: number) => {
    if (val1 > val2) return "text-green-500 font-bold";
    if (val1 < val2) return "text-red-500";
    return "text-gray-400";
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        ⚔️ <span className="text-green-500">Head-to-Head</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-2xl bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <input
          type="text"
          placeholder="Player 1 (e.g. Hikaru)"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="bg-black border border-[#333] p-3 rounded-lg text-white w-full focus:outline-none focus:border-purple-500 transition"
        />
        <div className="flex items-center justify-center font-bold text-[#555]">
          VS
        </div>
        <input
          type="text"
          placeholder="Player 2 (e.g. MagnusCarlsen)"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="bg-black border border-[#333] p-3 rounded-lg text-white w-full focus:outline-none focus:border-purple-500 transition"
        />
        <button
          onClick={handleCompare}
          disabled={loading}
          className="bg-green-500 hover:bg-green-900 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          {loading ? "..." : "Fight!"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {data1 && data2 && (
        <div className="grid grid-cols-3 gap-4 w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-10">
          <div className="flex flex-col items-center text-center">
            <img
              src={
                data1.avatar ||
                "https://www.chess.com/bundles/web/images/user-image.svg"
              }
              className="w-20 h-20 md:w-32 md:h-32 rounded-xl mb-4 border-4 border-[#333]"
            />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {data1.username}
            </h2>
            <Link
              href={`/player/${data1.username}`}
              className="text-xs text-gray-500 hover:text-white underline"
            >
              View Profile
            </Link>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="text-center bg-black/50 p-3 rounded-lg">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                Rapid
              </p>
              <div className="flex justify-between items-center px-2 md:px-6">
                <span
                  className={getColor(data1.stats.rapid, data2.stats.rapid)}
                >
                  {data1.stats.rapid}
                </span>
                <span className="text-gray-700 text-xs">vs</span>
                <span
                  className={getColor(data2.stats.rapid, data1.stats.rapid)}
                >
                  {data2.stats.rapid}
                </span>
              </div>
            </div>

            <div className="text-center bg-black/50 p-3 rounded-lg">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                Blitz
              </p>
              <div className="flex justify-between items-center px-2 md:px-6">
                <span
                  className={getColor(data1.stats.blitz, data2.stats.blitz)}
                >
                  {data1.stats.blitz}
                </span>
                <span className="text-gray-700 text-xs">vs</span>
                <span
                  className={getColor(data2.stats.blitz, data1.stats.blitz)}
                >
                  {data2.stats.blitz}
                </span>
              </div>
            </div>

            <div className="text-center bg-black/50 p-3 rounded-lg">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                Bullet
              </p>
              <div className="flex justify-between items-center px-2 md:px-6">
                <span
                  className={getColor(data1.stats.bullet, data2.stats.bullet)}
                >
                  {data1.stats.bullet}
                </span>
                <span className="text-gray-700 text-xs">vs</span>
                <span
                  className={getColor(data2.stats.bullet, data1.stats.bullet)}
                >
                  {data2.stats.bullet}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={
                data2.avatar ||
                "https://www.chess.com/bundles/web/images/user-image.svg"
              }
              className="w-20 h-20 md:w-32 md:h-32 rounded-xl mb-4 border-4 border-[#333]"
            />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {data2.username}
            </h2>
            <Link
              href={`/player/${data2.username}`}
              className="text-xs text-gray-500 hover:text-white underline"
            >
              View Profile
            </Link>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-12 text-gray-500 hover:text-white transition"
      >
        ← Back Home
      </Link>
    </main>
  );
}
