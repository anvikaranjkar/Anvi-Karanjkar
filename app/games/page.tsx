import { PageShell } from "../components/PageShell";
import { games } from "../data/portfolio";
import { CircuitBreaker } from "./CircuitBreaker";
import { MemoryMatch } from "./MemoryMatch";
import { PixelHunt } from "./PixelHunt";

export default function GamesPage() {
  return (
    <PageShell title="Games">
      <div className="games-layout">
        {games.map((game) => (
          <a className="featured-game" href={game.href} target="_blank" rel="noreferrer" key={game.name}>
            <span>{game.type}</span>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <strong>Play ↗</strong>
          </a>
        ))}
        <CircuitBreaker />
        <MemoryMatch />
        <PixelHunt />
      </div>
    </PageShell>
  );
}
