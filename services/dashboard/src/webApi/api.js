import axios from "axios";

const djangoUri = "http://localhost:8000/packager";

const apicall = async (req) => {
  try {
    const response = await axios.post(`${djangoUri}/api-keys/generate_key`);
    return response.data; // Return the data as the resolved value of the promise
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Reject the promise with the error
  }
};

const tokenApi = {
  apicall,
};

export default tokenApi;
