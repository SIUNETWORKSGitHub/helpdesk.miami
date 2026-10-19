import { NextResponse } from "next/server";
import { buildLearningPath, type AdvisorRequest, type AdvisorResponse } from "@/lib/data";

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 400) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AdvisorRequest>;

    const payload: AdvisorRequest = {
      goals: sanitize(body.goals),
      knowledge: sanitize(body.knowledge),
      role: sanitize(body.role),
    };

    if (!payload.goals || !payload.knowledge || !payload.role) {
      return NextResponse.json({ error: "goals, knowledge, and role are required" }, { status: 400 });
    }

    const endpoint = process.env.SIUCLOUD_AI_ENDPOINT;

    if (endpoint) {
      const upstream = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok) {
        return NextResponse.json({ error: "upstream AI endpoint failed" }, { status: 502 });
      }

      const data = (await upstream.json()) as AdvisorResponse;
      return NextResponse.json(data);
    }

    return NextResponse.json(buildLearningPath(payload));
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
