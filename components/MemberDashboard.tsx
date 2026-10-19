"use client";

import { useMemo, useState } from "react";
import { categories, mediaLibrary, type Category } from "@/lib/data";

function readLocalArray(key: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value) as string[];
  } catch {
    return [];
  }
}

export function MemberDashboard() {
  const [completed, setCompleted] = useState<string[]>(() => readLocalArray("completed-guides"));
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [nextSteps] = useState<string[]>(() => readLocalArray("siucloud-recommendations"));

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("completed-guides", JSON.stringify(updated));
      return updated;
    });
  }

  const filteredItems = useMemo(() => {
    return mediaLibrary.filter((item) => selectedCategory === "All" || item.category === selectedCategory);
  }, [selectedCategory]);

  const completionRate = Math.round((completed.length / mediaLibrary.length) * 100);

  const learningMap = categories.map((track) => {
    const trackItems = mediaLibrary.filter((item) => item.category === track);
    const completedInTrack = trackItems.filter((item) => completed.includes(item.id)).length;

    if (completedInTrack === trackItems.length) {
      return { track, state: "Completed", count: `${completedInTrack}/${trackItems.length}` };
    }

    if (completedInTrack > 0) {
      return { track, state: "In Progress", count: `${completedInTrack}/${trackItems.length}` };
    }

    return { track, state: "Recommended Next Step", count: `${completedInTrack}/${trackItems.length}` };
  });

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">SMB Learning Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">
          Track compliance-focused learning across onboarding, cybersecurity, cloud tools, and troubleshooting.
        </p>
        <p className="mt-3 text-sm font-semibold text-blue-700">
          Progress: {completed.length}/{mediaLibrary.length} ({completionRate}%)
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Visual Learning Map</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {learningMap.map((item) => (
            <article key={item.track} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.track}</p>
              <p
                className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  item.state === "Completed"
                    ? "bg-green-100 text-green-800"
                    : item.state === "In Progress"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {item.state}
              </p>
              <p className="mt-1 text-xs text-slate-500">{item.count} resources complete</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Recommended Next Steps</h3>
        {nextSteps.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">Use the Siucloud AI Advisor on the landing page to generate tailored recommendations.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Track Resources</h3>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as Category | "All")}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            aria-label="Filter dashboard resources by track"
          >
            <option value="All">All Tracks</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <ul className="mt-4 space-y-2">
          {filteredItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {item.category} • {item.role} • {item.skillLevel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleComplete(item.id)}
                className={`rounded-md px-3 py-1 text-xs font-semibold ${
                  completed.includes(item.id) ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700"
                }`}
              >
                {completed.includes(item.id) ? "Completed" : "Mark complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
