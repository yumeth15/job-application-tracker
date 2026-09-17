import { getToken } from "../utils/storage";
import { API_URL } from "./apiConfig";

async function request(
  url,
  options = {}
) {
  const token = getToken();

  const response = await fetch(
    `${API_URL}${url}`,
    {
      ...options,

      headers: {
        "Content-Type":
          "application/json",

        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong"
    );
  }

  return data;
}

export async function getApplications() {
  return request(
    "/applications"
  );
}

export async function createApplication(
  application
) {
  return request(
    "/applications",
    {
      method: "POST",

      body: JSON.stringify(
        application
      ),
    }
  );
}

export async function updateApplication(
  id,
  application
) {
  return request(
    `/applications/${id}`,
    {
      method: "PUT",

      body: JSON.stringify(
        application
      ),
    }
  );
}

export async function deleteApplication(
  id
) {
  return request(
    `/applications/${id}`,
    {
      method: "DELETE",
    }
  );
}