import { NextResponse } from "next/server";
import { ceipalGet } from "@/lib/ceipal";

export const maxDuration = 30;

const LIMIT = 50;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  try {
    const res = await ceipalGet(`/getJobPostingsList/?limit=${LIMIT}&postOnCareerportal=1&page=${page}`);
    if (!res.ok) return NextResponse.json({ error: "upstream failed", status: res.status }, { status: 502 });
    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
