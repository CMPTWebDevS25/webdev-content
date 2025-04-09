import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const acceptHeader = headersList.get("accept");

  // Check if the request is for JSON
  if (acceptHeader && acceptHeader.includes("application/json")) {
    return handleJsonRequest();
  }

  console.log("GET request to /api/date-cache-header");
  console.log(new Date().toLocaleString("en-GB", { timeZone: "Asia/Qatar" }));

  const data = {
    message: "Cached response example",
    date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Qatar" }),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      // Cache for 1 hour (3600 seconds)
      "Cache-Control": "max-age=3600",
    },
  });
}
