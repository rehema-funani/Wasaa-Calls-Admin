// // src/api/axios.ts
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor for auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const message = error.response?.data?.message || 'An unexpected error occurred';
    
//     if (error.response?.status === 401) {
//       localStorage.removeItem('authToken');
//       window.location.href = '/auth/login';
//       return;
//     }
    
//     if (error.response?.status === 403) {
//       toast.error('Access denied. You don\'t have permission to perform this action.');
//       return;
//     }
    
//     if (error.response?.status >= 500) {
//       toast.error('Server error. Please try again later.');
//       return;
//     }
    
//     toast.error(message);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from "axios";
import {
  TokenStorageType,
  tokenRefreshState,
  getToken,
  refreshAuthToken,
} from "./tokenRefresh";

const baseURL = "http://138.68.190.213:3010/";
const apiKey =
  import.meta.env.VITE_API_KEY ||
  "QgR1v+o16jphR9AMSJ9Qf8SnOqmMd4HPziLZvMU1Mt0t7ocaT38q/8AsuOII2YxM60WaXQMkFIYv2bqo+pS/sw==";

const tokenConfig = {
  apiKey,
  storageType: TokenStorageType.LOCAL_STORAGE,
  authRefreshURL: `${baseURL}auth/refresh-token`,
  includeDeviceId: true,
};

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": apiKey,
  },
  timeout: 30_000,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = getToken(tokenConfig.storageType);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;

        if (tokenRefreshState.DEBUG_TOKEN_REFRESH) {
          config.headers.Authorization = "Bearer invalid_token_for_testing";
        }
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 ||
        (error.response.data &&
          error.response.data.message ===
            "Authorization token invalid or expired!"))
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (tokenRefreshState.isRefreshing) {
          try {
            const newToken = await new Promise<string>((resolve) => {
              tokenRefreshState.addSubscriber((token) => {
                resolve(token);
              });
            });

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        tokenRefreshState.isRefreshing = true;

        try {
          const newToken = await refreshAuthToken(tokenConfig);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          tokenRefreshState.onRefreshed(newToken);

          tokenRefreshState.isRefreshing = false;

          return api(originalRequest);
        } catch (refreshError) {
          tokenRefreshState.isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
