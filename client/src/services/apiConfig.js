const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

function getApiUrl() {
  const fallbackApiUrl = import.meta.env.DEV
    ? `${window.location.protocol}//${window.location.hostname}:5000/api`
    : "";
  const apiUrl = (configuredApiUrl || fallbackApiUrl).replace(/\/+$/, "");

  if (!apiUrl) {
    throw new Error(
      "VITE_API_URL is not configured. Set it to your deployed backend URL, for example https://your-api.example.com/api."
    );
  }

  try {
    const parsedUrl = new URL(apiUrl);

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("unsupported protocol");
    }
  } catch {
    throw new Error(
      "VITE_API_URL must be a valid HTTP or HTTPS URL ending with /api."
    );
  }

  return apiUrl;
}

export const API_URL = getApiUrl();
