import { PageShell } from "../components/PageShell";
import { contacts } from "../data/portfolio";

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <div className="contact-list">
        {contacts.map(([label, value, href]) => (
          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={label}>
            <span>{label}</span><h2>{value}</h2><span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
