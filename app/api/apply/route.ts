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

    const started = Date.now();
    let res = await ceipalPost("/applyJobWithOutRegistration/", out);

    // Retry once on a fast Ceipal 5xx (skipped if the first attempt was slow, to stay under the time limit)
    if (res.status >= 500 && Date.now() - started < 12_000) {
      await new Promise(r => setTimeout(r, 1500));
      res = await ceipalPost("/applyJobWithOutRegistration/", out);
    }

    const text = await res.text();
    let body: Record<string, unknown> = {};
    try { body = JSON.parse(text); } catch { /* non-JSON upstream body */ }

    if (res.ok) {
      // 201 = created, 200 = already_applied; both mean the candidate is on file
      return NextResponse.json({ success: true, status: body.status ?? "created" });
    }

    console.error("[/api/apply] Ceipal error", res.status, text.slice(0, 500));
    if (res.status === 429) {
      return NextResponse.json({ error: "busy" }, { status: 429 });
    }
    return NextResponse.json({ error: "failed" }, { status: res.status >= 500 ? 502 : 400 });
  } catch (err: unknown) {
    console.error("[/api/apply]", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
