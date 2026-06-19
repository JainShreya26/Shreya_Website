import { useState } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <Reveal className="md:col-span-6">
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-accent mb-8">
            06 / Inquiry
          </h2>
          <p className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance">
            Let's build something
            <br />
            <span className="italic text-gradient">worth measuring.</span>
          </p>
          <p className="mt-8 text-ink-soft text-lg max-w-md leading-relaxed">
            Open to AI engineering and data science roles, research
            collaborations, and conversations with founders building in
            healthcare, scientific tooling, or applied ML.
          </p>

          <dl className="mt-12 space-y-5">
            {[
              ["Email", "shreyadj@umich.edu", "mailto:shreyadj@umich.edu"],
              ["LinkedIn", "linkedin.com/in/shreyadjain", "https://linkedin.com/in/shreyadjain/"],
              ["GitHub", "github.com/JainShreya26", "https://github.com/JainShreya26"],
              ["Location", "Ann Arbor, MI · USA", null],
            ].map(([k, v, href]) => (
              <div key={k} className="grid grid-cols-3 gap-4 pb-5 border-b border-rule">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                {href ? (
                  <dd className="col-span-2">
                    <a
                      href={href as string}
                      target={(href as string).startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-ink hover:text-accent border-b border-rule hover:border-accent transition-colors pb-0.5"
                    >
                      {v} ↗
                    </a>
                  </dd>
                ) : (
                  <dd className="col-span-2 text-ink">{v}</dd>
                )}
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-6 md:pl-10 md:border-l border-rule">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Portfolio inquiry — ${data.get("name")}`);
              const body = encodeURIComponent(
                `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`,
              );
              window.location.href = `mailto:shreyadj@umich.edu?subject=${subject}&body=${body}`;
              setSent(true);
            }}
            className="space-y-8"
          >
            {[
              { id: "name", label: "Your name", type: "text" },
              { id: "email", label: "Email address", type: "email" },
            ].map((f) => (
              <label key={f.id} htmlFor={f.id} className="block">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                  {f.label}
                </span>
                <input
                  required
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  autoComplete={f.id === "email" ? "email" : "name"}
                  className="w-full bg-transparent border-b border-rule py-3 text-lg text-ink focus:border-ink focus:outline-none transition-colors"
                />
              </label>
            ))}
            <label htmlFor="message" className="block">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                Message
              </span>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                className="w-full bg-transparent border-b border-rule py-3 text-lg text-ink focus:border-ink focus:outline-none transition-colors resize-none"
              />
            </label>
            <button
              type="submit"
              style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))", color: "var(--accent-foreground)" }}
              className="group inline-flex items-center gap-3 text-sm py-3.5 pl-5 pr-6 rounded-full shadow-[0_12px_30px_-12px_var(--accent)] hover:shadow-[0_16px_34px_-10px_var(--accent)] transition-shadow"
            >
              {sent ? "Opening your mail client…" : "Send message"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
