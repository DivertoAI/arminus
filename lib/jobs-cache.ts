import { unstable_cache } from "next/cache";
import { ceipalGet } from "@/lib/ceipal";

const LIMIT = 50;
// Ceipal job-status ids: 1 = Active, 8 = Opened. Excludes Filled / On Hold / Draft / Closed.
const OPEN_STATUSES = "1,8";

async function fetchJson(path: string) {
  const res = await ceipalGet(path);
  if (!res.ok) throw new Error(`Ceipal responded ${res.status}`);
  return res.json();
}

// Persistent server-side cache. Ceipal can take 15+ seconds to answer, so once a value is
// cached it is served instantly; after it goes stale, Next.js keeps serving the stale copy
// while refreshing in the background, and keeps it if the refresh fails.
export function getJobsPage(page: number) {
  return unstable_cache(
    () => fetchJson(`/getJobPostingsList/?limit=${LIMIT}&postOnCareerportal=1&jobStatus=${OPEN_STATUSES}&page=${page}`),
    ["ceipal-jobs-list-v1", String(page)],
    { revalidate: 300 }
  )();
}

export function getJobDetail(id: string) {
  return unstable_cache(
    () => fetchJson(`/getJobPostingDetails/${encodeURIComponent(id)}/`),
    ["ceipal-job-detail-v1", id],
    { revalidate: 900 }
  )();
}
