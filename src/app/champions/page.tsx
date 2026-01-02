import Link from "next/link";

interface Champion {
  name: string;
  years: string;
  country: string;
  img: string;
  desc: string;
  openings: string;
}
const CHAMPIONS: Champion[] = [
  {
    name: "Wilhelm Steinitz",
    years: "1886–1894",
    country: "Austria/USA",
    img: "/champions/steinitz.jpeg",
    desc: "The first official World Champion. He revolutionized the game by proving that attacks must be prepared by strategic advantages.",
    openings: "Viennese Game, Steinitz Gambit",
  },
  {
    name: "Emanuel Lasker",
    years: "1894–1921",
    country: "Germany",
    img: "/champions/Lasker.jpeg",
    desc: "Held the title for 27 years (longest in history). A pioneer of psychological chess.",
    openings: "Ruy Lopez, Queen's Gambit",
  },
  {
    name: "José Raúl Capablanca",
    years: "1921–1927",
    country: "Cuba",
    img: "/champions/Capablanca.jpeg",
    desc: "The 'Human Chess Machine'. Famous for his endgame genius and speed. Undefeated for 8 years.",
    openings: "Queen's Gambit Declined",
  },
  {
    name: "Alexander Alekhine",
    years: "1927–1935, 1937–1946",
    country: "France/Russia",
    img: "/champions/Alekhine.jpeg",
    desc: "Known for fierce, imaginative attacking combinations. The only champion to die while holding the title.",
    openings: "Alekhine's Defense",
  },
  {
    name: "Max Euwe",
    years: "1935–1937",
    country: "Netherlands",
    img: "/champions/Euwe.jpeg",
    desc: "A mathematics professor who shocked the world by defeating Alekhine. Later served as FIDE President.",
    openings: "Slav Defense, Nimzo-Indian",
  },
  {
    name: "Mikhail Botvinnik",
    years: "1948–1963",
    country: "USSR",
    img: "/champions/Botvinnik.jpeg",
    desc: "The 'Patriarch of the Soviet Chess School'. Treated chess as a science and trained Kasparov/Karpov.",
    openings: "English Opening, French Winawer",
  },
  {
    name: "Vasily Smyslov",
    years: "1957–1958",
    country: "USSR",
    img: "/champions/Smyslov.jpeg",
    desc: "Known for his harmonious, intuitive style and endgame prowess.",
    openings: "Ruy Lopez, English",
  },
  {
    name: "Mikhail Tal",
    years: "1960–1961",
    country: "Latvia/USSR",
    img: "/champions/Tal.jpeg",
    desc: "The 'Magician from Riga'. Famous for chaotic sacrifices and intuitive attacks.",
    openings: "Sicilian Defense",
  },
  {
    name: "Tigran Petrosian",
    years: "1963–1969",
    country: "Armenia/USSR",
    img: "/champions/Petrosian.jpeg",
    desc: "'Iron Tigran'. A defensive genius who was almost impossible to beat.",
    openings: "Caro-Kann, King's Indian",
  },
  {
    name: "Boris Spassky",
    years: "1969–1972",
    country: "USSR/France",
    img: "/champions/Spassky.jpeg",
    desc: "A universal player who could attack or defend with equal brilliance. Played the 'Match of the Century'.",
    openings: "King's Gambit",
  },
  {
    name: "Bobby Fischer",
    years: "1972–1975",
    country: "USA",
    img: "/champions/Fischer.jpeg",
    desc: "Ended Soviet dominance single-handedly. Known for absolute precision and the 1972 match.",
    openings: "Ruy Lopez, Sicilian Najdorf",
  },
  {
    name: "Anatoly Karpov",
    years: "1975–1985",
    country: "Russia",
    img: "/champions/Karpov.jpeg",
    desc: "The 'Boa Constrictor'. Strangled opponents positionally. Played five world title matches against Kasparov.",
    openings: "Caro-Kann",
  },
  {
    name: "Garry Kasparov",
    years: "1985–2000",
    country: "Russia",
    img: "/champions/Kasparov.jpeg",
    desc: "The 'Beast of Baku'. Dominated the rating list for 20 years. Aggressive, dynamic style.",
    openings: "Sicilian Najdorf, King's Indian",
  },
  {
    name: "Vladimir Kramnik",
    years: "2000–2007",
    country: "Russia",
    img: "/champions/Kramnik.jpeg",
    desc: "The man who beat Kasparov. Famous for reviving the 'Berlin Defense' and deep position play.",
    openings: "Berlin Defense",
  },
  {
    name: "Viswanathan Anand",
    years: "2007–2013",
    country: "India",
    img: "/champions/Anand.jpeg",
    desc: "The 'Tiger of Madras'. Renowned for incredibly fast calculation and winning across all formats.",
    openings: "Sicilian, Semi-Slav",
  },
  {
    name: "Magnus Carlsen",
    years: "2013–2023",
    country: "Norway",
    img: "/champions/Carlsen.jpeg",
    desc: "The Greatest of All Time. 20-time World Champion. Famous for grinding down opponents.",
    openings: "Ruy Lopez, Sicilian",
  },
  {
    name: "Ding Liren",
    years: "2023–2024",
    country: "China",
    img: "/champions/Liren.jpeg",
    desc: "The 'Immortal Defender'. Became champion after a dramatic rapid tiebreak.",
    openings: "Italian Game",
  },
  {
    name: "Gukesh Dommaraju",
    years: "2024–Present",
    country: "India",
    img: "/champions/Dommaraju.jpeg",
    desc: "The youngest World Champion in history. A prodigy known for his calm demeanor.",
    openings: "Queen's Gambit",
  },
];

export default function ChampionsPage() {
  return (
    <main
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}
        >
          Hall of <span style={{ color: "#22c55e" }}>Fame</span>
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {CHAMPIONS.map((champ, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "15px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "150px",
                background: "linear-gradient(to right, #222, #111)",
                position: "relative",
              }}
            >
              <img
                src={champ.img}
                alt={champ.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "15px",
                  objectFit: "cover",
                  border: "4px solid #111",
                  position: "absolute",
                  bottom: "-20px",
                  left: "20px",
                }}
              />
            </div>

            <div style={{ padding: "30px 20px 20px 20px", marginTop: "10px" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "0 0 5px 0",
                }}
              >
                {champ.name}
              </h2>
              <p
                style={{
                  color: "#22c55e",
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  marginBottom: "15px",
                }}
              >
                {champ.years} • {champ.country}
              </p>
              <p
                style={{
                  color: "#aaa",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                {champ.desc}
              </p>
              <div style={{ borderTop: "1px solid #333", paddingTop: "15px" }}>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Signature Opening
                </p>
                <p style={{ color: "#ddd", fontSize: "0.9rem" }}>
                  {champ.openings}
                </p>
              </div>
            </div>
          </div>
        ))}
        <Link
          href="/"
          className="text-[#aaa] no-underline hover:text-green-500 transition-colors"
        >
          ← Back to Search
        </Link>
      </div>
    </main>
  );
}
