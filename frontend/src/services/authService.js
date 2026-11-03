// Extracts a clean error message from a FastAPI response
function getErrorMessage(data) {
  // Standard Error (HTTPException): detail is a plain string
  if (typeof data.detail === "string") return data.detail;

  // Validation Error (422): detail is an array of objects
  if (Array.isArray(data.detail) && data.detail[0]?.msg) {
    // Grab the first error message and remove the ugly "Value error, " prefix
    return data.detail[0].msg.replace("Value error, ", "");
  }

  // Fallback: for network issues or unexpected server errors
  return "Something went wrong. Try again.";
}

async function post(path, body) {
  let res;
  try {
    // Send POST with a JSON body; fetch throws only on network failure
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), // Fetch sends strings, not objects
    });
  } catch {
    // Not 4xx/5xx erros
    throw new Error("Can't reach the server");
  }

  let data = {};
  try {
    // Parse body
    data = await res.json();
  } catch {
    // Fall back to {} if body isn't valid JSON
  }

  if (!res.ok) throw new Error(getErrorMessage(data));
  return data;
}
