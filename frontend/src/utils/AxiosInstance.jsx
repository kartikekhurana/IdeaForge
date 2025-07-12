import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://ideaforge-cfea.onrender.com/api/v1" 
    : "http://localhost:3000/api/v1",             
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await instance.get("/refresh");
        if (refreshRes.data.success) {
          return instance(originalRequest);
        }
      } catch (refreshError) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
