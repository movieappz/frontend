import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const axiosPublic = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPublic.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                const { useUserStore } = await import("../store/userStore");
                const logout = useUserStore.getState().logout;


                logout();

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);


axiosPublic.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);