import { NextRequest, NextResponse } from "next/server";

async function getCeipalToken(): Promise<string> {
  const email    = process.env.CEIPAL_EMAIL;
  const password = process.env.CEIPAL_PASSWORD;
  const apiKey   = process.env.CEIPAL_API_KEY;

  if (!email || !password || !apiKey) {
    throw new Error("Ceipal credentials not configured on server.");
  }

  const res = await fetch("https://api.ceipal.com/v2/createAuthtoken/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, apiKey })
  });

  if (!res.ok) throw new Error("Failed to fetch Ceipal auth token.");

  const data = await res.json();
  if (!data.access_token) throw new Error("Invalid Ceipal token response.");

  return data.access_token;
}

async function submitToCeipal(token: string, formData: FormData): Promise<Response> {
  return fetch("https://api.ceipal.com/v1/applyJobWithOutRegistration", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}

export async function POST(req: NextRequest) {
  try {
    const token    = await getCeipalToken();
    const formData = await req.formData();

    let res = await submitToCeipal(token, formData);

    // Retry once on Ceipal 5xx (upstream connect errors are intermittent)
    if (res.status >= 500) {
      await new Promise(r => setTimeout(r, 1500));
      res = await submitToCeipal(token, formData);
    }

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    const errText = await res.text();
    console.error("[/api/apply] Ceipal error:", errText);
    return NextResponse.json({ error: errText }, { status: res.status });

  } catch (err: any) {
    console.error("[/api/apply]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
