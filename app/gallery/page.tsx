import { MediaGallery } from "@/components/MediaGallery";
import { Navigation } from "@/components/Navigation";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900">SMB Video & PDF Learning Hub</h1>
        <p className="text-sm text-slate-600">
          Filter by role, skill level, duration, and document type to launch interactive training media.
        </p>
        <MediaGallery />
      </main>
    </div>
  );
}
