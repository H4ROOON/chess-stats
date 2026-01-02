# Chess Stats App

A real-time chess analytics dashboard built with Next.js 15 and Tailwind CSS. Search for any user on Chess.com, compare players, and explore the history of World Champions.

[Live Preview:](https://haroon-chess-stats.vercel.app/)

---

## Features

-Live Player Search — fetches public player data from the Chess.com API.
-Interactive stats — visual breakdown of Rapid, Blitz, and Bullet ratings.
-Head-to-Head — compare two players side-by-side.
-Hall of Fame — curated World Champions section with historical data.
-Dark Mode — comfortable, consistent UI for long analysis sessions.
-TypeScript + server components for a modern DX and small client bundles.

## Tech stack

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS v4
- Language: TypeScript
- API: Chess.com Public API (no auth required)
- Deployment: Vercel

## Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn/pnpm — update commands accordingly)

## Quick start

1. Clone the repo

```bash
git clone https://github.com/yourusername/chess-stats.git
cd chess-stats
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 (or the URL printed by Next) in your browser.

---

## Available scripts

Assumes package.json scripts like typical Next.js + TypeScript projects. Adjust if yours differ.

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
```

## Project structure

This matches your current layout — update paths & files as your code evolves.

```
.chess/
├─ .next/
├─ node_modules/
├─ public/
│  ├─ champions/
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  ├─ window.svg
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ champions/
│  │  │  └─ page.tsx
│  │  ├─ compare/
│  │  │  └─ page.tsx
│  │  ├─ player/
│  │  │  └─ [username]/
│  │  │     ├─ loading.tsx
│  │  │     ├─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
├─ .gitignore
├─ next-env.d.ts
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.js
├─ tsconfig.json
└─ README.md
```

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`
3. Implement changes, add tests where relevant.
4. Run linters & type checks:
   ```bash
   npm run lint
   npm run typecheck
   ```
5. Commit and open a pull request with a clear description and screenshots/GIFs for UI changes.

## License & attribution

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

## Owner / Maintainer:

## @H4ROOON
