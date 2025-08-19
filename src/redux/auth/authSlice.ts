import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '@/utils/authorizeAxios';
import { toast } from '@/hooks/use-toast';

export interface AuthUser {
  id: string;
  username: string;
  email?: string; // optional if later backend adds it
  role: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Normalize backend response which returns { id, username, accessToken }
interface BackendLoginRaw {
  id: string | number;
  username: string;
  accessToken: string;
}

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("adminLogin thunk - sending request:", data);
      const res = await authorizedAxiosInstance.post('/api/admins/login', data);
      console.log("adminLogin thunk - received response:", res.data);
      
      // Backend might wrap in { success, data } or return directly
      const payload = (res.data?.data || res.data) as BackendLoginRaw;
      console.log("adminLogin thunk - extracted payload:", payload);
      
      if (!payload || !payload.accessToken) {
        throw new Error('Phản hồi không hợp lệ');
      }
      const user: AuthUser = {
        id: String(payload.id),
        username: payload.username,
        role: 'admin',
        name: payload.username,
      };
      const result = { user, token: payload.accessToken };
      console.log("adminLogin thunk - returning result:", result);
      return result as { user: AuthUser; token: string };
    } catch (err: any) {
      console.error("adminLogin thunk - error:", err);
      let message = 'Đăng nhập thất bại';
      if (err.response?.data?.message) message = err.response.data.message;
      else if (err.message) message = err.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setCredentials(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log("adminLogin.fulfilled - payload:", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        console.log("Updated Redux state - user:", state.user);
        console.log("Updated localStorage - user:", localStorage.getItem('user'));
        toast({ title: 'Đăng nhập thành công', description: 'Chào mừng quay lại Dashboard' });
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        const err = action.payload;
        state.error = typeof err === 'string' ? err : 'Đăng nhập thất bại';
        toast({ variant: 'destructive', title: 'Lỗi', description: state.error || 'Đăng nhập thất bại' });
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
