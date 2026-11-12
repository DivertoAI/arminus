import { NextResponse } from "next/server";
import { getJobsPage } from "@/lib/jobs-cache";

export const maxDuration = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.min(200, Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1));

  try {
    const data = await getJobsPage(page);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[/api/jobs]", e);
    return NextResponse.json({ error: "Jobs are temporarily unavailable." }, { status: 502 });
  }
}
