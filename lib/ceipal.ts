const BASE = "https://api.ceipal.com/v2";

// Ceipal access tokens last 1 hour. Tokens are independent (creating a new one
// does not invalidate older ones) and rate limits are enforced per token, so a
// per-instance cache is safe. Refresh a little early.
const TOKEN_TTL_MS = 50 * 60_000;
const AUTH_TIMEOUT_MS = 15_000;
const GET_TIMEOUT_MS = 20_000;
const POST_TIMEOUT_MS = 45_000;

let cached: { token: string; expires: number } | null = null;
let inFlight: Promise<string> | null = null;

async function createToken(): Promise<string> {
  const email    = process.env.CEIPAL_EMAIL?.trim();
  const password = process.env.CEIPAL_PASSWORD?.trim();
  const apiKey   = process.env.CEIPAL_API_KEY?.trim();
  if (!email || !password || !apiKey) throw new Error("Ceipal credentials not configured on server.");

  const res = await fetch(`${BASE}/createAuthtoken/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password, apiKey }),
    cache: "no-store",
    signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Ceipal auth failed (HTTP ${res.status})`);

  const data = await res.json();
  if (!data.access_token) throw new Error("Invalid Ceipal token response.");
  cached = { token: data.access_token, expires: Date.now() + TOKEN_TTL_MS };
  return data.access_token;
}

// Concurrent callers on a cold instance share one auth request.
export async function getCeipalToken(): Promise<string> {
  if (cached && Date.now() < cached.expires) return cached.token;
  if (!inFlight) inFlight = createToken().finally(() => { inFlight = null; });
  return inFlight;
}

function invalidateCeipalToken() {
  cached = null;
}

// Ceipal answers 403 (not 401) for an invalid/expired token; 401 means none was sent.
const isAuthFailure = (status: number) => status === 401 || status === 403;

async function send(path: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const token = await getCeipalToken();
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...(init.headers as Record<string, string>), Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function withReauth(path: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  let res = await send(path, init, timeoutMs);
  if (isAuthFailure(res.status)) {
    invalidateCeipalToken();
    res = await send(path, init, timeoutMs);
  }
  return res;
}

export function ceipalGet(path: string): Promise<Response> {
  return withReauth(path, { headers: { Accept: "application/json" } }, GET_TIMEOUT_MS);
}

export function ceipalPost(path: string, body: FormData): Promise<Response> {
  return withReauth(path, { method: "POST", body }, POST_TIMEOUT_MS);
}
