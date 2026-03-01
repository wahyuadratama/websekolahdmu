// Simple fetch helper to enforce res.ok and return parsed JSON
export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);

  let data;
  try {
    data = await response.json();
  } catch (err) {
    const parseError = new Error(`Invalid JSON response (${response.status})`);
    parseError.status = response.status;
    throw parseError;
  }

  const isSuccess = response.ok && (data?.success !== false);
  if (!isSuccess) {
    const message = data?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
