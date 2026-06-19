import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = ["top", "work", "experience", "education", "research", "contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.intersectionRatio);
          let best = "";
          let bestRatio = 0;
          visible.forEach((ratio, sId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sId;
            }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-xl border-b border-rule/60 py-4"
          : "bg-transparent py-7"
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-end justify-between gap-8">
        <a href="#top" className="flex flex-col leading-none group">
          <span className="font-serif italic text-2xl text-ink transition-colors group-hover:text-accent">
            Shreya Jain
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-soft">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative inline-block transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-ink after:transition-[width] after:duration-500 ${
                    isActive
                      ? "text-ink after:w-full"
                      : "hover:text-ink after:w-0 hover:after:w-full"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="/Shreya_Jain_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))", color: "var(--accent-foreground)" }}
              className="px-4 py-2 rounded-full shadow-[0_8px_22px_-12px_var(--accent)] hover:shadow-[0_12px_26px_-10px_var(--accent)] transition-shadow"
            >
              Résumé ↗
            </a>
          </li>
          <li>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-rule hover:ring-ink transition-all text-ink-soft hover:text-ink"
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-rule text-ink-soft"
          >
            {dark ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[11px] uppercase tracking-[0.22em] text-ink-soft px-3 py-2 border border-rule rounded-full"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden mt-4 mx-6 border-t border-rule pt-6 pb-4 flex flex-col gap-5 text-sm uppercase tracking-[0.18em]"
        >
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={isActive ? "text-ink" : "text-ink-soft hover:text-ink"}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="/Shreya_Jain_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-ink"
          >
            Résumé ↗
          </a>
        </div>
      )}
    </nav>
  );
}
