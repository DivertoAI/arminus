import { NextResponse } from "next/server";
import { ceipalGet } from "@/lib/ceipal";

export const maxDuration = 60;

const LIMIT = 50;
// Ceipal job-status ids: 1 = Active, 8 = Opened. Excludes Filled / On Hold / Draft / Closed.
const OPEN_STATUSES = "1,8";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  try {
    const res = await ceipalGet(
      `/getJobPostingsList/?limit=${LIMIT}&postOnCareerportal=1&jobStatus=${OPEN_STATUSES}&page=${page}`
    );
    if (!res.ok) {
      console.error("[/api/jobs] upstream status", res.status);
      return NextResponse.json({ error: "Jobs are temporarily unavailable." }, { status: 502 });
    }
    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (e) {
    console.error("[/api/jobs]", e);
    return NextResponse.json({ error: "Jobs are temporarily unavailable." }, { status: 502 });
  }
}
