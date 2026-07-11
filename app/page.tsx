import { RubiksCube } from "./components/RubiksCube";

export default function Home() {
  return (
    <main className="home-page">
      <h1>Anvi Karanjkar</h1>
      <section className="mac-window puzzle-window" aria-label="Interactive Rubik's Cube application">
        <div className="mac-titlebar">
          <span className="mac-close" aria-hidden="true">×</span>
          <span>RubiksCube.app</span>
          <span className="mac-zoom" aria-hidden="true" />
        </div>
        <RubiksCube />
      </section>
    </main>
  );
}
