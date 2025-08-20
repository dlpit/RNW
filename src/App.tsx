import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Index from "./pages/Index";
import NotFound from "./pages/404/NotFound";

// You'll need to create these components
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Auth/AdminLogin";

const queryClient = new QueryClient();

// Admin route component with real authentication check
const AdminRoute = () => {
  const { user, refreshToken } = useSelector((state: RootState) => state.auth);

  // Chỉ check user và refreshToken, KHÔNG check accessToken
  // Vì accessToken có thể hết hạn và được refresh tự động bởi axios interceptor
  if (!user || user.role !== "admin") {
    // Fallback check localStorage nếu Redux state chưa được khôi phục
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (!storedRefreshToken || !storedUser) {
      return <Navigate to="/auth/admin-login" replace />;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin") {
        return <Navigate to="/auth/admin-login" replace />;
      }
    } catch {
      return <Navigate to="/auth/admin-login" replace />;
    }
  }

  // Kiểm tra refreshToken có tồn tại không (từ Redux hoặc localStorage)
  const currentRefreshToken =
    refreshToken || localStorage.getItem("refreshToken");
  if (!currentRefreshToken) {
    return <Navigate to="/auth/admin-login" replace />;
  }

  return <Outlet />;
};

/*
// Unauthorized route component for non-authenticated users
const UnauthorizedRoute = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};
*/

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/admin-login" element={<AdminLogin />} />
            <Route
              path="/login"
              element={<Navigate to="/auth/admin-login" replace />}
            />

            {/* Admin protected routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
