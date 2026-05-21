export async function POST(request: Request) {
  const body = await request.json();
  
  // Hardcoded temporarily for testing
  const backendUrl = "https://research-agent-backend-olvv.onrender.com";

  try {
    const response = await fetch(`${backendUrl}/research`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: body.query }),
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
