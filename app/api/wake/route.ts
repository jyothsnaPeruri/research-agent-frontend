export const maxDuration = 60;

const BACKEND = (
  process.env.NEXT_PUBLIC_API_URL || "https://research-agent-backend-olvv.onrender.com"
).replace(/\/$/, "");

// Pings the FastAPI backend so a free-tier instance wakes up while the user is still typing.
export async function GET() {
  const started = Date.now();
  try {
    const res = await fetch(`${BACKEND}/`, { cache: "no-store", signal: AbortSignal.timeout(55_000) });
    return Response.json({ ok: res.ok, ms: Date.now() - started });
  } catch {
    return Response.json({ ok: false, ms: Date.now() - started }, { status: 504 });
  }
}
