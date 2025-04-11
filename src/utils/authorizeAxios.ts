import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_ROOT } from '@/utils/constants';
import { toast } from '@/hooks/use-toast';

// Redux store injection for non-component files
let axiosReduxStore: any;

export const injectStore = (store: any) => {
  axiosReduxStore = store;
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
  (error: AxiosError) => {
    // Disable loading state on error
    if (axiosReduxStore) {
      axiosReduxStore.dispatch({ 
        type: 'recruitment/setSubmitting', 
        payload: false 
      });
    }
    
    // Extract error message
    let errorMessage = 'An error occurred during your request';
    
    if (error.response?.data && typeof error.response.data === 'object') {
      // @ts-ignore - Assuming the error response has a message property
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Show error toast
    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage
    });
    
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;