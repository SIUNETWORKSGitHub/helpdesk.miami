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

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Member Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">Track your completed guides and follow AI-recommended next steps.</p>
        <p className="mt-3 text-sm font-semibold text-blue-700">Progress: {completed.length}/{mediaLibrary.length} ({completionRate}%)</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Recommended Next Steps</h3>
        {nextSteps.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">Use Siucloud AI Advisor on the home page to generate personalized recommendations.</p>
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
          <h3 className="text-lg font-semibold text-slate-900">Learning Resources</h3>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as Category | "All")}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            aria-label="Filter dashboard resources by category"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <ul className="mt-4 space-y-2">
          {filteredItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.category}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleComplete(item.id)}
                className={`rounded-md px-3 py-1 text-xs font-semibold ${
                  completed.includes(item.id)
                    ? "bg-green-100 text-green-800"
                    : "bg-slate-100 text-slate-700"
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
