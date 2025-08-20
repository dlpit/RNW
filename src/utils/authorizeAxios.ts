import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_ROOT } from '@/utils/constants';
import { toast } from '@/hooks/use-toast';

// Redux store injection for non-component files
let axiosReduxStore: any;

export const injectStore = (store: any) => {
  axiosReduxStore = store;
};

// Add refresh token tracking to prevent multiple concurrent refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Create axios instance with config - renamed to match export name
const authorizedAxiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Set loading state when request starts
    if (axiosReduxStore) {
      const state = axiosReduxStore.getState();
      // Only enable loading if not already submitting
      if (!state.recruitment.isSubmitting) {
        axiosReduxStore.dispatch({ 
          type: 'recruitment/setSubmitting', 
          payload: true 
        });
      }
    }
    // Attach access token if exists
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      if (config.headers) {
        (config.headers as any)['Authorization'] = `Bearer ${accessToken}`;
      } else {
        config.headers = { Authorization: `Bearer ${accessToken}` } as any;
      }
    }
    
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Disable loading state on successful response
    if (axiosReduxStore) {
      axiosReduxStore.dispatch({ 
        type: 'recruitment/setSubmitting', 
        payload: false 
      });
    }
    
    return response;
  },
  async (error: AxiosError) => {
    // Disable loading state on error
    if (axiosReduxStore) {
      axiosReduxStore.dispatch({ 
        type: 'recruitment/setSubmitting', 
        payload: false 
      });
    }
    
    const originalRequest = error.config as any;
    
    // Check if token expired and retry hasn't been attempted
    if (error.response?.status === 401 && 
        error.response?.data && 
        typeof error.response.data === 'object' &&
        // @ts-ignore
        error.response.data.code === 'TOKEN_EXPIRED' && 
        originalRequest && 
        !originalRequest._retry) {
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return authorizedAxiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          processQueue(error, null);
          isRefreshing = false;
          // No refresh token, redirect to login
          localStorage.clear();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/admin-login';
          }
          return Promise.reject(error);
        }
        
        // Call refresh token API - ✅ Đúng URL với 's' và base URL
        const refreshResponse = await axios.post(`${API_ROOT}/api/admins/refresh-token`, {
          refreshToken
        });
        
        // Backend trả về { status: "success", data: { accessToken, refreshToken? } }
        const newAccessToken = refreshResponse.data.data?.accessToken || 
                               refreshResponse.data?.accessToken ||
                               refreshResponse.data.data?.access_token || // fallback snake_case
                               refreshResponse.data?.access_token;
        
        const newRefreshToken = refreshResponse.data.data?.refreshToken || 
                                refreshResponse.data?.refreshToken ||
                                refreshResponse.data.data?.refresh_token || // fallback snake_case  
                                refreshResponse.data?.refresh_token;
        
        if (!newAccessToken) {
          throw new Error('No access token in refresh response');
        }
        
        // Save new tokens
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }
        
        // Update Redux store if available
        if (axiosReduxStore) {
          axiosReduxStore.dispatch({
            type: 'auth/updateTokens',
            payload: {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            }
          });
        }
        
        // Process queued requests
        processQueue(null, newAccessToken);
        
        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authorizedAxiosInstance(originalRequest);
        
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error('Token refresh failed:', refreshError);
        // Refresh failed, clear storage and redirect
        localStorage.clear();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/admin-login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // Extract error message for other errors
    let errorMessage = 'An error occurred during your request';
    
    if (error.response?.data && typeof error.response.data === 'object') {
      // @ts-ignore - Assuming the error response has a message property
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Show error toast for non-401 errors
    if (error.response?.status !== 401) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
    }
    
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;