import { MediaGallery } from "@/components/MediaGallery";
import { Navigation } from "@/components/Navigation";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Video & PDF Galleries</h1>
        <p className="text-sm text-slate-600">
          Browse resources by track level, play embedded videos, and download reference guides.
        </p>
        <MediaGallery />
      </main>
    </div>
  );
}
