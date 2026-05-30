export function Footer() {
  return (
    <footer className="border-t border-rule px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-[11px] uppercase tracking-[0.18em] text-muted">
        <p>Shreya Jain</p>
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/shreyadjain/" target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href="https://github.com/JainShreya26" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a href="mailto:shreyadj@umich.edu" className="hover:text-ink">Email</a>
        </div>
      </div>
    </footer>
  );
}
