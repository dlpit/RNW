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
  const { user } = useSelector((state: RootState) => state.auth);

  // Check if user is logged in and has admin role
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
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
            <Route path="/login" element={<AdminLogin />} />

            {/* Admin protected routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
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
