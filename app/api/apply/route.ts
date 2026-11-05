import { NextRequest, NextResponse } from "next/server";
import { ceipalPost } from "@/lib/ceipal";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData();

    // v2 expects camelCase `jobId`; accept the legacy `job_id` from older clients
    const jobId = (incoming.get("jobId") ?? incoming.get("job_id")) as string | null;
    if (!jobId) return NextResponse.json({ error: "Missing jobId" }, { status: 400 });

    const out = new FormData();
    out.append("jobId", jobId);
    for (const [key, value] of incoming.entries()) {
      if (key === "jobId" || key === "job_id") continue;
      out.append(key, value);
    }

    let res = await ceipalPost("/applyJobWithOutRegistration/", out);

    // Retry once on Ceipal 5xx (upstream errors are intermittent)
    if (res.status >= 500) {
      await new Promise(r => setTimeout(r, 1500));
      res = await ceipalPost("/applyJobWithOutRegistration/", out);
    }

    const text = await res.text();
    let body: unknown = text;
    try { body = JSON.parse(text); } catch { /* keep raw text */ }

    if (res.ok) {
      // 201 = created, 200 = already_applied; both mean the candidate is on file
      return NextResponse.json({ success: true, result: body });
    }

    console.error("[/api/apply] Ceipal error", res.status, text);
    return NextResponse.json({ error: body }, { status: res.status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/apply]", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
