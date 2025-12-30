export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-500 animate-pulse font-mono">
          Fetching Grandmaster Data...
        </p>
      </div>
    </main>
  );
}
