import { NextResponse } from "next/server";
import { getJobDetail } from "@/lib/jobs-cache";

export const maxDuration = 60;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  try {
    const data = await getJobDetail(id);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[/api/jobs/:id]", e);
    const notFound = e instanceof Error && /responded (400|404)/.test(e.message);
    return NextResponse.json({ error: "Job details unavailable." }, { status: notFound ? 404 : 502 });
  }
}
