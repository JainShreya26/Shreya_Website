import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Work } from "@/components/portfolio/Work";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Research } from "@/components/portfolio/Research";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Layered } from "@/components/portfolio/Layered";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreya D Jain — AI Engineer & Data Scientist" },
      {
        name: "description",
        content:
          "Portfolio of Shreya D Jain — AI Engineer & Data Scientist at Michigan Medicine. RAG, LLMs, causal inference, NLP, and healthcare ML.",
      },
      { property: "og:title", content: "Shreya D Jain — AI Engineer & Data Scientist" },
      {
        property: "og:description",
        content:
          "RAG, LLMs, causal inference, NLP, and healthcare ML — selected work, experience, and publications.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shreya D Jain",
          jobTitle: "AI Engineer & Data Scientist",
          email: "mailto:shreyadj@umich.edu",
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "University of Michigan" },
            { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University" },
          ],
          worksFor: { "@type": "Organization", name: "Michigan Medicine" },
          sameAs: [
            "https://linkedin.com/in/shreyadjain/",
            "https://github.com/JainShreya26",
          ],
          url: "https://shreyadjain.com",
          knowsAbout: [
            "Large Language Models",
            "Retrieval‑Augmented Generation",
            "Causal Inference",
            "Natural Language Processing",
            "Computer Vision",
            "Healthcare Machine Learning",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-canvas text-ink">
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Layered><Hero /></Layered>
        <Layered><About /></Layered>
        <Layered><Work /></Layered>
        <Layered><Experience /></Layered>
        <Layered><Education /></Layered>
        <Layered><Research /></Layered>
        <Layered><Contact /></Layered>
      </main>
    </div>
  );
}
