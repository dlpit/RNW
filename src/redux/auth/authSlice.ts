import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '@/utils/authorizeAxios';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { API_ROOT } from '@/utils/constants';

export interface AuthUser {
  id: string;
  username: string;
  email?: string; // optional if later backend adds it
  role: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
};

// Normalize backend response which returns { id, username, accessToken, refreshToken }
interface BackendLoginRaw {
  id: string | number;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authorizedAxiosInstance.post('/api/admins/login', data);
      
      // Backend trả về { status: "success", data: {...}, message: "..." }
      const payload = res.data?.data as BackendLoginRaw;
      
      if (!payload || !payload.accessToken || !payload.refreshToken) {
        throw new Error('Phản hồi không hợp lệ');
      }
      const user: AuthUser = {
        id: String(payload.id),
        username: payload.username,
        role: 'admin',
        name: payload.username,
      };
      const result = { 
        user, 
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken 
      };
      return result as { user: AuthUser; accessToken: string; refreshToken: string };
    } catch (err: any) {
      console.error("adminLogin thunk - error:", err);
      let message = 'Đăng nhập thất bại';
      if (err.response?.data?.message) message = err.response.data.message;
      else if (err.message) message = err.message;
      return rejectWithValue(message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const res = await axios.post(`${API_ROOT}/api/admins/refresh-token`, {
        refreshToken
      });
      
      // Backend trả về { status: "success", data: { accessToken, refreshToken? }, message: "..." }
      const payload = res.data?.data;
      
      if (!payload || !payload.accessToken) {
        throw new Error('Invalid refresh response');
      }

      return {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken || refreshToken // Use new refresh token if provided
      };
    } catch (err: any) {
      console.error("refreshAccessToken thunk - error:", err);
      return rejectWithValue('Token refresh failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token'); // Remove old token for backward compatibility
    },
    setCredentials(state, action: PayloadAction<{ user: AuthUser; accessToken: string; refreshToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    updateTokens(state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.removeItem('token'); // Remove old token for backward compatibility
        toast({ title: 'Đăng nhập thành công', description: 'Chào mừng quay lại Dashboard' });
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        const err = action.payload;
        state.error = typeof err === 'string' ? err : 'Đăng nhập thất bại';
        toast({ variant: 'destructive', title: 'Lỗi', description: state.error || 'Đăng nhập thất bại' });
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
        localStorage.setItem('accessToken', action.payload.accessToken);
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        // Clear all auth data on refresh failure
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
      });
  },
});

export const { logout, setCredentials, updateTokens } = authSlice.actions;
export default authSlice.reducer;
