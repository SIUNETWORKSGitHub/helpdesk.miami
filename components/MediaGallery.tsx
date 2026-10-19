"use client";

import { useMemo, useState } from "react";
import { categories, mediaLibrary, type Category } from "@/lib/data";

type Props = {
  compact?: boolean;
};

export function MediaGallery({ compact = false }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered = useMemo(() => {
    return mediaLibrary.filter((item) => {
      const textMatch = `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      return textMatch && categoryMatch;
    });
  }, [search, activeCategory]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search videos and PDF guides"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
          aria-label="Search learning resources"
        />
        <select
          value={activeCategory}
          onChange={(event) => setActiveCategory(event.target.value as Category | "All")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.slice(0, compact ? 4 : filtered.length).map((item) => (
          <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {item.type === "video" ? (
              <iframe
                title={item.title}
                src={item.url}
                className="h-52 w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-slate-100 px-4 text-center text-slate-600">
                PDF Resource
              </div>
            )}
            <div className="space-y-2 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{item.category}</p>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
              {item.type === "pdf" && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                >
                  Download PDF
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
