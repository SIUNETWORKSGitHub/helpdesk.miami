"use client";

import { useState } from "react";
import type { AdvisorResponse } from "@/lib/data";

const initial = {
  goals: "",
  knowledge: "",
  role: "",
};

export function SiucloudAdvisor() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResponse | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to generate recommendations");
      }

      const data = (await response.json()) as AdvisorResponse;
      setResult(data);
      localStorage.setItem("siucloud-recommendations", JSON.stringify(data.nextSteps));
    } catch {
      setError("Siucloud AI is currently unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Siucloud AI Advisor</h2>
      <p className="mt-1 text-sm text-slate-700">
        Tell us your SMB role, current skills, and compliance priorities to receive a tailored learning path.
      </p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <input
          required
          value={form.goals}
          onChange={(event) => setForm((prev) => ({ ...prev, goals: event.target.value }))}
          placeholder="Training goals (ex: improve cybersecurity readiness)"
          className="rounded-lg border border-blue-200 px-3 py-2 text-sm bg-white"
        />
        <input
          required
          value={form.knowledge}
          onChange={(event) => setForm((prev) => ({ ...prev, knowledge: event.target.value }))}
          placeholder="Current technical knowledge"
          className="rounded-lg border border-blue-200 px-3 py-2 text-sm bg-white"
        />
        <input
          required
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          placeholder="Current or target role (ex: IT manager, support specialist)"
          className="rounded-lg border border-blue-200 px-3 py-2 text-sm bg-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading ? "Generating..." : "Get My Learning Path"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Recommended Track</p>
          <h3 className="text-lg font-bold text-slate-900">{result.track}</h3>
          <p className="mt-1 text-sm text-slate-700">{result.summary}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {result.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
