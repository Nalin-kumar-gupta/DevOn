import axios from "axios";

const djangoUri = "http://localhost:8000/api";

const logsFetch = async (appNo) => {
  const response = await fetch(`${djangoUri}/logs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appNo }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return await response.json();
};

const dashboardApi = {
  logsFetch,
};

export default dashboardApi;
