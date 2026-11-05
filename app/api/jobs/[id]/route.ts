import { NextResponse } from "next/server";
import { ceipalGet } from "@/lib/ceipal";

export const maxDuration = 60;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  try {
    const res = await ceipalGet(`/getJobPostingDetails/${encodeURIComponent(id)}/`);
    if (!res.ok) {
      console.error("[/api/jobs/:id] upstream status", res.status);
      return NextResponse.json({ error: "Job details unavailable." }, { status: res.status === 404 ? 404 : 502 });
    }
    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (e) {
    console.error("[/api/jobs/:id]", e);
    return NextResponse.json({ error: "Job details unavailable." }, { status: 502 });
  }
}
