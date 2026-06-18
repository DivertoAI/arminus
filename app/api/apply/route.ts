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

export async function POST(req: NextRequest) {
  try {
    // Get a fresh token on every application submission
    const token = await getCeipalToken();

    // Forward the raw form data from the browser to Ceipal
    const formData = await req.formData();

    const res = await fetch("https://api.ceipal.com/v1/applyJobWithOutRegistration", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

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
