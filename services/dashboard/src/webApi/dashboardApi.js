const djangoUri = "http://localhost:8000/api";

const metricsFetch = async (req) => {
  const response = await fetch(`${djangoUri}/metrics/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch metrics");
  }
  return await response.json();
};


const logsFetch = async (req) => {
  const response = await fetch(`${djangoUri}/logs/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return await response.json();
};

const dashboardApi = {
  metricsFetch,
  logsFetch,
};

export default dashboardApi;
