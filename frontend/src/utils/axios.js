import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//req interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//res interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle specific status codes
            if (error.response.status === 400) {
                // Unauthorized, redirect to login or handle token refresh
                console.error("Unauthorized! Redirecting to login...");
            } else if (error.response.status === 401) {
                // Forbidden
                console.error("Forbidden! You don't have permission to access this resource.");
            } else if (error.response.status === 500) {
                // Server error
                console.error("Server error! Please try again later.");
            }
        } else if (error.request) {
            // No response received
            console.error("No response from server! Please check your network.");
        } else {
            // Other errors
            console.error("Error", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
