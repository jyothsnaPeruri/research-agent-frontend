export async function POST(request: Request) {
  const body = await request.json();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  
  console.log("Backend URL:", backendUrl); // debug line
  console.log("Query:", body.query);

  try {
    const response = await fetch(`${backendUrl}/research`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: body.query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return Response.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log("Fetch error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}