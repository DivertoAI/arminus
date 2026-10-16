import { NextResponse } from "next/server";

const API_KEY = "N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09";
const CP_ID   = "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";

  try {
    const res = await fetch(
      `https://apiin.ceipal.com/${API_KEY}/CareerPortalJobPostings/`,
      {
        method: "POST",
        body: new URLSearchParams({ cp_id: CP_ID, page }),
        signal: AbortSignal.timeout(20_000),
        cache: "no-store", // don't let Next.js cache POST bodies incorrectly
      }
    );
    if (!res.ok) return NextResponse.json({ error: "upstream failed" }, { status: 502 });
    const data = await res.json();

    // Cache at the CDN edge for 5 min, serve stale for up to 10 min while revalidating
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=0",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
