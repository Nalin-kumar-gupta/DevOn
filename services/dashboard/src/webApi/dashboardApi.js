const djangoUri = "http://localhost:8000/api";

<<<<<<< HEAD
const metricsFetch = async (appNo) => {
  const response = await fetch(`${djangoUri}/metrics/`, {
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

const logsFetch = async (appNo) => {
=======
const logsFetch = async (req) => {
>>>>>>> cc05dcf (selected time range)
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
