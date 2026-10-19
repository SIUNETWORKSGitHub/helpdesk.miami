import { MediaGallery } from "@/components/MediaGallery";
import { Navigation } from "@/components/Navigation";
import { SiucloudAdvisor } from "@/components/SiucloudAdvisor";

export default function Home() {
  const pathways = [
    {
      title: "Onboarding",
      description: "Fast-start resources for SMB employees and internal IT teams joining daily operations.",
    },
    {
      title: "Cybersecurity Awareness",
      description: "Role-based security training covering phishing response, reporting, and compliance readiness.",
    },
    {
      title: "Cloud/SaaS Tools",
      description: "Practical governance for account access, SaaS administration, and cloud operational hygiene.",
    },
    {
      title: "Troubleshooting",
      description: "Repeatable incident triage and recovery workflows for common SMB support scenarios.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-widest">SMB Learning & IT Operations Hub</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">HelpDesk.Miami Portal</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
            Build skills for frontline SMB employees and internal IT teams through structured tracks, interactive media,
            and personalized recommendations from Siucloud AI Advisor.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-slate-900">SMB Learning Pathways</h2>
            <p className="text-sm text-slate-600">Choose your track and complete training in a compliance-focused sequence.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pathways.map((pathway) => (
              <article key={pathway.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-slate-900">{pathway.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{pathway.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-blue-300 bg-blue-50/60 p-2 shadow-sm">
          <SiucloudAdvisor />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured SMB Training Media</h2>
          </div>
          <MediaGallery compact />
        </section>
      </main>
    </div>
  );
}
