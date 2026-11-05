const BASE = "https://api.ceipal.com/v2";

let cached: { token: string; expires: number } | null = null;

export async function getCeipalToken(): Promise<string> {
  if (cached && Date.now() < cached.expires) return cached.token;

  const email    = process.env.CEIPAL_EMAIL;
  const password = process.env.CEIPAL_PASSWORD;
  const apiKey   = process.env.CEIPAL_API_KEY;
  if (!email || !password || !apiKey) throw new Error("Ceipal credentials not configured on server.");

  const res = await fetch(`${BASE}/createAuthtoken/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password, apiKey }),
    cache: "no-store",
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`Ceipal auth failed (${res.status})`);
  const data = await res.json();
  if (!data.access_token) throw new Error("Invalid Ceipal token response.");

  // access_token is valid for 1 hour; refresh a bit early
  cached = { token: data.access_token, expires: Date.now() + 50 * 60_000 };
  return data.access_token;
}

export function invalidateCeipalToken() {
  cached = null;
}

// GET with one retry on 401 (stale token)
export async function ceipalGet(path: string): Promise<Response> {
  const run = async () =>
    fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${await getCeipalToken()}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
  let res = await run();
  if (res.status === 401) {
    invalidateCeipalToken();
    res = await run();
  }
  return res;
}

export async function ceipalPost(path: string, body: FormData): Promise<Response> {
  const run = async () =>
    fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${await getCeipalToken()}` },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(40_000),
    });
  let res = await run();
  if (res.status === 401) {
    invalidateCeipalToken();
    res = await run();
  }
  return res;
}

export { BASE as CEIPAL_V2_BASE };
