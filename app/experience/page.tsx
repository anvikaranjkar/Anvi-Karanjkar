import { PageShell } from "../components/PageShell";
import { education, experience } from "../data/portfolio";

export default function ExperiencePage() {
  return (
    <PageShell title="Experience & Education">
      <section className="resume-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <div className="resume-list">
          {experience.map(([period, role, org]) => (
            <article key={`${role}-${org}`}><span>{period}</span><h3>{role}</h3><p>{org}</p></article>
          ))}
        </div>
      </section>
      <section className="resume-section" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <div className="resume-list">
          {education.map(([period, role, org]) => (
            <article key={org}><span>{period}</span><h3>{role}</h3><p>{org}</p></article>
          ))}
        </div>
      </section>
      <a className="pdf-link" href="/anvi-karanjkar-profile.pdf" target="_blank">Profile PDF ↗</a>
    </PageShell>
  );
}
