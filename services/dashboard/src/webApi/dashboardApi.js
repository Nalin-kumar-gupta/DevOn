import axios from "axios";

const djangoUri = "http://localhost:8000/api";

const logsFetch = async (req) => {
  console.log(req,'ss');
  try {
    const response = await axios.get(`${djangoUri}/logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const dashboardApi = {
  logsFetch,
};

export default dashboardApi;
