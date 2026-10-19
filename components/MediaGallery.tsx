"use client";

import { useMemo, useState } from "react";
import {
  categories,
  documentTypes,
  getDurationBucket,
  mediaLibrary,
  roleTags,
  skillLevels,
  type Category,
  type DocumentType,
  type MediaItem,
  type RoleTag,
  type SkillLevel,
} from "@/lib/data";

type Props = {
  compact?: boolean;
};

type DurationFilter = "Any Duration" | "Under 10 min" | "10-20 min" | "20+ min";

function chapterAnchor(url: string, timestamp: string) {
  const [minutes = "0", seconds = "0"] = timestamp.split(":");
  const start = Number(minutes) * 60 + Number(seconds);
  return `${url}?start=${start}`;
}

export function MediaGallery({ compact = false }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [activeRole, setActiveRole] = useState<RoleTag | "All Roles">("All Roles");
  const [activeSkill, setActiveSkill] = useState<SkillLevel | "All Levels">("All Levels");
  const [activeDuration, setActiveDuration] = useState<DurationFilter>("Any Duration");
  const [activeDocType, setActiveDocType] = useState<DocumentType | "All Types">("All Types");
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [activePdf, setActivePdf] = useState<MediaItem | null>(null);

  const filtered = useMemo(() => {
    return mediaLibrary.filter((item) => {
      const textMatch = `${item.title} ${item.description} ${item.role} ${item.skillLevel}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const roleMatch = activeRole === "All Roles" || item.role === activeRole;
      const skillMatch = activeSkill === "All Levels" || item.skillLevel === activeSkill;
      const durationMatch = activeDuration === "Any Duration" || getDurationBucket(item.durationMinutes) === activeDuration;
      const docTypeMatch = activeDocType === "All Types" || item.documentType === activeDocType;
      return textMatch && categoryMatch && roleMatch && skillMatch && durationMatch && docTypeMatch;
    });
  }, [search, activeCategory, activeRole, activeSkill, activeDuration, activeDocType]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by topic, role, or skill level"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
          aria-label="Search learning resources"
        />
        <select
          value={activeCategory}
          onChange={(event) => setActiveCategory(event.target.value as Category | "All")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by track"
        >
          <option value="All">All Tracks</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={activeRole}
          onChange={(event) => setActiveRole(event.target.value as RoleTag | "All Roles")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by role"
        >
          <option value="All Roles">All Roles</option>
          {roleTags.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          value={activeSkill}
          onChange={(event) => setActiveSkill(event.target.value as SkillLevel | "All Levels")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by skill level"
        >
          <option value="All Levels">All Levels</option>
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          value={activeDuration}
          onChange={(event) => setActiveDuration(event.target.value as DurationFilter)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by duration"
        >
          <option value="Any Duration">Any Duration</option>
          <option value="Under 10 min">Under 10 min</option>
          <option value="10-20 min">10-20 min</option>
          <option value="20+ min">20+ min</option>
        </select>
        <select
          value={activeDocType}
          onChange={(event) => setActiveDocType(event.target.value as DocumentType | "All Types")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by document type"
        >
          <option value="All Types">All Types</option>
          {documentTypes.map((docType) => (
            <option key={docType} value={docType}>
              {docType}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.slice(0, compact ? 4 : filtered.length).map((item) => (
          <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {item.type === "video" ? (
              <button
                type="button"
                onClick={() => setActiveVideo(item)}
                className="group relative block h-52 w-full bg-slate-950"
                aria-label={`Open video lesson: ${item.title}`}
              >
                <iframe
                  title={item.title}
                  src={item.url}
                  className="h-52 w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <span className="absolute inset-0 flex items-center justify-center bg-slate-900/25 text-white opacity-0 transition group-hover:opacity-100">
                  Open Lesson
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActivePdf(item)}
                className="flex h-52 w-full items-center justify-center bg-slate-100 px-4 text-center text-slate-600"
                aria-label={`Open PDF guide: ${item.title}`}
              >
                Open Interactive PDF Viewer
              </button>
            )}
            <div className="space-y-2 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{item.category}</p>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800">{item.role}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{item.skillLevel}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{item.durationMinutes} min</span>
                <span className="rounded-full bg-cyan-100 px-2 py-1 text-cyan-800">{item.documentType}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
          <div className="w-full max-w-4xl space-y-3 rounded-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{activeVideo.category}</p>
                <h3 className="text-xl font-bold text-slate-900">{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700"
              >
                Close
              </button>
            </div>
            <iframe
              title={activeVideo.title}
              src={activeVideo.url}
              className="h-72 w-full rounded-xl sm:h-[420px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Lesson Chapters</p>
              {activeVideo.chapters?.length ? (
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {activeVideo.chapters.map((chapter) => (
                    <li key={`${activeVideo.id}-${chapter.timestamp}`}>
                      <a
                        href={chapterAnchor(activeVideo.url, chapter.timestamp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                      >
                        <span className="font-semibold">{chapter.timestamp}</span>
                        <span>{chapter.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-600">This lesson does not include chapter markers yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activePdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
          <div className="w-full max-w-5xl space-y-3 rounded-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{activePdf.documentType}</p>
                <h3 className="text-xl font-bold text-slate-900">{activePdf.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePdf(null)}
                className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700"
              >
                Close
              </button>
            </div>
            <iframe title={activePdf.title} src={activePdf.url} className="h-[65vh] w-full rounded-xl border border-slate-200" />
            <div className="flex flex-wrap gap-2">
              <a
                href={activePdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white"
              >
                Full Screen Preview
              </a>
              <a
                href={activePdf.url}
                download
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
