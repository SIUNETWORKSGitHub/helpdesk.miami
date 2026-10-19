import { MediaGallery } from "@/components/MediaGallery";
import { Navigation } from "@/components/Navigation";
import { SiucloudAdvisor } from "@/components/SiucloudAdvisor";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-widest">A - Z IT Support Training</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">HelpDesk.Miami Portal</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
            Learn help desk operations, networking, systems administration, and security through curated videos,
            downloadable PDFs, and personalized guidance from Siucloud AI.
          </p>
        </section>

        <SiucloudAdvisor />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured Learning Gallery</h2>
          </div>
          <MediaGallery compact />
        </section>
      </main>
    </div>
  );
}
