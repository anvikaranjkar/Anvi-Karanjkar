import { PageShell } from "../components/PageShell";
import { projects } from "../data/portfolio";

export default function ProjectsPage() {
  return (
    <PageShell title="Projects">
      <div className="project-grid">
        {projects.map((project, index) => (
          <a href={project.href} target="_blank" rel="noreferrer" className="project-card" key={project.name}>
            <div><span>{String(index + 1).padStart(2, "0")}</span><span>{project.year}</span></div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
