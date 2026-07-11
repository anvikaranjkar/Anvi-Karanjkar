import Link from "next/link";

export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="inner-page">
      <section className="mac-window page-window">
        <div className="mac-titlebar">
          <Link href="/" className="mac-close" aria-label="Return to Rubik's Cube">×</Link>
          <span>{title}.dir</span>
          <span className="mac-zoom" aria-hidden="true" />
        </div>
        <div className="page-window__body">
          <div className="page-title-row">
            <h1>{title}</h1>
            <Link href="/" className="back-link">← Desktop</Link>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
