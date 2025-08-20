// Test Token Refresh Mechanism
// This file demonstrates how the new auth system works

import { store } from '@/redux/store';
import { refreshAccessToken } from '@/redux/auth/authSlice';
import authorizedAxiosInstance from '@/utils/authorizeAxios';

// Example usage in components:

// 1. Login process (automatically handled by adminLogin thunk)
/*
const handleLogin = async () => {
  const result = await dispatch(adminLogin({
    username: 'admin',
    password: 'password'
  }));
  
  // After successful login:
  // - accessToken and refreshToken are saved to localStorage
  // - User info is saved to Redux store
  // - All future API calls will include Authorization header automatically
};
*/

// 2. Making API calls (no manual token handling needed)
/*
const makeApiCall = async () => {
  try {
    // authorizedAxiosInstance automatically:
    // - Adds Authorization header with current accessToken
    // - Handles 401 errors by refreshing token
    // - Retries original request with new token
    // - Redirects to login if refresh fails
    
    const response = await authorizedAxiosInstance.get('/api/protected-endpoint');
    return response.data;
  } catch (error) {
    // Error handling - token refresh is handled automatically
    console.error('API call failed:', error);
  }
};
*/

// 3. Manual token refresh (usually not needed)
/*
const manualRefresh = async () => {
  try {
    const result = await store.dispatch(refreshAccessToken());
    console.log('Token refreshed successfully:', result);
  } catch (error) {
    console.error('Manual token refresh failed:', error);
    // User will be redirected to login
  }
};
*/

// 4. Logout (clears all tokens)
/*
const handleLogout = () => {
  dispatch(logout());
  // This clears:
  // - accessToken from localStorage
  // - refreshToken from localStorage  
  // - user from Redux store
  // - old 'token' for backward compatibility
};
*/

export const AuthSystemGuide = {
  // Token Storage:
  // - accessToken: localStorage.getItem('accessToken')
  // - refreshToken: localStorage.getItem('refreshToken')
  // - user: localStorage.getItem('user') (JSON)
  
  // Automatic Features:
  // - All API calls include Authorization header
  // - 401 errors trigger automatic token refresh
  // - Failed refresh redirects to login
  // - Successful refresh retries original request
  
  // Manual Operations:
  // - dispatch(adminLogin(credentials)) - Login
  // - dispatch(logout()) - Logout  
  // - dispatch(refreshAccessToken()) - Manual refresh (rare)
  // - dispatch(updateTokens({accessToken, refreshToken})) - Update tokens
};
